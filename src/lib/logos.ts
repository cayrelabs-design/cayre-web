import 'server-only';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Los logos de otras empresas se prenden solos cuando el archivo está en su
 * carpeta:
 *
 *   public/logos/clientes/<marca>.png        las empresas que usan los sistemas
 *   public/logos/integraciones/<marca>.png   las plataformas con las que se conecta
 *
 * `<marca>` es el nombre en minúsculas, sin acentos y con guiones (lo calcula
 * `aSlug`): "Grupo Marquez" -> grupo-marquez.
 *
 * Los archivos NO se dejan a mano: los genera `scripts/preparar-logos.mjs` a
 * partir de los originales, sacándoles el fondo y los márgenes. Ese mismo
 * script anota la proporción de cada uno en public/logos/medidas.json.
 *
 * Mientras un logo no esté, la página muestra el nombre escrito. Nunca queda
 * un hueco ni una imagen rota: por eso la consulta se hace acá, en el servidor
 * y al construir la página, y no en el navegador.
 */

export type CarpetaDeLogos = 'clientes' | 'integraciones';

export type Logo = {
  src: string;
  /** Ancho dividido alto. Con esto la web le da a cada logo un tamaño parejo a la vista. */
  proporcion: number;
};

const EXTENSIONES = ['svg', 'webp', 'png'] as const;
const PUBLICA = join(process.cwd(), 'public');

let medidas: Record<string, [number, number]> | null = null;
function leerMedidas() {
  if (medidas) return medidas;
  try {
    medidas = JSON.parse(readFileSync(join(PUBLICA, 'logos', 'medidas.json'), 'utf8'));
  } catch {
    medidas = {};
  }
  return medidas!;
}

export function logoPublicado(carpeta: CarpetaDeLogos, slug: string): Logo | null {
  for (const extension of EXTENSIONES) {
    const relativa = `logos/${carpeta}/${slug}.${extension}`;
    if (!existsSync(join(PUBLICA, relativa))) continue;

    const medida = leerMedidas()[`${carpeta}/${slug}`];
    return {
      src: `/${relativa}`,
      // Sin medida anotada (un archivo dejado a mano) se supone un logo
      // apaisado común, de tres de ancho por uno de alto.
      proporcion: medida ? medida[0] / medida[1] : 3,
    };
  }
  return null;
}
