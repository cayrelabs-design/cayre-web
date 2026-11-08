import { puntoDePartida } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Antes y después, en dos columnas enfrentadas.
 *
 * El punto de esta sección no es lucir el producto: es que el visitante se
 * reconozca en la columna izquierda. Por eso el "antes" va primero, en texto
 * apagado, y el "después" entra en blanco con el acento de la marca.
 */
export function PuntoDePartida() {
  return (
    <Seccion id="punto-de-partida">
      <Encabezamiento
        etiqueta={puntoDePartida.etiqueta}
        titulo={puntoDePartida.titulo}
        texto={puntoDePartida.texto}
      />

      <div className="vidrio overflow-hidden !rounded-[32px]">
        <div className="grid grid-cols-2 border-b border-white/8 bg-white/4">
          <p className="px-6 py-4 font-mono text-[10px] tracking-[0.14em] text-texto-3 uppercase">
            Como estaban
          </p>
          <p className="border-l border-white/8 px-6 py-4 font-mono text-[10px] tracking-[0.14em] text-marca-2 uppercase">
            Como trabajan hoy
          </p>
        </div>

        <ul>
          {puntoDePartida.pares.map((par, i) => (
            <li
              key={par.antes}
              className={`grid grid-cols-1 sm:grid-cols-2 ${i > 0 ? 'border-t border-white/6' : ''}`}
            >
              <div className="flex items-start gap-3 px-6 py-5">
                <Icono nombre="flecha" className="mt-1 size-3.5 flex-none rotate-180 text-texto-3" />
                <span className="text-[15px] text-texto-3">{par.antes}</span>
              </div>
              <div className="flex items-start gap-3 border-t border-white/6 px-6 py-5 sm:border-t-0 sm:border-l sm:border-white/8">
                <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
                <span className="text-[15px] font-medium text-white">{par.despues}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-[62ch] text-center text-[16px] text-texto-2">
        {puntoDePartida.cierre}
      </p>
    </Seccion>
  );
}
