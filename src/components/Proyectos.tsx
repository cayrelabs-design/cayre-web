import Link from 'next/link';
import { proyectos } from '@/content/landing';
import { Etapas } from './Etapas';
import { Icono } from './Icono';
import { Seccion } from './Seccion';

/**
 * ValtusCorp: los proyectos integrales.
 *
 * Es la sección que dice de qué tamaño son los problemas que Valtus toma. Las
 * otras líneas son sistemas que se contratan; ésta es un equipo de gerentes
 * que entra a una empresa y se hace cargo de la operación entera, por etapas.
 *
 * Hasta el 12/11/2026 era una tarjeta chica más entre los productos. El que
 * recorría la página se llevaba la idea de un proveedor de software para
 * comercios; con sección propia, se lleva la de un equipo que puede con una
 * estructura grande.
 *
 * El recorrido de las cuatro etapas se enciende con el scroll, igual que el
 * circuito de más arriba y con el mismo mecanismo: acá el movimiento también
 * explica algo — que cada etapa habilita la siguiente. Lo que se enciende son
 * los números y la línea; los textos están siempre a la vista, así que si la
 * animación no corre no se pierde nada.
 */

export function Proyectos() {
  const { etapas } = proyectos;

  return (
    <Seccion id="proyectos">
      <div className="aura top-24 -left-28 size-[28rem] bg-marca/14" />
      <div className="aura right-0 bottom-10 size-80 bg-cian/8" />

      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
        <div data-revelar>
          <p className="rotulo">{proyectos.etiqueta}</p>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(1.95rem,4.4vw,3.1rem)] leading-[1.08] font-bold">
            {proyectos.titulo}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] text-texto-2">{proyectos.texto}</p>
        </div>

        {/* El alcance, en etiquetas sueltas: se lee de un vistazo que no es
            "un sistema", y sin un solo párrafo. */}
        <div data-revelar>
          <p className="rotulo !text-texto-3">{proyectos.abarcaTitulo}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {proyectos.abarca.map((item) => (
              <li
                key={item}
                className="vidrio !rounded-full px-4 py-2 text-[13.5px] font-medium text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Las cuatro etapas, unidas por una línea que se enciende con el
          scroll. El dibujo vive en Etapas.tsx. */}
      <Etapas pasos={etapas} rotulo="Etapa" className="mt-14 lg:mt-16" />

      <p
        data-revelar
        className="mt-10 text-center font-mono text-[11px] tracking-[0.1em] text-marca-2 uppercase"
      >
        {proyectos.regla}
      </p>

      <div data-revelar className="vidrio-marca mt-8 !rounded-[28px] p-7 lg:p-9">
        <p className="rotulo !text-texto-3">{proyectos.modalidadTitulo}</p>
        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {proyectos.modalidad.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-white">
              <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] text-[14.5px] text-texto-2">{proyectos.condiciones}</p>
          <Link href="#contacto" className="boton boton-primario degradado flex-none">
            {proyectos.cta}
            <Icono nombre="flecha" className="size-4" />
          </Link>
        </div>
      </div>
    </Seccion>
  );
}
