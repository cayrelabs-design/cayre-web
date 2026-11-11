import Link from 'next/link';
import { Icono, Isotipo } from '@/interno/components/Icono';
import { Menu } from '@/interno/components/Menu';
import { exigirSocio } from '@/interno/lib/sesion';
import { salir } from '../ingresar/acciones';

/**
 * El marco de todas las pantallas de adentro: menú, nombre del socio y salir.
 *
 * Lo primero que hace es `exigirSocio()`. Como este marco envuelve a todas las
 * páginas del back office, ninguna se dibuja sin haber pasado por ahí.
 * (Cada página y cada acción lo vuelve a pedir igual: el marco no es la única
 * barrera, es la primera.)
 */
export default async function Panel({ children }: LayoutProps<'/interno'>) {
  const { supabase, socio } = await exigirSocio();

  // El globito del menú: cuántas consultas esperan respuesta.
  const { count } = await supabase
    .from('consultas')
    .select('id', { count: 'exact', head: true })
    .eq('estado', 'nueva');

  return (
    <div className="lg:flex lg:min-h-screen">
      {/* Columna lateral en computadora */}
      <aside className="hidden w-64 flex-none flex-col border-r border-linea bg-superficie px-4 py-6 lg:flex">
        <Link href="/interno" className="mb-8 flex items-center gap-3 px-2 text-marca">
          <Isotipo />
          <span>
            <span className="block text-[17px] leading-tight font-bold tracking-tight text-texto">
              Cayre Labs
            </span>
            <span className="irotulo !text-[9.5px]">Interno</span>
          </span>
        </Link>

        <Menu nuevas={count ?? 0} />

        <div className="mt-auto border-t border-linea pt-4">
          <div className="flex items-center gap-3 px-2">
            <span className="flex size-9 flex-none items-center justify-center rounded-full bg-marca-suave text-sm font-bold text-marca-oscura">
              {socio.nombre.slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{socio.nombre}</span>
              <span className="block truncate text-xs text-texto-3">{socio.email}</span>
            </span>
          </div>
          <form action={salir} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] font-semibold text-texto-2 hover:bg-fondo hover:text-texto"
            >
              <Icono nombre="salir" />
              Salir
            </button>
          </form>
        </div>
      </aside>

      {/* Barra de arriba en el teléfono */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-linea bg-superficie px-4 py-3 lg:hidden">
        <Link href="/interno" className="flex items-center gap-2.5 text-marca">
          <Isotipo size={24} />
          <span className="font-bold tracking-tight text-texto">Cayre interno</span>
        </Link>
        <form action={salir}>
          <button type="submit" className="flex items-center gap-1.5 text-sm font-semibold text-texto-2">
            <Icono nombre="salir" className="size-4" />
            Salir
          </button>
        </form>
      </header>

      <main id="contenido" className="min-w-0 flex-1 px-4 pt-6 pb-28 sm:px-7 lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[72rem]">{children}</div>
      </main>

      {/* Menú fijo abajo en el teléfono */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-superficie px-2 py-1.5 lg:hidden">
        <Menu nuevas={count ?? 0} />
      </div>
    </div>
  );
}
