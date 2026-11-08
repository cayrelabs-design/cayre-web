import { puntoDePartida } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Antes y después, en dos columnas enfrentadas.
 *
 * El punto de esta sección no es lucir el producto: es que el visitante se
 * reconozca en la columna izquierda. Por eso el "antes" va primero, en texto
 * apagado y tachado, y el "después" entra en blanco con el acento de la marca.
 */
export function PuntoDePartida() {
  return (
    <Seccion id="punto-de-partida">
      <Encabezamiento
        etiqueta={puntoDePartida.etiqueta}
        titulo={puntoDePartida.titulo}
        texto={puntoDePartida.texto}
      />

      <div className="border border-linea-2">
        <div className="grid grid-cols-2 border-b border-linea-2 bg-superficie">
          <p className="px-6 py-3.5 font-mono text-[10px] tracking-[0.14em] text-texto-3 uppercase">
            Como estaban
          </p>
          <p className="border-l border-linea-2 px-6 py-3.5 font-mono text-[10px] tracking-[0.14em] text-marca-2 uppercase">
            Como trabajan hoy
          </p>
        </div>

        <ul>
          {puntoDePartida.pares.map((par, i) => (
            <li
              key={par.antes}
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                i > 0 ? 'border-t border-linea' : ''
              }`}
            >
              <div className="flex items-start gap-3 px-6 py-5">
                <Icono nombre="flecha" className="mt-1 size-3.5 flex-none rotate-180 text-texto-3" />
                <span className="text-[15px] text-texto-3">{par.antes}</span>
              </div>
              <div className="flex items-start gap-3 border-t border-linea px-6 py-5 sm:border-t-0 sm:border-l sm:border-linea-2">
                <Icono nombre="check" className="mt-1 size-3.5 flex-none text-marca-2" />
                <span className="text-[15px] font-medium text-white">{par.despues}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-7 max-w-[62ch] text-[16px] text-texto-2">{puntoDePartida.cierre}</p>
    </Seccion>
  );
}
