import type { Metadata } from 'next';
import { IBM_Plex_Mono, Urbanist } from 'next/font/google';
import { pie } from '@/content/landing';
import './globals.css';

// next/font descarga y aloja las tipografías en nuestro propio dominio: no hay
// pedido a Google en la visita y no hay salto de maquetado mientras carga.
// Una sola familia para todo el sitio. Urbanist es redondeada y abierta: lo
// contrario de la condensada técnica que teníamos, que hacía ver la página como
// un panel de administración y no como el sitio de una empresa de software.
const display = Urbanist({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--fuente-display',
  display: 'swap',
});

const cuerpo = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--fuente-cuerpo',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--fuente-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cayrelabs.com.ar'),
  title: {
    default: 'Cayre Labs — E-commerce, sistemas de gestión y marketing digital',
    template: '%s · Cayre Labs',
  },
  description: `${pie.bajada} para empresas argentinas. Desarrollamos tu tienda online y tu sistema, y hacemos el marketing que los llena de ventas.`,
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Cayre Labs',
    title: 'Cayre Labs — E-commerce, sistemas de gestión y marketing digital',
    description: `${pie.bajada} para empresas argentinas.`,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es-AR"
      className={`${display.variable} ${cuerpo.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-marca focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
