import { type LogoResuelto, medidaDeLogo } from './Marca';

/**
 * Cinta de marcas que corre sola. Se frena al pasar el mouse por si alguien
 * quiere leer una.
 *
 * El truco: la lista se imprime dos veces y la pista se desplaza exactamente
 * la mitad. Cuando vuelve al principio, la segunda copia está donde estaba la
 * primera y el salto no se ve.
 *
 * Cada marca se muestra de la mejor forma que haya disponible:
 *   1. su logo oficial, si está en public/logos/integraciones/;
 *   2. su isotipo dibujado (los que trae Simple Icons) al lado del nombre;
 *   3. el nombre solo.
 * Nunca un logo inventado: uno mal dibujado es peor que el nombre bien escrito.
 */

export type MarcaDeCinta = {
  nombre: string;
  /** El logo oficial, ya comprobado en el servidor. */
  logo: LogoResuelto;
  /** Trazo del isotipo sobre una grilla de 24x24. */
  trazo: string | null;
};

export function Marquesina({ marcas }: { marcas: MarcaDeCinta[] }) {
  return (
    <div className="marquesina relative select-none">
      <div className="marquesina-pista">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0 items-center" aria-hidden={copia === 1}>
            {marcas.map((marca) => (
              <li key={marca.nombre} className="flex items-center gap-10 px-5">
                <span className="flex items-center gap-3 text-texto-3 transition-colors hover:text-white">
                  {marca.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={marca.logo.src}
                      alt={marca.nombre}
                      {...medidaDeLogo(marca.logo.proporcion, 26)}
                      className="logo-blanco logo-tenue max-w-none"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <>
                      {marca.trazo && (
                        <svg viewBox="0 0 24 24" className="size-6 flex-none" aria-hidden>
                          <path d={marca.trazo} fill="currentColor" />
                        </svg>
                      )}
                      <span className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-bold whitespace-nowrap">
                        {marca.nombre}
                      </span>
                    </>
                  )}
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
