import type { MetadataRoute } from 'next';

// Le dice a los buscadores que pueden recorrer todo el sitio y dónde está el
// mapa. No hay nada que esconder acá: el sitio entero es público.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://cayrelabs.com.ar/sitemap.xml',
  };
}
