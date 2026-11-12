import type { MetadataRoute } from 'next';
import { SISTEMAS } from '@/content/productos';

const SITIO = 'https://valtus.com.ar';

// El mapa del sitio para los buscadores. Las páginas de los sistemas salen de
// la misma lista que las crea: si se suma un sistema, aparece acá solo.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITIO, changeFrequency: 'monthly', priority: 1 },
    ...SISTEMAS.map((p) => ({
      url: `${SITIO}/sistemas/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${SITIO}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITIO}/terminos`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
