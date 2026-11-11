import { Icono, type NombreIcono } from './Icono';

/**
 * El dibujo del circuito: por dónde entra una venta y qué mueve adentro.
 *
 * Esto estaba contado en tres párrafos que nadie leía. Un diagrama con la
 * información viajando por las líneas dice lo mismo en dos segundos y es,
 * además, la única idea que tiene que llevarse el visitante: todo conectado,
 * un solo sistema.
 *
 * Es SVG dibujado a mano, no una imagen: pesa dos kilobytes, se ve nítido en
 * cualquier pantalla y el movimiento es una animación de trazo, sin JavaScript.
 */

const ENTRADAS: { nombre: string; icono: NombreIcono }[] = [
  { nombre: 'Tienda online', icono: 'bolsa' },
  { nombre: 'Local', icono: 'recibo' },
  { nombre: 'Mayorista', icono: 'carrito' },
  { nombre: 'WhatsApp', icono: 'chat' },
];

const SALIDAS: { nombre: string; icono: NombreIcono }[] = [
  { nombre: 'Stock', icono: 'caja' },
  { nombre: 'Caja y bancos', icono: 'banco' },
  { nombre: 'Facturación', icono: 'documento' },
  { nombre: 'Logística', icono: 'camion' },
  { nombre: 'Pauta', icono: 'objetivo' },
];

// Coordenadas del diagrama de escritorio. Se calculan acá arriba para que el
// SVG de abajo se lea y no sea una pared de números.
const ALTO = 440;
const ENTRADA_Y = ENTRADAS.map((_, i) => 112 + i * 72);
const SALIDA_Y = SALIDAS.map((_, i) => 100 + i * 60);

/**
 * El tramo del scroll en el que cada pieza se dibuja.
 *
 * `cover 0%` es el momento en que el diagrama asoma por abajo de la pantalla y
 * `cover 100%` cuando termina de salir por arriba. Dándole a cada pieza un
 * tramo corrido se arma la cascada: primero entran los cuatro canales, después
 * se prende el centro y recién al final salen las cinco operaciones.
 *
 * Todo termina en el 62%: el circuito queda completo cuando todavía está en el
 * medio de la pantalla, no cuando ya se está yendo. (Antes terminaba en el 88%
 * y había que scrollear demasiado para verlo entero.)
 */
const tramo = (desde: number, hasta: number) =>
  ({ '--desde': `cover ${desde}%`, '--hasta': `cover ${hasta}%` }) as React.CSSProperties;

const TRAMO_ENTRADA = (i: number) => tramo(12 + i * 3, 26 + i * 3);
const TRAMO_NUCLEO = tramo(30, 40);
const TRAMO_SALIDA = (i: number) => tramo(38 + i * 3, 50 + i * 3);

export function Circuito() {
  return (
    <section className="relative overflow-x-clip bg-fondo-2/60 py-20 md:py-24">
      <div className="aura top-1/4 left-1/2 size-[36rem] -translate-x-1/2 bg-marca/16" />

      <div className="contenedor relative">
        <div className="mx-auto mb-11 max-w-[52ch] text-center" data-revelar>
          <p className="rotulo">Una sola verdad</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.875rem)] leading-[1.1] font-bold">
            Vendas por donde vendas,{' '}
            <span className="texto-degradado">descuenta del mismo lugar.</span>
          </h2>
        </div>

        {/* Escritorio: el diagrama completo. Este div es el reloj de la
            escena; el dibujo de adentro avanza con el scroll. Ya no lleva
            `data-revelar` porque el dibujo ES su entrada. */}
        <div className="circuito-escena hidden md:block">
          <svg
            viewBox={`0 0 820 ${ALTO}`}
            className="h-auto w-full"
            role="img"
            aria-label="Diagrama: la tienda online, el local, el mayorista y WhatsApp entran a un solo sistema, que mueve stock, caja y bancos, facturación, logística y pauta."
          >
            <defs>
              <linearGradient id="circuito-trazo" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3fc8e4" />
                <stop offset="100%" stopColor="#6d4aff" />
              </linearGradient>
              <linearGradient id="circuito-nucleo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(109,74,255,0.35)" />
                <stop offset="100%" stopColor="rgba(63,200,228,0.12)" />
              </linearGradient>
            </defs>

            {/* Las líneas van primero para que pasen por debajo de las cajas. */}
            <g fill="none" stroke="url(#circuito-trazo)" strokeWidth="1.5">
              {ENTRADA_Y.map((y, i) => (
                <g key={`e${i}`}>
                  <path d={`M190,${y} C255,${y} 270,220 325,220`} opacity="0.22" />
                  <path
                    d={`M190,${y} C255,${y} 270,220 325,220`}
                    className="circuito-flujo"
                    pathLength={100}
                    style={{ ...TRAMO_ENTRADA(i), animationDelay: `${i * 0.45}s` }}
                  />
                </g>
              ))}
              {SALIDA_Y.map((y, i) => (
                <g key={`s${i}`}>
                  <path d={`M495,220 C550,220 565,${y} 630,${y}`} opacity="0.22" />
                  <path
                    d={`M495,220 C550,220 565,${y} 630,${y}`}
                    className="circuito-flujo"
                    pathLength={100}
                    style={{ ...TRAMO_SALIDA(i), animationDelay: `${0.9 + i * 0.45}s` }}
                  />
                </g>
              ))}
            </g>

            {/* Núcleo */}
            <g className="circuito-nodo" style={TRAMO_NUCLEO}>
              <rect
                x="325"
                y="170"
                width="170"
                height="100"
                rx="26"
                fill="url(#circuito-nucleo)"
                stroke="rgba(143,118,255,0.5)"
              />
              <text
                x="410"
                y="212"
                textAnchor="middle"
                className="fill-white font-display text-[17px] font-bold"
              >
                Un solo
              </text>
              <text
                x="410"
                y="236"
                textAnchor="middle"
                className="fill-white font-display text-[17px] font-bold"
              >
                sistema
              </text>
            </g>

            {ENTRADA_Y.map((y, i) => (
              <g key={ENTRADAS[i].nombre} className="circuito-nodo" style={TRAMO_ENTRADA(i)}>
                <rect
                  x="20"
                  y={y - 23}
                  width="170"
                  height="46"
                  rx="16"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.1)"
                />
                <text x="44" y={y + 5} className="fill-[#a8aece] font-sans text-[14px]">
                  {ENTRADAS[i].nombre}
                </text>
                <circle cx="32" cy={y} r="3" fill="#3fc8e4" />
              </g>
            ))}

            {SALIDA_Y.map((y, i) => (
              <g key={SALIDAS[i].nombre} className="circuito-nodo" style={TRAMO_SALIDA(i)}>
                <rect
                  x="630"
                  y={y - 23}
                  width="170"
                  height="46"
                  rx="16"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.1)"
                />
                <text x="654" y={y + 5} className="fill-[#a8aece] font-sans text-[14px]">
                  {SALIDAS[i].nombre}
                </text>
                <circle cx="642" cy={y} r="3" fill="#8f76ff" />
              </g>
            ))}
          </svg>
        </div>

        {/* Teléfono: el mismo circuito, apilado. El diagrama ancho ahí se
            vuelve ilegible, así que no se encoge: se rearma. */}
        <div className="circuito-escena md:hidden">
          <ul className="grid grid-cols-2 gap-2.5" data-revelar>
            {ENTRADAS.map((e) => (
              <li data-revelar key={e.nombre} className="vidrio flex items-center gap-2.5 px-4 py-3">
                <Icono nombre={e.icono} className="size-4 flex-none text-cian" />
                <span className="text-[13.5px] text-texto-2">{e.nombre}</span>
              </li>
            ))}
          </ul>

          <div
            className="circuito-linea relative mx-auto my-5 h-12 w-px bg-gradient-to-b from-cian to-marca"
            style={tramo(14, 30)}
          >
            <span className="latir absolute -left-[3px] size-1.5 rounded-full bg-white" />
          </div>

          <p className="vidrio-marca py-6 text-center font-display text-xl font-bold" data-revelar>
            Un solo sistema
          </p>

          <div
            className="circuito-linea relative mx-auto my-5 h-12 w-px bg-gradient-to-b from-marca to-cian"
            style={tramo(36, 52)}
          >
            <span className="latir absolute bottom-0 -left-[3px] size-1.5 rounded-full bg-white" />
          </div>

          <ul className="grid grid-cols-2 gap-2.5" data-revelar>
            {SALIDAS.map((s) => (
              <li data-revelar key={s.nombre} className="vidrio flex items-center gap-2.5 px-4 py-3">
                <Icono nombre={s.icono} className="size-4 flex-none text-marca-2" />
                <span className="text-[13.5px] text-texto-2">{s.nombre}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
