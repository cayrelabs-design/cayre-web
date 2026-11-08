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
    <section className="relative overflow-hidden border-b border-linea py-20 md:py-24">
      <Image
        src="/img/fondo-grilla.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fondo/75 via-fondo/88 to-fondo" />

      <div className="contenedor relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="rotulo">{diagnostico.etiqueta}</p>
          <h2 className="mt-3.5 text-[clamp(1.7rem,3.8vw,2.625rem)] leading-[1.05] font-extrabold">
            {diagnostico.titulo}
          </h2>
          <p className="mt-4 max-w-[46ch] text-[17px] text-texto-2">{diagnostico.texto}</p>
          <Link
            href="#contacto"
            className="mt-7 inline-flex min-h-12 items-center gap-2 bg-marca px-7 font-display font-semibold text-fondo transition hover:bg-marca-2"
          >
            {diagnostico.cta}
            <Icono nombre="flecha" className="size-4" />
          </Link>
        </div>

        <ul className="flex flex-col gap-px self-center bg-linea">
          {diagnostico.items.map((item, i) => (
            <li key={item} className="flex items-start gap-4 bg-fondo p-6">
              <span className="font-mono text-[11px] leading-6 text-marca-2" aria-hidden>
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
