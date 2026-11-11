import Link from 'next/link';
import { Encabezado } from '@/components/Encabezado';
import { Pie } from '@/components/Pie';
import { type Apartado, actualizado, responsable } from '@/content/legal';

/**
 * El molde de las páginas legales: mismo encabezado y mismo pie que la
 * portada, y el texto en una columna angosta, que es como se lee cómodo un
 * texto largo.
 *
 * No lleva animaciones: son páginas a las que se viene a leer.
 */
export function PaginaLegal({
  titulo,
  bajada,
  apartados,
}: {
  titulo: string;
  bajada: string;
  apartados: Apartado[];
}) {
  return (
    <>
      <Encabezado />
      <main id="contenido" className="relative overflow-x-clip">
        <div className="aura -top-32 left-1/2 size-[34rem] -translate-x-1/2 bg-marca/14" />

        <article className="contenedor relative max-w-[46rem] py-16 md:py-24">
          <p className="rotulo">Legales</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] leading-[1.08] font-bold">{titulo}</h1>
          <p className="mt-4 text-[17px] text-texto-2">{bajada}</p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-texto-3 uppercase">
            Actualizado el {actualizado}
          </p>

          <div className="mt-12 flex flex-col gap-10">
            {apartados.map((apartado) => (
              <section key={apartado.titulo}>
                <h2 className="text-[21px] leading-snug font-bold">{apartado.titulo}</h2>
                {apartado.parrafos?.map((parrafo) => (
                  <p key={parrafo} className="mt-3 text-[16px] leading-relaxed text-texto-2">
                    {parrafo}
                  </p>
                ))}
                {apartado.lista && (
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {apartado.lista.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[16px] leading-relaxed text-texto-2"
                      >
                        <span className="mt-[0.7em] size-1.5 flex-none rounded-full bg-cian" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {(responsable.razonSocial || responsable.cuit) && (
            <p className="mt-12 border-t border-white/8 pt-6 text-[13.5px] text-texto-3">
              {[responsable.razonSocial, responsable.cuit && `CUIT ${responsable.cuit}`]
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}

          <Link href="/" className="boton boton-secundario mt-12">
            Volver al inicio
          </Link>
        </article>
      </main>
      <Pie />
    </>
  );
}
