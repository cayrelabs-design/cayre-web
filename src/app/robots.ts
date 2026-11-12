import type { MetadataRoute } from 'next';

// Le dice a los buscadores que pueden recorrer la web pública y dónde está el
// mapa, y que no entren al back office. (Que no entren no es lo que lo protege:
// eso lo hacen el inicio de sesión y las reglas de la base. Esto solo evita que
// la pantalla de ingreso aparezca en Google.)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/interno' },
    sitemap: 'https://valtus.com.ar/sitemap.xml',
  };
}
