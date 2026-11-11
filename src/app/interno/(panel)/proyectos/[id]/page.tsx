import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Aviso, Estado } from '@/interno/components/Estado';
import { Icono } from '@/interno/components/Icono';
import {
  ESTADOS_PROYECTO,
  ESTADOS_TAREA,
  LINEAS,
  PROYECTO,
  TAREA,
  type EstadoTarea,
  type Proyecto,
  type Tarea,
} from '@/interno/lib/dominio';
import { diasHasta, fechaSola } from '@/interno/lib/formato';
import { exigirSocio, listarSocios, type Socio } from '@/interno/lib/sesion';
import { cambiarProyecto, cambiarTarea, crearTarea } from '../../acciones';

export const metadata: Metadata = { title: 'Proyecto' };

export default async function FichaDeProyecto({ params, searchParams }: PageProps<'/interno/proyectos/[id]'>) {
  const { supabase } = await exigirSocio();
  const socios = await listarSocios();
  const { id } = await params;
  const { error } = await searchParams;
  if (!/^\d+$/.test(id)) notFound();

  const { data: p } = await supabase
    .from('proyectos')
    .select('id, nombre, cliente, linea, estado, responsable_id, compromiso_el, descripcion, consulta_id, created_at')
    .eq('id', Number(id))
    .maybeSingle<Proyecto>();
  if (!p) notFound();

  const { data } = await supabase
    .from('tareas')
    .select('id, proyecto_id, titulo, detalle, estado, motivo_traba, responsable_id, vence_el, hecha_el')
    .eq('proyecto_id', p.id)
    .order('vence_el', { ascending: true, nullsFirst: false })
    .order('id')
    .returns<Tarea[]>();
  const tareas = data ?? [];

  const nombreDe = (socioId: string | null) => socios.find((s) => s.id === socioId)?.nombre ?? 'Sin asignar';
  const hechas = tareas.filter((t) => t.estado === 'hecha').length;
  const dias = p.compromiso_el ? diasHasta(p.compromiso_el) : null;

  return (
    <>
      <Link href="/interno/proyectos" className="text-[13.5px] font-semibold text-marca hover:underline">
        ← Proyectos
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-[28px] font-bold">{p.nombre}</h1>
        <Estado {...PROYECTO[p.estado]} />
      </div>
      <p className="mt-1 text-[15px] text-texto-2">
        {p.cliente}
        {p.linea && ` · ${LINEAS[p.linea]}`} · {nombreDe(p.responsable_id)}
      </p>

      <div className="mt-5">
        <Aviso texto={typeof error === 'string' ? error : undefined} />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Cifra
          nombre="Prometido para"
          valor={p.compromiso_el ? fechaSola(p.compromiso_el) : 'Sin fecha'}
          detalle={
            dias === null || p.estado !== 'activo'
              ? undefined
              : dias < 0
                ? `Venció hace ${-dias} días`
                : dias === 0
                  ? 'Es hoy'
                  : `Faltan ${dias} días`
          }
          alerta={dias !== null && dias < 0 && p.estado === 'activo'}
        />
        <Cifra nombre="Avance" valor={`${hechas} de ${tareas.length}`} detalle="tareas hechas" />
        <Cifra
          nombre="Trabadas"
          valor={String(tareas.filter((t) => t.estado === 'trabada').length)}
          alerta={tareas.some((t) => t.estado === 'trabada')}
        />
        <div className="tarjeta flex flex-col justify-center gap-2 p-4">
          <Link
            href={`/interno/agenda?proyecto=${p.id}&titulo=${encodeURIComponent(`Avance — ${p.nombre}`)}&con=${encodeURIComponent(p.cliente)}#nueva`}
            className="ibtn ibtn-secundario ibtn-chico"
          >
            <Icono nombre="calendario" className="size-4" />
            Agendar reunión
          </Link>
          {p.consulta_id && (
            <Link href={`/interno/consultas/${p.consulta_id}`} className="text-center text-xs font-semibold text-marca hover:underline">
              Ver la consulta de origen
            </Link>
          )}
        </div>
      </div>

      {p.descripcion && (
        <section className="tarjeta mt-5 p-6">
          <h2 className="irotulo">Alcance</h2>
          <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-wrap text-texto-2">{p.descripcion}</p>
        </section>
      )}

      {/* Las tareas, en cuatro columnas. En el teléfono se apilan en el mismo
          orden: lo trabado se ve antes que lo hecho. */}
      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        {(['trabada', 'en_curso', 'pendiente', 'hecha'] as EstadoTarea[]).map((estado) => {
          const lista = tareas.filter((t) => t.estado === estado);
          return (
            <section key={estado} className="rounded-[20px] bg-linea/45 p-3">
              <h2 className="flex items-center justify-between px-2 py-1.5 text-[14px] font-bold">
                {TAREA[estado].nombre}
                <span className="text-xs font-semibold text-texto-3">{lista.length}</span>
              </h2>
              <ul className="mt-1 flex flex-col gap-2">
                {lista.map((t) => (
                  <FichaTarea key={t.id} t={t} socios={socios} nombreDe={nombreDe} />
                ))}
                {lista.length === 0 && (
                  <li className="px-2 py-4 text-center text-[13px] text-texto-3">Nada acá.</li>
                )}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="tarjeta p-6">
          <h2 className="text-[17px] font-bold">Nueva tarea</h2>
          <form action={crearTarea} className="mt-4 flex flex-col gap-4">
            <input type="hidden" name="proyecto_id" value={p.id} />
            <input type="hidden" name="estado" value="pendiente" />
            <input type="hidden" name="motivo_traba" value="" />
            <div>
              <label htmlFor="titulo" className="etiqueta-campo">
                Qué hay que hacer
              </label>
              <input id="titulo" name="titulo" required maxLength={200} className="campo" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="responsable_nueva" className="etiqueta-campo">
                  Quién
                </label>
                <select id="responsable_nueva" name="responsable_id" defaultValue="" className="campo">
                  <option value="">Sin asignar</option>
                  {socios.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="vence_nueva" className="etiqueta-campo">
                  Para cuándo
                </label>
                <input id="vence_nueva" name="vence_el" type="date" className="campo" />
              </div>
            </div>
            <button type="submit" className="ibtn ibtn-primario">
              <Icono nombre="mas" className="size-4" />
              Agregar tarea
            </button>
          </form>
        </section>

        <details className="tarjeta h-fit p-6">
          <summary className="cursor-pointer text-[17px] font-bold">Editar el proyecto</summary>
          <form action={cambiarProyecto} className="mt-4 flex flex-col gap-4">
            <input type="hidden" name="id" value={p.id} />
            <div>
              <label htmlFor="nombre" className="etiqueta-campo">
                Nombre
              </label>
              <input id="nombre" name="nombre" required defaultValue={p.nombre} className="campo" />
            </div>
            <div>
              <label htmlFor="cliente" className="etiqueta-campo">
                Cliente
              </label>
              <input id="cliente" name="cliente" required defaultValue={p.cliente} className="campo" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="estado" className="etiqueta-campo">
                  Estado
                </label>
                <select id="estado" name="estado" defaultValue={p.estado} className="campo">
                  {ESTADOS_PROYECTO.map((e) => (
                    <option key={e} value={e}>
                      {PROYECTO[e].nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="linea" className="etiqueta-campo">
                  Línea
                </label>
                <select id="linea" name="linea" defaultValue={p.linea ?? ''} className="campo">
                  <option value="">Sin definir</option>
                  {Object.entries(LINEAS).map(([clave, nombre]) => (
                    <option key={clave} value={clave}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="responsable_id" className="etiqueta-campo">
                  Responsable
                </label>
                <select id="responsable_id" name="responsable_id" defaultValue={p.responsable_id ?? ''} className="campo">
                  <option value="">Sin asignar</option>
                  {socios.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="compromiso_el" className="etiqueta-campo">
                  Prometido para
                </label>
                <input
                  id="compromiso_el"
                  name="compromiso_el"
                  type="date"
                  defaultValue={p.compromiso_el ?? ''}
                  className="campo"
                />
              </div>
            </div>
            <div>
              <label htmlFor="descripcion" className="etiqueta-campo">
                Alcance
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={4}
                maxLength={4000}
                defaultValue={p.descripcion ?? ''}
                className="campo resize-y"
              />
            </div>
            <button type="submit" className="ibtn ibtn-secundario">
              Guardar cambios
            </button>
          </form>
        </details>
      </div>
    </>
  );
}

function Cifra({
  nombre,
  valor,
  detalle,
  alerta,
}: {
  nombre: string;
  valor: string;
  detalle?: string;
  alerta?: boolean;
}) {
  return (
    <div className="tarjeta p-4">
      <p className="irotulo">{nombre}</p>
      <p className={`mt-1.5 text-[22px] leading-tight font-bold ${alerta ? 'text-error' : ''}`}>{valor}</p>
      {detalle && <p className={`text-xs ${alerta ? 'font-bold text-error' : 'text-texto-3'}`}>{detalle}</p>}
    </div>
  );
}

/**
 * Una tarea. Se ve resumida; al tocarla se abre para cambiarle el estado, el
 * responsable o la fecha. Si se la marca como trabada, hay que decir por qué:
 * lo pide el formulario y lo exige la base.
 */
function FichaTarea({
  t,
  socios,
  nombreDe,
}: {
  t: Tarea;
  socios: Socio[];
  nombreDe: (id: string | null) => string;
}) {
  const dias = t.vence_el ? diasHasta(t.vence_el) : null;
  const vencida = dias !== null && dias < 0 && t.estado !== 'hecha';

  return (
    <li className="tarjeta !rounded-2xl p-3.5">
      <details>
        <summary className="cursor-pointer list-none">
          <span className={`block text-[14.5px] font-semibold ${t.estado === 'hecha' ? 'text-texto-3 line-through' : ''}`}>
            {t.titulo}
          </span>
          {t.estado === 'trabada' && t.motivo_traba && (
            <span className="mt-1 block text-[13px] font-medium text-error">{t.motivo_traba}</span>
          )}
          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-texto-3">
            <span>{nombreDe(t.responsable_id).split(' ')[0]}</span>
            {t.vence_el && (
              <span className={vencida ? 'font-bold text-error' : undefined}>
                · {fechaSola(t.vence_el)}
                {vencida && ' (vencida)'}
              </span>
            )}
          </span>
        </summary>

        <form action={cambiarTarea} className="mt-3 flex flex-col gap-2.5 border-t border-linea pt-3">
          <input type="hidden" name="id" value={t.id} />
          <input type="hidden" name="proyecto_id" value={t.proyecto_id} />
          <input name="titulo" required defaultValue={t.titulo} aria-label="Título" className="campo !min-h-9 !py-1.5 !text-sm" />
          <select name="estado" defaultValue={t.estado} aria-label="Estado" className="campo !min-h-9 !py-1.5 !text-sm">
            {ESTADOS_TAREA.map((e) => (
              <option key={e} value={e}>
                {TAREA[e].nombre}
              </option>
            ))}
          </select>
          <input
            name="motivo_traba"
            defaultValue={t.motivo_traba ?? ''}
            maxLength={400}
            placeholder="Si está trabada: ¿qué la traba?"
            aria-label="Qué la traba"
            className="campo !min-h-9 !py-1.5 !text-sm"
          />
          <select
            name="responsable_id"
            defaultValue={t.responsable_id ?? ''}
            aria-label="Responsable"
            className="campo !min-h-9 !py-1.5 !text-sm"
          >
            <option value="">Sin asignar</option>
            {socios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
          <input
            name="vence_el"
            type="date"
            defaultValue={t.vence_el ?? ''}
            aria-label="Para cuándo"
            className="campo !min-h-9 !py-1.5 !text-sm"
          />
          <div className="flex gap-2">
            <button type="submit" className="ibtn ibtn-primario ibtn-chico flex-1">
              Guardar
            </button>
            <button
              type="submit"
              name="intencion"
              value="borrar"
              className="ibtn ibtn-secundario ibtn-chico !text-error"
            >
              Borrar
            </button>
          </div>
        </form>
      </details>
    </li>
  );
}
