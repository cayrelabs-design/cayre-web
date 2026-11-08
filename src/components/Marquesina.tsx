/**
 * Cinta de nombres que corre sola. Reemplaza a la lista estática de
 * integraciones: ocupa menos, se mira sola y se frena al pasar el mouse por si
 * alguien quiere leer una.
 *
 * El truco: la lista se imprime dos veces y la pista se desplaza exactamente
 * la mitad. Cuando vuelve al principio, la segunda copia está donde estaba la
 * primera y el salto no se ve.
 */
export function Marquesina({ nombres }: { nombres: string[] }) {
  return (
    <div className="marquesina relative select-none">
      <div className="marquesina-pista">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0" aria-hidden={copia === 1}>
            {nombres.map((nombre) => (
              <li key={nombre} className="flex items-center gap-10 px-5">
                <span className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-bold whitespace-nowrap text-texto-3 transition-colors hover:text-white">
                  {nombre}
                </span>
                <span className="size-1.5 rounded-full bg-marca/50" aria-hidden />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
