import type { MetadataRoute } from 'next';

const SITIO = 'https://valtus.com.ar';

// El mapa del sitio para los buscadores. Son tres páginas: cuando se sume una
// (la ficha de un sistema, por ejemplo) hay que agregarla acá.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITIO, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITIO}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITIO}/terminos`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
