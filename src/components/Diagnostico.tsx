import Image from 'next/image';
import Link from 'next/link';
import { diagnostico } from '@/content/landing';
import { Icono } from './Icono';

/**
 * La puerta de entrada comercial. Va después de los sistemas a propósito: el
 * visitante acaba de ver seis productos y la pregunta que le queda es "¿y cuál
 * necesito yo?". Esta sección responde eso sin obligarlo a elegir.
 */
export function Diagnostico() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <Image
        src="/img/fondo-grilla.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fondo/80 via-fondo/90 to-fondo" />
      <div className="aura top-0 left-1/3 size-[30rem] bg-marca/18" />

      <div data-revelar className="contenedor relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="rotulo">{diagnostico.etiqueta}</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.875rem)] leading-[1.1] font-bold">
            {diagnostico.titulo}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[17px] text-texto-2">{diagnostico.texto}</p>
          <Link href="#contacto" className="boton boton-primario degradado mt-8">
            {diagnostico.cta}
            <Icono nombre="flecha" className="size-4" />
          </Link>
        </div>

        <ul className="flex flex-col gap-3 self-center">
          {diagnostico.items.map((item, i) => (
            <li data-revelar key={item} className="vidrio vidrio-interactivo flex items-start gap-4 p-6">
              <span className="font-mono text-[11px] leading-6 text-cian" aria-hidden>
                0{i + 1}
              </span>
              <span className="text-[15.5px] text-texto-2">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
