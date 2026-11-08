import { funciones } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Las doce funciones de base.
 *
 * Antes cada una venía con su renglón de explicación: doce títulos y doce
 * descripciones, cien palabras que nadie lee porque los nombres ya dicen lo
 * que son. Ahora se ve la grilla de nombres —que se barre de un vistazo— y la
 * explicación aparece sola al pasar el mouse por encima.
 *
 * El alto se anima con `grid-rows` de 0fr a 1fr: es la forma de abrir un bloque
 * de alto desconocido sin que la tarjeta pegue un salto.
 */
export function Funciones() {
  return (
    <Seccion id="funciones">
      <Encabezamiento etiqueta={funciones.etiqueta} titulo={funciones.titulo} texto={funciones.texto} />

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {funciones.items.map((item) => (
          <li
            key={item.nombre}
            data-revelar
            className="vidrio vidrio-interactivo group flex items-start gap-4 p-5"
          >
            <span
              className="mt-0.5 flex-none text-cian transition-colors group-hover:text-marca-3"
              aria-hidden
            >
              <Icono nombre={item.icono} className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-[16px] font-bold">{item.nombre}</h3>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden text-[13.5px] text-texto-2">
                  <span className="block pt-1.5">{item.texto}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <p className="rotulo !text-texto-3">{funciones.rubroTitulo}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
          {funciones.rubros.map((rubro) => (
            <li
              key={rubro}
              className="vidrio vidrio-interactivo !rounded-full px-4 py-2 text-sm font-medium text-texto-2"
            >
              {rubro}
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
