import { porQue } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Los diez compromisos.
 *
 * Eran diez tarjetas con título y párrafo, una pantalla y media de texto que
 * nadie lee entera. El título de cada compromiso ya es el compromiso: la
 * explicación se abre al pasar el mouse.
 *
 * Como son diez afirmaciones que van por escrito en cada propuesta, importa
 * que se vean las diez juntas: la cantidad es parte del argumento.
 */
export function PorQue() {
  return (
    <Seccion id="por-que">
      <Encabezamiento etiqueta={porQue.etiqueta} titulo={porQue.titulo} texto={porQue.texto} />

      <ul className="grid gap-2.5 md:grid-cols-2">
        {porQue.compromisos.map((c, i) => (
          <li
            key={c.titulo}
            data-revelar
            className="vidrio vidrio-interactivo group flex items-start gap-4 px-6 py-4"
          >
            <span className="mt-0.5 flex-none font-mono text-[11px] tracking-[0.12em] text-cian">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-[15.5px] leading-snug font-bold">{c.titulo}</h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden text-[13.5px] text-texto-2">
                  <span className="block pt-1.5">{c.texto}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="vidrio mt-6 p-7" data-revelar>
        <p className="rotulo !text-texto-3">{porQue.abonoTitulo}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {porQue.abono.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-texto-2">
              <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
