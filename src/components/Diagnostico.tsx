import Image from 'next/image';
import Link from 'next/link';
import { diagnostico } from '@/content/landing';
import { Icono } from './Icono';

/**
 * La puerta de entrada comercial. Va después de las líneas y de los proyectos
 * a propósito: el visitante acaba de ver todo lo que se hace y la pregunta que
 * le queda es "¿y yo por dónde empiezo?". Esta sección responde eso sin
 * obligarlo a elegir.
 *
 * A la derecha va una hoja de hallazgos: lo que suele aparecer cuando se mira
 * una operación, y lo que cuesta. Es la forma de mostrar el criterio —que es
 * lo que de verdad se contrata— sin escribir un párrafo sobre el criterio.
 *
 * Los hallazgos son ejemplos genéricos y la hoja lo dice al pie. Ver la
 * advertencia en src/content/landing.ts antes de cambiarlos.
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

      <div className="contenedor relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div data-revelar>
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

        {/* La hoja. Tiene encabezado y pie como un informe, para que se lea como
            un documento de trabajo y no como otra grilla de tarjetas. */}
        <div data-revelar className="vidrio con-desenfoque overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-white/8 px-6 py-4">
            <p className="rotulo !text-texto-2">{diagnostico.hallazgosTitulo}</p>
            <p className="hidden font-mono text-[10.5px] tracking-[0.12em] text-texto-3 uppercase sm:block">
              Relevamiento
            </p>
          </div>

          <ul>
            {/* En el teléfono van cuatro de los seis: la hoja entera ocupaba casi
                dos pantallas, y con cuatro áreas distintas la idea ya está. */}
            {diagnostico.hallazgos.map((h, i) => (
              <li
                key={h.area}
                data-revelar
                className={`gap-x-5 gap-y-1.5 border-b border-white/6 px-6 py-3.5 sm:grid sm:grid-cols-[8.5rem_1fr] ${
                  i < 4 ? 'grid' : 'hidden'
                }`}
              >
                <p className="flex items-center gap-2 self-start font-mono text-[10.5px] tracking-[0.12em] text-alerta uppercase sm:pt-1">
                  <span className="size-1.5 flex-none rounded-full bg-alerta" aria-hidden />
                  {h.area}
                </p>
                <div>
                  <p className="text-[15.5px] leading-snug font-semibold text-white">{h.vimos}</p>
                  <p className="mt-1 flex items-start gap-2 text-[14px] text-texto-2">
                    <Icono nombre="flecha" className="mt-[5px] size-3 flex-none text-texto-3" />
                    <span>{h.cuesta}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="px-6 py-3.5 text-[12.5px] text-texto-3">{diagnostico.hallazgosNota}</p>
        </div>
      </div>
    </section>
  );
}
