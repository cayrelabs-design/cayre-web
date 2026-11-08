import Image from 'next/image';
import { contacto, portada } from '@/content/landing';
import { Icono } from './Icono';

export function Portada() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-linea">
      <Image
        src="/img/portada-almacen.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      {/* El degradado tiene que hacer dos cosas a la vez: dejar leer el titular
          sobre la izquierda y dejar ver la foto a la derecha. Si se pasa de
          oscuro —y es fácil pasarse— la imagen desaparece y la portada queda
          en negro. Por eso se corta en el 55% y suelta rápido. */}
      <div className="absolute inset-0 bg-gradient-to-r from-fondo from-25% via-fondo/82 via-55% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-fondo to-transparent" />

      <div className="contenedor relative py-24 md:py-32 lg:py-40">
        <div className="flex max-w-[48ch] flex-col gap-6">
          <p className="rotulo">{portada.etiqueta}</p>

          <h1 className="text-[clamp(2.25rem,5.5vw,3.875rem)] leading-[1.02] font-extrabold">
            {portada.titulo}
          </h1>

          <p className="max-w-[46ch] text-[clamp(1.05rem,1.8vw,1.2rem)] leading-relaxed text-texto-2">
            {portada.bajada}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="inline-flex min-h-12 items-center gap-2 bg-marca px-7 font-display font-semibold text-fondo transition hover:bg-marca-2"
            >
              {portada.ctaPrincipal}
              <Icono nombre="flecha" className="size-4" />
            </a>
            <a
              href="#servicios"
              className="inline-flex min-h-12 items-center border border-linea-2 bg-superficie-2 px-7 font-display font-semibold text-texto transition hover:border-linea-3 hover:bg-superficie-3"
            >
              {portada.ctaSecundario}
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-linea pt-6">
            <p className="rotulo text-texto-3">{portada.clientesTitulo}</p>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {portada.clientes.map((cliente) => (
                <li
                  key={cliente}
                  className="font-display text-lg font-bold tracking-tight text-texto-2"
                >
                  {cliente}
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-texto-3">{portada.clientesPie}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
