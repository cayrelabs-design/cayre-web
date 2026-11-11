import type { Metadata } from 'next';
import Link from 'next/link';
import { Aviso, Estado } from '@/interno/components/Estado';
import { LINEAS, PROYECTO, type Proyecto, type Tarea } from '@/interno/lib/dominio';
import { diasHasta, fechaSola } from '@/interno/lib/formato';
import { exigirSocio, listarSocios } from '@/interno/lib/sesion';
import { crearProyecto } from '../acciones';

export const metadata: Metadata = { title: 'Proyectos' };

/**
 * Los proyectos, cada uno con lo que un socio necesita saber de un vistazo:
 * para cuándo está prometido, quién lo tiene, cuánto falta y si algo lo frena.
 */
export default async function Proyectos({ searchParams }: PageProps<'/interno/proyectos'>) {
  const { supabase } = await exigirSocio();
  const socios = await listarSocios();
  const params = await searchParams;
  const verTodos = params.ver === 'todos';

  let pedido = supabase
    .from('proyectos')
    .select('id, nombre, cliente, linea, estado, responsable_id, compromiso_el, descripcion, consulta_id, created_at');
  if (!verTodos) pedido = pedido.in('estado', ['activo', 'pausado']);
  const { data } = await pedido
    .order('compromiso_el', { ascending: true, nullsFirst: false })
    .returns<Proyecto[]>();
  const proyectos = data ?? [];

  // Las tareas de esos proyectos, para contar avance y trabas.
  const { data: tareas } = proyectos.length
    ? await supabase
        .from('tareas')
        .select('id, proyecto_id, estado')
        .in('proyecto_id', proyectos.map((p) => p.id))
        .returns<Pick<Tarea, 'id' | 'proyecto_id' | 'estado'>[]>()
    : { data: [] };

  const resumen = (id: number) => {
    const suyas = (tareas ?? []).filter((t) => t.proyecto_id === id);
    return {
      total: suyas.length,
      hechas: suyas.filter((t) => t.estado === 'hecha').length,
      trabadas: suyas.filter((t) => t.estado === 'trabada').length,
    };
  };

  return (
    <>
      <p className="irotulo">Proyectos</p>
      <div className="mt-1.5 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-[28px] font-bold">Qué le prometimos a quién</h1>
        <Link
          href={verTodos ? '/interno/proyectos' : '/interno/proyectos?ver=todos'}
          className="text-[13.5px] font-semibold text-marca hover:underline"
        >
          {verTodos ? 'Ver solo los abiertos' : 'Ver también terminados y cancelados'}
        </Link>
      </div>

      <div className="mt-5">
        <Aviso texto={typeof params.error === 'string' ? params.error : undefined} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-3">
          {proyectos.length === 0 && (
            <div className="tarjeta px-6 py-14 text-center text-[15px] text-texto-3">
              Todavía no hay proyectos cargados.
            </div>
          )}

          {proyectos.map((p) => {
            const r = resumen(p.id);
            const dias = p.compromiso_el ? diasHasta(p.compromiso_el) : null;
            const avance = r.total ? Math.round((r.hechas / r.total) * 100) : 0;
            return (
              <Link key={p.id} href={`/interno/proyectos/${p.id}`} className="tarjeta block p-5 transition hover:border-marca sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-[17px] font-bold">{p.nombre}</h2>
                    <p className="text-[14px] text-texto-2">
                      {p.cliente}
                      {p.linea && <span className="text-texto-3"> · {LINEAS[p.linea]}</span>}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {r.trabadas > 0 && (
                      <Estado nombre={`${r.trabadas} trabada${r.trabadas > 1 ? 's' : ''}`} tono="error" />
                    )}
                    {p.estado !== 'activo' && <Estado {...PROYECTO[p.estado]} />}
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-fondo" aria-hidden>
                  <div className="h-full rounded-full bg-marca" style={{ width: `${avance}%` }} />
                </div>

                <div className="mt-2.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[13px] text-texto-2">
                  <span>
                    {r.total === 0 ? 'Sin tareas cargadas' : `${r.hechas} de ${r.total} tareas hechas`}
                  </span>
                  <span>{socios.find((s) => s.id === p.responsable_id)?.nombre ?? 'Sin responsable'}</span>
                  <span
                    className={
                      dias !== null && dias < 0 && p.estado === 'activo' ? 'font-bold text-error' : undefined
                    }
                  >
                    {p.compromiso_el
                      ? `Prometido para el ${fechaSola(p.compromiso_el)}${
                          p.estado === 'activo' && dias !== null
                            ? dias < 0
                              ? ` · venció hace ${-dias} d`
                              : dias === 0
                                ? ' · hoy'
                                : ` · faltan ${dias} d`
                            : ''
                        }`
                      : 'Sin fecha prometida'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="tarjeta h-fit p-6">
          <h2 className="text-[17px] font-bold">Nuevo proyecto</h2>
          <FormularioProyecto socios={socios} />
        </section>
      </div>
    </>
  );
}

function FormularioProyecto({ socios }: { socios: { id: string; nombre: string }[] }) {
  return (
    <form action={crearProyecto} className="mt-4 flex flex-col gap-4">
      <div>
        <label htmlFor="nombre" className="etiqueta-campo">
          Nombre
        </label>
        <input id="nombre" name="nombre" required maxLength={160} placeholder="Qué se va a hacer" className="campo" />
      </div>
      <div>
        <label htmlFor="cliente" className="etiqueta-campo">
          Cliente
        </label>
        <input id="cliente" name="cliente" required maxLength={160} className="campo" />
      </div>
      <div className="grid grid-cols-2 gap-3">
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
        <div>
          <label htmlFor="compromiso_el" className="etiqueta-campo">
            Prometido para
          </label>
          <input id="compromiso_el" name="compromiso_el" type="date" className="campo" />
        </div>
      </div>
      <div>
        <label htmlFor="responsable_id" className="etiqueta-campo">
          Responsable
        </label>
        <select id="responsable_id" name="responsable_id" defaultValue="" className="campo">
          <option value="">Sin asignar</option>
          {socios.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="descripcion" className="etiqueta-campo">
          Alcance <span className="font-normal text-texto-3">(opcional)</span>
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={3}
          maxLength={4000}
          placeholder="Qué entra y qué queda afuera"
          className="campo resize-y"
        />
      </div>
      <button type="submit" className="ibtn ibtn-primario">
        Crear proyecto
      </button>
    </form>
  );
}
