/**
 * La marca de Valtus.
 *
 * Hay dos piezas:
 *
 *  · `Isotipo`  — la doble V sola. Está dibujada acá como vector, con los
 *    puntos medidos sobre el archivo original del logo, para que herede el
 *    color del texto que la rodea y se vea nítida a cualquier tamaño.
 *    `scripts/preparar-marca.mjs` comprueba que el dibujo coincida con el
 *    original: si alguien mueve un punto, ese script lo avisa.
 *
 *  · `Logotipo` — el logo completo (la doble V más "ALTUS"). Va como imagen
 *    porque las letras son las del logo original y no las de la tipografía del
 *    sitio: reescribirlas con otra letra ya no sería el logo.
 *
 * Los dos colores de la marca son el marino #142041 (las letras) y el petróleo
 * #085682 (la doble V). Sobre el fondo oscuro de la web se usa la versión
 * clara: letras blancas y doble V celeste.
 */

/** Los puntos de la doble V, sobre una grilla de 120 de ancho por 89,25 de alto. */
export const V_EXTERIOR = '0,0 17.04,0 60,74.42 102.96,0 120,0 68.56,89.25 51.44,89.25';
export const V_INTERIOR = '34.38,0 51.42,0 60,14.83 68.59,0 85.72,0 60,44.55';
export const PROPORCION_ISOTIPO = 120 / 89.25;

export function Isotipo({ size = 25, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 89.25"
      width={Math.round(size * PROPORCION_ISOTIPO)}
      height={size}
      className={className}
      role="img"
      aria-label="Valtus"
      fill="currentColor"
    >
      <polygon points={V_EXTERIOR} />
      <polygon points={V_INTERIOR} />
    </svg>
  );
}

// Los archivos del logo miden 831 × 132: de ahí sale el ancho para cada alto.
const PROPORCION_LOGO = 831 / 132;

/**
 * El logo completo. `size` es el alto en píxeles; el ancho sale solo.
 *
 * `fondo` dice sobre qué va apoyado: 'oscuro' (la web pública) usa las letras
 * blancas; 'claro' (el back office) usa los colores originales.
 */
export function Logotipo({ size = 25, fondo = 'oscuro' }: { size?: number; fondo?: 'oscuro' | 'claro' }) {
  return (
    // Es <img> y no next/image a propósito: es un archivo chico, ya optimizado
    // por scripts/preparar-marca.mjs, y está en el encabezado de todas las
    // páginas: tiene que pedirse de entrada, sin esperar al scroll.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={fondo === 'oscuro' ? '/marca/valtus-logo-claro.png' : '/marca/valtus-logo.png'}
      alt="Valtus"
      width={Math.round(size * PROPORCION_LOGO)}
      height={size}
      decoding="async"
    />
  );
}
