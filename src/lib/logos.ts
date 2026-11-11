import 'server-only';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Los logos se prenden solos al dejar el archivo en su carpeta.
 *
 *   public/logos/clientes/porcenot.svg
 *   public/logos/clientes/bodysculpt.svg
 *   public/logos/clientes/iberico-mayorista.svg
 *   public/logos/integraciones/tiendanube.svg
 *   public/logos/integraciones/mercado-libre.svg
 *   public/logos/integraciones/correo-argentino.svg
 *   public/logos/integraciones/arca.svg
 *
 * El nombre del archivo es el nombre de la marca en minúsculas, sin acentos y
 * con guiones (lo calcula `aSlug`). Sirve .svg, .webp o .png, en ese orden de
 * preferencia: el SVG se ve nítido a cualquier tamaño y pesa menos.
 *
 * Mientras el archivo no esté, la página muestra el nombre escrito, como
 * hasta ahora. Nunca queda un hueco ni una imagen rota: por eso la consulta
 * se hace acá, en el servidor y al construir la página, y no en el navegador.
 */

export type CarpetaDeLogos = 'clientes' | 'integraciones';

const EXTENSIONES = ['svg', 'webp', 'png'] as const;

export function logoPublicado(carpeta: CarpetaDeLogos, slug: string): string | null {
  for (const extension of EXTENSIONES) {
    const relativa = `logos/${carpeta}/${slug}.${extension}`;
    if (existsSync(join(process.cwd(), 'public', relativa))) return `/${relativa}`;
  }
  return null;
}
