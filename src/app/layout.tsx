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
  metadataBase: new URL('https://valtus.com.ar'),
  title: {
    default: 'Valtus — E-commerce, sistemas de gestión y marketing digital',
    template: '%s · Valtus',
  },
  // Es lo que muestra Google debajo del título y lo que aparece al pegar el
  // enlace en WhatsApp: dice lo mismo que la portada.
  description: `Un equipo de gerentes que entra a tu operación y la ordena con sistemas propios. ${pie.bajada}, para empresas argentinas.`,
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Valtus',
    title: 'Valtus — E-commerce, sistemas de gestión y marketing digital',
    description:
      'Un equipo de gerentes que entra a tu operación y la ordena con sistemas propios.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="es-AR"
      className={`${display.variable} ${cuerpo.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        {/* Si el navegador no corre JavaScript, el observador que revela los
            bloques al hacer scroll nunca arranca y la página quedaría vacía.
            Esto lo desarma: una animación no puede esconder información. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-revelar]{opacity:1 !important;transform:none !important}',
            }}
          />
        </noscript>
      </head>
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
