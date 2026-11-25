import Link from 'next/link';
import { Encabezado } from '@/components/Encabezado';
import { Pie } from '@/components/Pie';
import { type BloqueDelSitio, actualizado, responsable } from '@/content/legal';
import type { TextoDePlataforma } from '@/content/legal-plataforma';

/**
 * El molde de las páginas legales: mismo encabezado y mismo pie que la
 * portada, y el texto en una columna angosta, que es como se lee cómodo un
 * texto largo.
 *
 * Cada página tiene dos partes, en este orden:
 *
 *  1. El texto de la plataforma, entero y sin tocar. Va primero porque es lo
 *     que tienen cargado las plataformas de terceros (Meta) para la
 *     aplicación, y lo que esperan encontrar al abrir la dirección.
 *  2. Lo propio de este sitio: el formulario de contacto. Va debajo, separado
 *     y con su propio título, para que no se confunda con lo anterior.
 *
 * No lleva animaciones: son páginas a las que se viene a leer.
 */
export function PaginaLegal({
  plataforma,
  sitio,
}: {
  plataforma: TextoDePlataforma;
  sitio: BloqueDelSitio;
}) {
  return (
    <>
      <Encabezado />
      <main id="contenido" className="relative overflow-x-clip">
        <div className="aura -top-32 left-1/2 size-[34rem] -translate-x-1/2 bg-marca/14" />

        <article className="contenedor relative max-w-[46rem] py-16 md:py-24">
          <p className="rotulo">Legales</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] leading-[1.08] font-bold">
            {plataforma.titulo}
          </h1>
          <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-texto-3 uppercase">
            Última actualización: {plataforma.actualizado}
          </p>

          {/* El texto viene armado por scripts/preparar-legales.mjs, que solo
              deja pasar etiquetas de texto. No es contenido que cargue un
              visitante: es un archivo del proyecto. */}
          <div className="prosa-legal mt-10" dangerouslySetInnerHTML={{ __html: plataforma.html }} />

          <section className="mt-16 border-t border-white/10 pt-12">
            <h2 className="text-[clamp(1.5rem,3.4vw,2rem)] leading-tight font-bold">{sitio.titulo}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-texto-2">{sitio.bajada}</p>
            <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-texto-3 uppercase">
              Esta parte se actualizó el {actualizado}
            </p>

            <div className="mt-9 flex flex-col gap-8">
              {sitio.apartados.map((apartado) => (
                <div key={apartado.titulo}>
                  <h3 className="text-[19px] leading-snug font-bold">{apartado.titulo}</h3>
                  {apartado.parrafos?.map((parrafo) => (
                    <p key={parrafo} className="mt-3 text-[16px] leading-relaxed text-texto-2">
                      {parrafo}
                    </p>
                  ))}
                  {apartado.lista && (
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {apartado.lista.map((item) => (
                        <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-texto-2">
                          <span className="mt-[0.7em] size-1.5 flex-none rounded-full bg-cian" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

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
