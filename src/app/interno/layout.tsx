import type { Metadata } from 'next';

/**
 * El envoltorio de todo el back office.
 *
 * Hace dos cosas:
 *
 *  1. Pone la clase `interno`, que es la que cambia los colores: adentro de
 *     este bloque el sitio deja de ser oscuro y pasa a ser claro (ver el final
 *     de globals.css).
 *
 *  2. Le dice a los buscadores que no indexen nada de acá. La web pública
 *     quiere aparecer en Google; esto es una herramienta interna con datos de
 *     clientes y no tiene que aparecer en ningún lado. (También lo dicen
 *     robots.txt y una cabecera en next.config.ts: tres avisos independientes.)
 *
 * La seguridad NO está acá: está en `exigirSocio()` y en las reglas de la base.
 */
export const metadata: Metadata = {
  // 'absolute' evita que se le pegue el final de la web publica ('· Valtus').
  title: { absolute: 'Valtus · Interno', template: '%s · Valtus interno' },
  description: 'Acceso interno.',
  robots: { index: false, follow: false },
  openGraph: null,
  twitter: null,
};

export default function Interno({ children }: LayoutProps<'/interno'>) {
  return <div className="interno min-h-screen flex-1 bg-fondo">{children}</div>;
}
