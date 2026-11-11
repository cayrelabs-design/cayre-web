import type { Metadata } from 'next';
import Link from 'next/link';
import { Estado } from '@/interno/components/Estado';
import {
  CONSULTA,
  ESTADOS_CONSULTA,
  HORAS_PROMETIDAS,
  type Consulta,
  type EstadoConsulta,
} from '@/interno/lib/dominio';
import { hace, horasDesde } from '@/interno/lib/formato';
import { exigirSocio, listarSocios } from '@/interno/lib/sesion';

export const metadata: Metadata = { title: 'Consultas' };

/**
 * La bandeja: lo que llega del formulario de la web.
 *
 * Arranca mostrando las que están "abiertas" (nuevas, contactadas y con
 * reunión), con las más viejas arriba: la que más espera es la primera que se
 * ve. Las ganadas y descartadas quedan a un clic.
 */
export default async function Consultas({ searchParams }: PageProps<'/interno/consultas'>) {
  const { supabase } = await exigirSocio();
  const socios = await listarSocios();
  const params = await searchParams;
  const filtro = ESTADOS_CONSULTA.find((e) => e === params.estado) as EstadoConsulta | undefined;

  let pedido = supabase
    .from('consultas')
    .select('id, nombre, empresa, telefono, email, mensaje, estado, responsable_id, created_at');
  pedido = filtro
    ? pedido.eq('estado', filtro)
    : pedido.in('estado', ['nueva', 'contactada', 'reunion']);
  const { data } = await pedido
    .order('created_at', { ascending: filtro !== 'ganada' && filtro !== 'descartada' })
    .limit(200)
    .returns<Consulta[]>();
  // En "Abiertas" van primero las que nadie tomo, y dentro de cada grupo la
  // que mas espera: la primera fila es siempre la mas urgente.
  const peso = { nueva: 0, contactada: 1, reunion: 2, ganada: 3, descartada: 4 } as const;
  const consultas = filtro ? (data ?? []) : [...(data ?? [])].sort((x, y) => peso[x.estado] - peso[y.estado]);

  // Cuántas hay en cada estado, para las solapas.
  const cuentas = await Promise.all(
    ESTADOS_CONSULTA.map(async (estado) => {
      const { count } = await supabase
        .from('consultas')
        .select('id', { count: 'exact', head: true })
        .eq('estado', estado);
      return [estado, count ?? 0] as const;
    }),
  );
  const cuenta = Object.fromEntries(cuentas) as Record<EstadoConsulta, number>;
  const abiertas = cuenta.nueva + cuenta.contactada + cuenta.reunion;

  return (
    <>
      <p className="irotulo">Consultas</p>
      <h1 className="mt-1.5 text-[28px] font-bold">Lo que llega desde la web</h1>

      <nav aria-label="Filtrar por estado" className="mt-6 flex flex-wrap gap-2">
        <Solapa href="/interno/consultas" activa={!filtro} nombre="Abiertas" cantidad={abiertas} />
        {ESTADOS_CONSULTA.map((estado) => (
          <Solapa
            key={estado}
            href={`/interno/consultas?estado=${estado}`}
            activa={filtro === estado}
            nombre={CONSULTA[estado].nombre}
            cantidad={cuenta[estado]}
          />
        ))}
      </nav>

      <div className="tarjeta mt-4 overflow-hidden">
        {consultas.length === 0 ? (
          <p className="px-6 py-14 text-center text-[15px] text-texto-3">
            {filtro ? 'No hay consultas en este estado.' : 'No hay consultas abiertas. Bandeja al día.'}
          </p>
        ) : (
          <ul className="divide-y divide-linea">
            {consultas.map((c) => {
              const tarde = c.estado === 'nueva' && horasDesde(c.created_at) > HORAS_PROMETIDAS;
              return (
                <li key={c.id}>
                  <Link
                    href={`/interno/consultas/${c.id}`}
                    className="grid gap-x-5 gap-y-1.5 px-5 py-4 transition hover:bg-superficie-2 sm:grid-cols-[1fr_auto] sm:px-6"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[15.5px] font-semibold">
                        {c.nombre}
                        {c.empresa && <span className="font-normal text-texto-3"> · {c.empresa}</span>}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-[14px] text-texto-2">{c.mensaje}</span>
                    </span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col sm:items-end sm:justify-center">
                      <Estado {...CONSULTA[c.estado]} />
                      <span className={`text-xs font-semibold ${tarde ? 'text-error' : 'text-texto-3'}`}>
                        {hace(c.created_at)}
                        {tarde && ` · pasó las ${HORAS_PROMETIDAS} h`}
                      </span>
                      <span className="text-xs text-texto-3">
                        {socios.find((s) => s.id === c.responsable_id)?.nombre ?? 'Sin responsable'}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

function Solapa({
  href,
  activa,
  nombre,
  cantidad,
}: {
  href: string;
  activa: boolean;
  nombre: string;
  cantidad: number;
}) {
  return (
    <Link
      href={href}
      aria-current={activa ? 'page' : undefined}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition ${
        activa
          ? 'border-marca bg-marca text-white'
          : 'border-linea-2 bg-superficie text-texto-2 hover:border-marca hover:text-marca'
      }`}
    >
      {nombre}
      <span className={`text-xs ${activa ? 'text-white/80' : 'text-texto-3'}`}>{cantidad}</span>
    </Link>
  );
}
