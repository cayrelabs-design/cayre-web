import type { NextConfig } from 'next';

/**
 * Cabeceras de seguridad que viajan con cada página.
 *
 * Son instrucciones para el navegador del visitante. Ninguna cambia cómo se ve
 * el sitio; cierran puertas que no usamos:
 *
 *  · X-Frame-Options / frame-ancestors: nadie puede meter nuestro sitio dentro
 *    de un marco en otra página. Es la defensa contra el "clickjacking": poner
 *    nuestro formulario invisible debajo de un botón ajeno.
 *  · X-Content-Type-Options: el navegador no adivina el tipo de un archivo; usa
 *    el que le decimos. Evita que algo subido como imagen se ejecute como código.
 *  · Referrer-Policy: cuando el visitante sale hacia otro sitio, ese sitio se
 *    entera de qué dominio viene, pero no de qué página exacta.
 *  · Permissions-Policy: el sitio declara que no usa cámara, micrófono ni
 *    ubicación, así que ningún código incrustado puede pedirlos en su nombre.
 *  · Strict-Transport-Security: una vez que el navegador entró por https, no
 *    vuelve a intentar por http durante dos años.
 *
 * El back office (/interno) suma dos más estrictas: que ningún buscador lo
 * indexe, y que al salir de ahí hacia otro sitio no se avise ni de qué dominio
 * se viene.
 *
 * Se comprueba con: curl -I http://localhost:3010  y  curl -I http://localhost:3010/interno/ingresar
 */
const cabeceras = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  // Direcciones que existían en valtus.com.ar antes de que esta web ocupara el
  // dominio (noviembre de 2026). Se mantienen vivas para que un enlace viejo, o
  // uno cargado en otra plataforma, no termine en "página no encontrada".
  async redirects() {
    return [{ source: '/contacto', destination: '/#contacto', permanent: false }];
  },

  async headers() {
    return [
      { source: '/:path*', headers: cabeceras },
      {
        source: '/interno/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
};

export default nextConfig;
