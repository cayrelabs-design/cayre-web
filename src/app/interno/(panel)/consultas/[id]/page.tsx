import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Aviso, Estado } from '@/interno/components/Estado';
import { Icono } from '@/interno/components/Icono';
import {
  CONSULTA,
  ESTADOS_CONSULTA,
  HORAS_PROMETIDAS,
  LINEAS,
  type Consulta,
} from '@/interno/lib/dominio';
import { diaLargo, hace, hora, horasDesde } from '@/interno/lib/formato';
import { exigirSocio, listarSocios } from '@/interno/lib/sesion';
import { anotarEnConsulta, cambiarConsulta, crearProyecto, tomarConsulta } from '../../acciones';

export const metadata: Metadata = { title: 'Consulta' };

type Nota = { id: number; autor_id: string; tipo: 'nota' | 'cambio'; texto: string; created_at: string };

export default async function FichaDeConsulta({ params, searchParams }: PageProps<'/interno/consultas/[id]'>) {
  const { supabase } = await exigirSocio();
  const socios = await listarSocios();
  const { id } = await params;
  const { error } = await searchParams;
  if (!/^\d+$/.test(id)) notFound();

  const { data: c } = await supabase
    .from('consultas')
    .select('id, nombre, empresa, telefono, email, mensaje, estado, responsable_id, atendida_el, created_at')
    .eq('id', Number(id))
    .maybeSingle<Consulta>();
  if (!c) notFound();

  const [{ data: notas }, { data: proyectos }] = await Promise.all([
    supabase
      .from('consulta_notas')
      .select('id, autor_id, tipo, texto, created_at')
      .eq('consulta_id', c.id)
      .order('created_at')
      .returns<Nota[]>(),
    supabase.from('proyectos').select('id, nombre').eq('consulta_id', c.id).returns<{ id: number; nombre: string }[]>(),
  ]);

  const nombreDe = (socioId: string | null) => socios.find((s) => s.id === socioId)?.nombre ?? 'Sin asignar';
  const tarde = c.estado === 'nueva' && horasDesde(c.created_at) > HORAS_PROMETIDAS;
  const soloDigitos = c.telefono?.replace(/\D/g, '') ?? '';

  return (
    <>
      <Link href="/interno/consultas" className="text-[13.5px] font-semibold text-marca hover:underline">
        ← Consultas
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-[28px] font-bold">{c.nombre}</h1>
        <Estado {...CONSULTA[c.estado]} />
      </div>
      <p className={`mt-1 text-sm ${tarde ? 'font-semibold text-error' : 'text-texto-3'}`}>
        Llegó {hace(c.created_at)} · {diaLargo(c.created_at)}, {hora(c.created_at)}
        {tarde && ` · pasó las ${HORAS_PROMETIDAS} horas prometidas`}
      </p>

      <div className="mt-5">
        <Aviso texto={typeof error === 'string' ? error : undefined} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <section className="tarjeta p-6">
            <h2 className="irotulo">Lo que escribió</h2>
            <p className="mt-3 text-[16px] leading-relaxed whitespace-pre-wrap">{c.mensaje}</p>

            <dl className="mt-6 grid gap-4 border-t border-linea pt-5 sm:grid-cols-3">
              <Dato nombre="Empresa" valor={c.empresa} />
              <div>
                <dt className="irotulo">Teléfono</dt>
                <dd className="mt-1 text-[15px]">
                  {c.telefono ? (
                    <a
                      href={`https://wa.me/${soloDigitos}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-marca hover:underline"
                    >
                      {c.telefono}
                    </a>
                  ) : (
                    <span className="text-texto-3">No dejó</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="irotulo">Mail</dt>
                <dd className="mt-1 text-[15px] break-all">
                  {c.email ? (
                    <a href={`mailto:${c.email}`} className="font-semibold text-marca hover:underline">
                      {c.email}
                    </a>
                  ) : (
                    <span className="text-texto-3">No dejó</span>
                  )}
                </dd>
              </div>
            </dl>
          </section>

          <section className="tarjeta p-6">
            <h2 className="text-[17px] font-bold">Historial</h2>
            {(notas ?? []).length === 0 ? (
              <p className="mt-3 text-[14.5px] text-texto-3">Todavía no hay nada anotado.</p>
            ) : (
              <ol className="mt-4 flex flex-col gap-4">
                {(notas ?? []).map((n) => (
                  <li key={n.id} className="flex gap-3">
                    <span
                      className={`mt-1.5 size-2 flex-none rounded-full ${n.tipo === 'cambio' ? 'bg-linea-2' : 'bg-marca'}`}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className={`text-[15px] whitespace-pre-wrap ${n.tipo === 'cambio' ? 'text-texto-2' : ''}`}>
                        {n.texto}
                      </p>
                      <p className="mt-0.5 text-xs text-texto-3">
                        {nombreDe(n.autor_id)} · {hace(n.created_at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <form action={anotarEnConsulta} className="mt-5 border-t border-linea pt-5">
              <input type="hidden" name="id" value={c.id} />
              <label htmlFor="texto" className="etiqueta-campo">
                Agregar una nota
              </label>
              <textarea
                id="texto"
                name="texto"
                rows={3}
                required
                maxLength={4000}
                placeholder="Qué se habló, qué quedó pendiente…"
                className="campo resize-y"
              />
              <button type="submit" className="ibtn ibtn-secundario ibtn-chico mt-3">
                Guardar nota
              </button>
            </form>
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <section className="tarjeta p-6">
            <h2 className="text-[17px] font-bold">Seguimiento</h2>

            {c.estado === 'nueva' && (
              <form action={tomarConsulta} className="mt-4">
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="ibtn ibtn-primario w-full">
                  <Icono nombre="check" className="size-4" />
                  La tomo yo
                </button>
                <p className="mt-2 text-xs text-texto-3">
                  Queda a tu nombre y pasa a «Contactada».
                </p>
              </form>
            )}

            <form action={cambiarConsulta} className="mt-5 flex flex-col gap-4">
              <input type="hidden" name="id" value={c.id} />
              <div>
                <label htmlFor="estado" className="etiqueta-campo">
                  Estado
                </label>
                <select id="estado" name="estado" defaultValue={c.estado} className="campo">
                  {ESTADOS_CONSULTA.map((e) => (
                    <option key={e} value={e}>
                      {CONSULTA[e].nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="responsable_id" className="etiqueta-campo">
                  Responsable
                </label>
                <select
                  id="responsable_id"
                  name="responsable_id"
                  defaultValue={c.responsable_id ?? ''}
                  className="campo"
                >
                  <option value="">Sin asignar</option>
                  {socios.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="ibtn ibtn-secundario">
                Guardar
              </button>
            </form>
          </section>

          <section className="tarjeta p-6">
            <h2 className="text-[17px] font-bold">Siguiente paso</h2>
            <Link
              href={`/interno/agenda?consulta=${c.id}&titulo=${encodeURIComponent(`Diagnóstico — ${c.empresa || c.nombre}`)}&con=${encodeURIComponent(c.nombre)}#nueva`}
              className="ibtn ibtn-secundario mt-4 w-full"
            >
              <Icono nombre="calendario" className="size-4" />
              Agendar el diagnóstico
            </Link>

            {(proyectos ?? []).length > 0 ? (
              <div className="mt-5 border-t border-linea pt-4">
                <p className="irotulo">Proyecto</p>
                {(proyectos ?? []).map((p) => (
                  <Link
                    key={p.id}
                    href={`/interno/proyectos/${p.id}`}
                    className="mt-2 block font-semibold text-marca hover:underline"
                  >
                    {p.nombre} →
                  </Link>
                ))}
              </div>
            ) : (
              <details className="mt-4 border-t border-linea pt-4">
                <summary className="cursor-pointer text-[14.5px] font-semibold text-marca">
                  Se ganó: convertir en proyecto
                </summary>
                <form action={crearProyecto} className="mt-4 flex flex-col gap-3">
                  <input type="hidden" name="consulta_id" value={c.id} />
                  <input type="hidden" name="descripcion" value="" />
                  <input type="hidden" name="compromiso_el" value="" />
                  <div>
                    <label htmlFor="nombre" className="etiqueta-campo">
                      Nombre del proyecto
                    </label>
                    <input id="nombre" name="nombre" required className="campo" />
                  </div>
                  <div>
                    <label htmlFor="cliente" className="etiqueta-campo">
                      Cliente
                    </label>
                    <input
                      id="cliente"
                      name="cliente"
                      required
                      defaultValue={c.empresa || c.nombre}
                      className="campo"
                    />
                  </div>
                  <div>
                    <label htmlFor="linea" className="etiqueta-campo">
                      Línea
                    </label>
                    <select id="linea" name="linea" defaultValue="" className="campo">
                      <option value="">Sin definir</option>
                      {Object.entries(LINEAS).map(([clave, nombre]) => (
                        <option key={clave} value={clave}>
                          {nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input type="hidden" name="responsable_id" value={c.responsable_id ?? ''} />
                  <button type="submit" className="ibtn ibtn-primario">
                    Crear proyecto
                  </button>
                </form>
              </details>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

function Dato({ nombre, valor }: { nombre: string; valor: string | null }) {
  return (
    <div>
      <dt className="irotulo">{nombre}</dt>
      <dd className="mt-1 text-[15px]">{valor || <span className="text-texto-3">No dejó</span>}</dd>
    </div>
  );
}
