import Link from 'next/link';
import { Encabezado } from '@/components/Encabezado';
import { Pie } from '@/components/Pie';

/**
 * La página de "no existe". Sin esto, el que entra por un enlace viejo o mal
 * escrito ve la pantalla blanca de Next.js en inglés y se va. Acá se queda en
 * el sitio, con el menú y un camino de vuelta.
 */
export default function NoEncontrada() {
  return (
    <>
      <Encabezado />
      <main id="contenido" className="relative overflow-x-clip">
        <div className="aura top-0 left-1/2 size-[30rem] -translate-x-1/2 bg-marca/16" />
        <div className="contenedor relative flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
          <p className="rotulo">Error 404</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-bold">
            Esta página <span className="texto-degradado">no existe.</span>
          </h1>
          <p className="mt-4 max-w-[44ch] text-[17px] text-texto-2">
            Puede que el enlace esté viejo o mal escrito. Lo que buscás seguro está en el inicio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="boton boton-primario degradado">
              Ir al inicio
            </Link>
            <Link href="/#contacto" className="boton boton-secundario">
              Escribinos
            </Link>
          </div>
        </div>
      </main>
      <Pie />
    </>
  );
}
