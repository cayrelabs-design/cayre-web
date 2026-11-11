import Link from 'next/link';
import { Estado } from '@/interno/components/Estado';
import { Icono, type NombreIcono } from '@/interno/components/Icono';
import {
  HORAS_PROMETIDAS,
  type Consulta,
  type Proyecto,
  type Reunion,
  type Tarea,
} from '@/interno/lib/dominio';
import { diaCorto, diasHasta, enDias, fechaSola, hace, haceHoras, hora, horasDesde, hoy } from '@/interno/lib/formato';
import { exigirSocio, listarSocios } from '@/interno/lib/sesion';

/**
 * El tablero. No tiene gráficos de adorno: cada bloque contesta una pregunta
 * que un socio se hace al sentarse, y lleva a la pantalla donde se resuelve.
 *
 *   ¿A quién le debemos una respuesta?        -> consultas nuevas
 *   ¿Qué tengo en la agenda?                  -> próximas reuniones
 *   ¿Qué está frenado y por qué?              -> tareas trabadas
 *   ¿Qué se nos está por vencer?              -> tareas y compromisos con fecha
 */
export default async function Tablero() {
  const { supabase, socio } = await exigirSocio();
  const socios = await listarSocios();
  const nombreDe = (id: string | null) => socios.find((s) => s.id === id)?.nombre ?? 'Sin asignar';

  const enUnaSemana = enDias(7);

  const [nuevas, reuniones, trabadas, porVencer, compromisos] = await Promise.all([
    supabase
      .from('consultas')
      .select('id, nombre, empresa, mensaje, estado, created_at')
      .eq('estado', 'nueva')
      .order('created_at')
      .returns<Consulta[]>(),
    supabase
      .from('reuniones')
      .select('id, titulo, inicia_el, con_quien, duracion_min, reunion_participantes(socio_id)')
      .eq('estado', 'agendada')
      .gte('inicia_el', haceHoras(1))
      .order('inicia_el')
      .limit(5)
      .returns<Reunion[]>(),
    supabase
      .from('tareas')
      .select('id, titulo, motivo_traba, responsable_id, proyecto_id, proyectos(nombre)')
      .eq('estado', 'trabada')
      .order('updated_at')
      .returns<(Tarea & { proyectos: { nombre: string } | null })[]>(),
    supabase
      .from('tareas')
      .select('id, titulo, vence_el, responsable_id, proyecto_id, estado, proyectos(nombre)')
      .neq('estado', 'hecha')
      .not('vence_el', 'is', null)
      .lte('vence_el', enUnaSemana)
      .order('vence_el')
      .limit(8)
      .returns<(Tarea & { proyectos: { nombre: string } | null })[]>(),
    supabase
      .from('proyectos')
      .select('id, nombre, cliente, compromiso_el, responsable_id')
      .eq('estado', 'activo')
      .not('compromiso_el', 'is', null)
      .order('compromiso_el')
      .limit(5)
      .returns<Proyecto[]>(),
  ]);

  const listaNuevas = nuevas.data ?? [];
  const listaTrabadas = trabadas.data ?? [];
  const listaVencen = porVencer.data ?? [];
  const vencidas = listaVencen.filter((t) => t.vence_el! < hoy()).length;
  const fueraDePlazo = listaNuevas.filter((c) => horasDesde(c.created_at) > HORAS_PROMETIDAS).length;

  return (
    <>
      <p className="irotulo">Tablero</p>
      <h1 className="mt-1.5 text-[28px] font-bold">Hola, {socio.nombre.split(' ')[0]}.</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Numero
          href="/interno/consultas"
          icono="bandeja"
          valor={listaNuevas.length}
          nombre="Consultas sin responder"
          alerta={fueraDePlazo > 0 ? `${fueraDePlazo} pasaron las ${HORAS_PROMETIDAS} h` : undefined}
        />
        <Numero
          href="/interno/agenda"
          icono="calendario"
          valor={(reuniones.data ?? []).length}
          nombre="Reuniones próximas"
        />
        <Numero
          href="/interno/proyectos"
          icono="alerta"
          valor={listaTrabadas.length}
          nombre="Tareas trabadas"
          alerta={listaTrabadas.length > 0 ? 'Alguien espera algo' : undefined}
        />
        <Numero
          href="/interno/proyectos"
          icono="reloj"
          valor={listaVencen.length}
          nombre="Vencen en 7 días"
          alerta={vencidas > 0 ? `${vencidas} ya vencidas` : undefined}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Bloque titulo="A quién le debemos una respuesta" href="/interno/consultas" verTodo="Ver consultas">
          {listaNuevas.length === 0 ? (
            <Vacio texto="Ninguna consulta espera respuesta." />
          ) : (
            <ul className="divide-y divide-linea">
              {listaNuevas.slice(0, 5).map((c) => {
                const tarde = horasDesde(c.created_at) > HORAS_PROMETIDAS;
                return (
                  <li key={c.id}>
                    <Link href={`/interno/consultas/${c.id}`} className="flex items-start gap-3 py-3 hover:text-marca">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold">
                          {c.nombre}
                          {c.empresa && <span className="font-normal text-texto-3"> · {c.empresa}</span>}
                        </span>
                        <span className="block truncate text-[13.5px] text-texto-2">{c.mensaje}</span>
                      </span>
                      <span className={`flex-none text-xs font-semibold ${tarde ? 'text-error' : 'text-texto-3'}`}>
                        {hace(c.created_at)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Bloque>

        <Bloque titulo="Próximas reuniones" href="/interno/agenda" verTodo="Ver agenda">
          {(reuniones.data ?? []).length === 0 ? (
            <Vacio texto="No hay reuniones agendadas." />
          ) : (
            <ul className="divide-y divide-linea">
              {(reuniones.data ?? []).map((r) => (
                <li key={r.id} className="flex items-center gap-4 py-3">
                  <span className="w-14 flex-none text-center">
                    <span className="block text-[11px] font-bold text-marca uppercase">{diaCorto(r.inicia_el)}</span>
                    <span className="block text-[17px] font-bold">{hora(r.inicia_el)}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-semibold">{r.titulo}</span>
                    <span className="block truncate text-[13.5px] text-texto-2">
                      {[r.con_quien, r.reunion_participantes.map((p) => nombreDe(p.socio_id).split(' ')[0]).join(', ')]
                        .filter(Boolean)
                        .join(' · ') || 'Sin participantes cargados'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Bloque>

        <Bloque titulo="Qué está frenado, y por qué" href="/interno/proyectos" verTodo="Ver proyectos">
          {listaTrabadas.length === 0 ? (
            <Vacio texto="No hay ninguna tarea trabada." />
          ) : (
            <ul className="divide-y divide-linea">
              {listaTrabadas.map((t) => (
                <li key={t.id}>
                  <Link href={`/interno/proyectos/${t.proyecto_id}`} className="block py-3 hover:text-marca">
                    <span className="block text-[15px] font-semibold">{t.titulo}</span>
                    <span className="mt-0.5 block text-[13.5px] text-error">{t.motivo_traba}</span>
                    <span className="mt-0.5 block text-xs text-texto-3">
                      {t.proyectos?.nombre} · {nombreDe(t.responsable_id)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Bloque>

        <Bloque titulo="Lo que se viene con fecha" href="/interno/proyectos" verTodo="Ver proyectos">
          {listaVencen.length === 0 && (compromisos.data ?? []).length === 0 ? (
            <Vacio texto="Nada vence en los próximos 7 días." />
          ) : (
            <ul className="divide-y divide-linea">
              {(compromisos.data ?? []).map((p) => (
                <FilaConFecha
                  key={`p${p.id}`}
                  href={`/interno/proyectos/${p.id}`}
                  fecha={p.compromiso_el!}
                  titulo={`Entrega: ${p.nombre}`}
                  detalle={`${p.cliente} · ${nombreDe(p.responsable_id)}`}
                />
              ))}
              {listaVencen.map((t) => (
                <FilaConFecha
                  key={`t${t.id}`}
                  href={`/interno/proyectos/${t.proyecto_id}`}
                  fecha={t.vence_el!}
                  titulo={t.titulo}
                  detalle={`${t.proyectos?.nombre ?? ''} · ${nombreDe(t.responsable_id)}`}
                />
              ))}
            </ul>
          )}
        </Bloque>
      </div>

      {listaNuevas.length === 0 && listaTrabadas.length === 0 && vencidas === 0 && (
        <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-ok">
          <Icono nombre="check" className="size-4" />
          Nada urgente: sin consultas esperando, sin tareas trabadas ni vencidas.
        </p>
      )}
    </>
  );
}

function Numero({
  href,
  icono,
  valor,
  nombre,
  alerta,
}: {
  href: string;
  icono: NombreIcono;
  valor: number;
  nombre: string;
  alerta?: string;
}) {
  return (
    <Link href={href} className="tarjeta block p-5 transition hover:border-marca">
      <span
        className={`flex size-10 items-center justify-center rounded-xl ${
          alerta ? 'bg-error-suave text-error' : 'bg-marca-suave text-marca-oscura'
        }`}
      >
        <Icono nombre={icono} />
      </span>
      <span className="mt-4 block text-[32px] leading-none font-bold">{valor}</span>
      <span className="mt-1.5 block text-[13.5px] font-medium text-texto-2">{nombre}</span>
      {alerta && <span className="mt-1 block text-xs font-bold text-error">{alerta}</span>}
    </Link>
  );
}

function Bloque({
  titulo,
  href,
  verTodo,
  children,
}: {
  titulo: string;
  href: string;
  verTodo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="tarjeta p-6">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h2 className="text-[17px] font-bold">{titulo}</h2>
        <Link href={href} className="flex-none text-[13px] font-semibold text-marca hover:underline">
          {verTodo}
        </Link>
      </div>
      {children}
    </section>
  );
}

function Vacio({ texto }: { texto: string }) {
  return <p className="py-6 text-center text-[14.5px] text-texto-3">{texto}</p>;
}

function FilaConFecha({
  href,
  fecha,
  titulo,
  detalle,
}: {
  href: string;
  fecha: string;
  titulo: string;
  detalle: string;
}) {
  const dias = diasHasta(fecha);
  return (
    <li>
      <Link href={href} className="flex items-center gap-4 py-3 hover:text-marca">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold">{titulo}</span>
          <span className="block truncate text-[13px] text-texto-3">{detalle}</span>
        </span>
        <span className="flex-none text-right">
          <span className="block text-[13.5px] font-semibold">{fechaSola(fecha)}</span>
          {dias < 0 ? (
            <Estado nombre={`Venció hace ${-dias} d`} tono="error" />
          ) : dias === 0 ? (
            <Estado nombre="Hoy" tono="alerta" />
          ) : (
            <span className="text-xs text-texto-3">en {dias} d</span>
          )}
        </span>
      </Link>
    </li>
  );
}
