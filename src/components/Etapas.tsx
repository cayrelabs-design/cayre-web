import { Icono, type NombreIcono } from './Icono';

/**
 * Un recorrido de cuatro pasos unidos por una línea que se enciende con el
 * scroll. Lo usan dos lugares: las etapas de un proyecto integral
 * (Proyectos.tsx) y el "cómo se usa" de la página de cada sistema
 * (PaginaSistema.tsx).
 *
 * En pantalla ancha los pasos van en fila y la línea se llena de izquierda a
 * derecha; en el teléfono van en columna y la línea baja por el costado.
 *
 * Usa el mismo mecanismo que el circuito de la portada (ver globals.css). Lo
 * que se enciende son los círculos y la línea; los textos están siempre a la
 * vista, así que si la animación no corre no se pierde nada.
 *
 * ⚠️ Está pensado para CUATRO pasos: la línea de pantalla ancha va de centro a
 * centro de la primera y la última columna, y esa cuenta (12,5 % de cada lado)
 * sale de que son cuatro.
 */

/**
 * El tramo del scroll en el que se enciende cada pieza. Ver Circuito.tsx.
 *
 * Todo termina antes del 36 %: los cuatro pasos ya están encendidos cuando el
 * recorrido llega a la mitad de la pantalla, que es donde se lo lee. Si
 * terminara más tarde, el último se vería apagado justo al leerlo.
 */
const tramo = (desde: number, hasta: number) =>
  ({ '--desde': `cover ${desde}%`, '--hasta': `cover ${hasta}%` }) as React.CSSProperties;

export type Paso = {
  titulo: string;
  texto: string;
  /** Si no hay ícono, el círculo lleva el número del paso. */
  icono?: NombreIcono;
};

export function Etapas({
  pasos,
  rotulo,
  className = '',
}: {
  pasos: Paso[];
  /** La palabra que va arriba de cada título: "Etapa", "Paso"… */
  rotulo: string;
  className?: string;
}) {
  return (
    <div className={`circuito-escena relative ${className}`}>
      <div
        aria-hidden
        className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-white/10 lg:block"
      >
        <div className="etapas-avance h-full bg-gradient-to-r from-cian to-marca" style={tramo(10, 32)} />
      </div>

      <div aria-hidden className="absolute top-6 bottom-6 left-6 w-px bg-white/10 lg:hidden">
        <div className="circuito-linea h-full bg-gradient-to-b from-cian to-marca" style={tramo(8, 36)} />
      </div>

      <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
        {pasos.map((paso, i) => (
          <li
            key={paso.titulo}
            data-revelar
            className="flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
          >
            {/* El fondo del círculo es sólido a propósito: tapa la línea que
                pasa por detrás. */}
            <span
              aria-hidden
              className="flex size-12 flex-none items-center justify-center rounded-full border border-marca/50 bg-superficie"
            >
              <span className="circuito-nodo text-marca-3" style={tramo(8 + i * 6, 16 + i * 6)}>
                {paso.icono ? (
                  <Icono nombre={paso.icono} className="size-5" />
                ) : (
                  <span className="font-mono text-[13px] font-medium">{i + 1}</span>
                )}
              </span>
            </span>

            <div className="lg:mt-5">
              <p className="font-mono text-[10.5px] tracking-[0.16em] text-cian uppercase">
                {rotulo} {i + 1}
              </p>
              <h3 className="mt-1.5 text-[19px] leading-snug font-bold">{paso.titulo}</h3>
              <p className="mt-2 text-[14.5px] text-texto-2 lg:mx-auto lg:max-w-[26ch]">{paso.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
