import type { Metadata } from 'next';
import Link from 'next/link';
import { Aviso, Estado } from '@/interno/components/Estado';
import { REUNION, type Reunion } from '@/interno/lib/dominio';
import { claveDia, diaLargo, haceHoras, hora, hoy } from '@/interno/lib/formato';
import { exigirSocio, listarSocios } from '@/interno/lib/sesion';
import { cambiarReunion, crearReunion } from '../acciones';

export const metadata: Metadata = { title: 'Agenda' };

type ReunionConOrigen = Reunion & {
  consultas: { nombre: string } | null;
  proyectos: { nombre: string } | null;
};

/**
 * La agenda. A la izquierda lo que viene, agrupado por día; a la derecha el
 * formulario para agendar. Las reuniones pasadas quedan abajo, plegadas.
 *
 * Una reunión no se borra: se marca como hecha o como cancelada, y queda que
 * existió.
 */
export default async function Agenda({ searchParams }: PageProps<'/interno/agenda'>) {
  const { supabase, socio } = await exigirSocio();
  const socios = await listarSocios();
  const params = await searchParams;
  const dato = (clave: string) => (typeof params[clave] === 'string' ? (params[clave] as string) : '');

  const campos =
    'id, titulo, inicia_el, duracion_min, con_quien, lugar, notas, estado, consulta_id, proyecto_id, reunion_participantes(socio_id), consultas(nombre), proyectos(nombre)';
  const desde = haceHoras(2);

  const [{ data: proximas }, { data: pasadas }] = await Promise.all([
    supabase
      .from('reuniones')
      .select(campos)
      .gte('inicia_el', desde)
      .neq('estado', 'cancelada')
      .order('inicia_el')
      .limit(100)
      .returns<ReunionConOrigen[]>(),
    supabase
      .from('reuniones')
      .select(campos)
      .lt('inicia_el', desde)
      .order('inicia_el', { ascending: false })
      .limit(15)
      .returns<ReunionConOrigen[]>(),
  ]);

  // Se agrupan por día (en hora argentina).
  const porDia = new Map<string, ReunionConOrigen[]>();
  for (const r of proximas ?? []) {
    const clave = claveDia(r.inicia_el);
    porDia.set(clave, [...(porDia.get(clave) ?? []), r]);
  }

  const nombreDe = (id: string) => socios.find((s) => s.id === id)?.nombre.split(' ')[0] ?? '¿?';
  const consultaId = /^\d+$/.test(dato('consulta')) ? dato('consulta') : '';
  const proyectoId = /^\d+$/.test(dato('proyecto')) ? dato('proyecto') : '';

  return (
    <>
      <p className="irotulo">Agenda</p>
      <h1 className="mt-1.5 text-[28px] font-bold">Reuniones</h1>

      <div className="mt-5">
        <Aviso texto={dato('error') || undefined} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col gap-5">
          {porDia.size === 0 && (
            <div className="tarjeta px-6 py-14 text-center text-[15px] text-texto-3">
              No hay reuniones agendadas.
            </div>
          )}

          {[...porDia.entries()].map(([dia, reuniones]) => (
            <section key={dia} className="tarjeta p-6">
              <h2 className="flex items-center gap-2 text-[16px] font-bold first-letter:uppercase">
                {diaLargo(reuniones[0].inicia_el)}
                {dia === hoy() && <Estado nombre="Hoy" tono="marca" />}
              </h2>
              <ul className="mt-3 divide-y divide-linea">
                {reuniones.map((r) => (
                  <Fila key={r.id} r={r} nombreDe={nombreDe} />
                ))}
              </ul>
            </section>
          ))}

          {(pasadas ?? []).length > 0 && (
            <details className="tarjeta p-6">
              <summary className="cursor-pointer text-[15px] font-bold">
                Reuniones pasadas ({(pasadas ?? []).length})
              </summary>
              <ul className="mt-3 divide-y divide-linea">
                {(pasadas ?? []).map((r) => (
                  <Fila key={r.id} r={r} nombreDe={nombreDe} conFecha />
                ))}
              </ul>
            </details>
          )}
        </div>

        <section id="nueva" className="tarjeta h-fit scroll-mt-24 p-6">
          <h2 className="text-[17px] font-bold">Agendar una reunión</h2>
          <form action={crearReunion} className="mt-4 flex flex-col gap-4">
            <input type="hidden" name="consulta_id" value={consultaId} />
            <input type="hidden" name="proyecto_id" value={proyectoId} />
            {(consultaId || proyectoId) && (
              <p className="rounded-xl bg-marca-suave px-3.5 py-2.5 text-[13.5px] font-semibold text-marca-oscura">
                Queda atada a {consultaId ? `la consulta #${consultaId}` : `el proyecto #${proyectoId}`}.
              </p>
            )}

            <div>
              <label htmlFor="titulo" className="etiqueta-campo">
                De qué es
              </label>
              <input
                id="titulo"
                name="titulo"
                required
                maxLength={160}
                defaultValue={dato('titulo')}
                placeholder="Diagnóstico, avance, entrega…"
                className="campo"
              />
            </div>

            <div className="grid grid-cols-[1fr_7rem] gap-3">
              <div>
                <label htmlFor="cuando" className="etiqueta-campo">
                  Día y hora
                </label>
                <input id="cuando" name="cuando" type="datetime-local" required className="campo" />
              </div>
              <div>
                <label htmlFor="duracion_min" className="etiqueta-campo">
                  Minutos
                </label>
                <input
                  id="duracion_min"
                  name="duracion_min"
                  type="number"
                  min={5}
                  max={600}
                  step={5}
                  defaultValue={30}
                  className="campo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="con_quien" className="etiqueta-campo">
                Con quién <span className="font-normal text-texto-3">(del otro lado)</span>
              </label>
              <input
                id="con_quien"
                name="con_quien"
                maxLength={160}
                defaultValue={dato('con')}
                placeholder="Persona o empresa"
                className="campo"
              />
            </div>

            <div>
              <label htmlFor="lugar" className="etiqueta-campo">
                Lugar o enlace
              </label>
              <input
                id="lugar"
                name="lugar"
                maxLength={400}
                placeholder="Dirección o link de la videollamada"
                className="campo"
              />
            </div>

            <fieldset>
              <legend className="etiqueta-campo">Quiénes vamos</legend>
              <div className="flex flex-wrap gap-2">
                {socios.map((s) => (
                  <label
                    key={s.id}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-linea-2 px-3.5 py-2 text-[13.5px] font-semibold has-checked:border-marca has-checked:bg-marca-suave has-checked:text-marca-oscura"
                  >
                    <input
                      type="checkbox"
                      name="participantes"
                      value={s.id}
                      defaultChecked={s.id === socio.id}
                      className="accent-marca"
                    />
                    {s.nombre.split(' ')[0]}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="notas" className="etiqueta-campo">
                Notas <span className="font-normal text-texto-3">(opcional)</span>
              </label>
              <textarea id="notas" name="notas" rows={2} maxLength={4000} className="campo resize-y" />
            </div>

            <button type="submit" className="ibtn ibtn-primario">
              Agendar
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

function Fila({
  r,
  nombreDe,
  conFecha,
}: {
  r: ReunionConOrigen;
  nombreDe: (id: string) => string;
  conFecha?: boolean;
}) {
  const esEnlace = r.lugar?.startsWith('http');
  return (
    <li className="flex flex-wrap items-start gap-x-4 gap-y-2 py-3.5">
      <span className="w-14 flex-none">
        <span className="block text-[17px] font-bold">{hora(r.inicia_el)}</span>
        <span className="block text-xs text-texto-3">{r.duracion_min} min</span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className={`text-[15.5px] font-semibold ${r.estado === 'cancelada' ? 'line-through' : ''}`}>
            {r.titulo}
          </span>
          {r.estado !== 'agendada' && <Estado {...REUNION[r.estado]} />}
        </span>
        <span className="mt-0.5 block text-[13.5px] text-texto-2">
          {[
            conFecha && diaLargo(r.inicia_el),
            r.con_quien,
            r.reunion_participantes.map((p) => nombreDe(p.socio_id)).join(', '),
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
        {r.lugar &&
          (esEnlace ? (
            <a
              href={r.lugar}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 block truncate text-[13.5px] font-semibold text-marca hover:underline"
            >
              {r.lugar}
            </a>
          ) : (
            <span className="mt-0.5 block text-[13.5px] text-texto-3">{r.lugar}</span>
          ))}
        {r.notas && <span className="mt-1 block text-[13.5px] whitespace-pre-wrap text-texto-3">{r.notas}</span>}
        <span className="mt-1 flex flex-wrap gap-x-3 text-xs">
          {r.consulta_id && (
            <Link href={`/interno/consultas/${r.consulta_id}`} className="font-semibold text-marca hover:underline">
              Consulta de {r.consultas?.nombre ?? `#${r.consulta_id}`}
            </Link>
          )}
          {r.proyecto_id && (
            <Link href={`/interno/proyectos/${r.proyecto_id}`} className="font-semibold text-marca hover:underline">
              Proyecto {r.proyectos?.nombre ?? `#${r.proyecto_id}`}
            </Link>
          )}
        </span>
      </span>

      {r.estado === 'agendada' && (
        <span className="flex flex-none gap-1.5">
          <form action={cambiarReunion}>
            <input type="hidden" name="id" value={r.id} />
            <input type="hidden" name="estado" value="hecha" />
            <button type="submit" className="ibtn ibtn-secundario ibtn-chico">
              Hecha
            </button>
          </form>
          <form action={cambiarReunion}>
            <input type="hidden" name="id" value={r.id} />
            <input type="hidden" name="estado" value="cancelada" />
            <button type="submit" className="ibtn ibtn-secundario ibtn-chico !text-texto-3">
              Cancelar
            </button>
          </form>
        </span>
      )}
    </li>
  );
}
