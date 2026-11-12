import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PaginaSistema } from '@/components/PaginaSistema';
import { SISTEMAS } from '@/content/productos';

/**
 * Una página por sistema: /sistemas/valtus360, /sistemas/crm y /sistemas/pos.
 *
 * Las tres salen de la misma lista (src/content/productos.ts). Agregar un
 * sistema a esa lista crea su página sola.
 *
 * Solo los SISTEMAS tienen página. ValtusCorp tiene su sección en la portada
 * (/#proyectos) y ValtusMKT su tarjeta: son servicios, no algo que se contrata
 * y se usa.
 */

// Se arman al publicar, no en cada visita: son páginas fijas, y así cargan tan
// rápido como la portada.
export function generateStaticParams() {
  return SISTEMAS.map((p) => ({ slug: p.slug }));
}

// Cualquier otra dirección (/sistemas/lo-que-sea) da "página no encontrada" en
// vez de intentar armarse.
export const dynamicParams = false;

export async function generateMetadata(props: PageProps<'/sistemas/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const p = SISTEMAS.find((s) => s.slug === slug);
  if (!p) return {};

  const titulo = `${p.nombre} — ${p.rubro}`;
  return {
    title: titulo,
    description: p.bajada,
    alternates: { canonical: `/sistemas/${p.slug}` },
    openGraph: { title: `${titulo} · Valtus`, description: p.resumen },
  };
}

export default async function Sistema(props: PageProps<'/sistemas/[slug]'>) {
  const { slug } = await props.params;
  const p = SISTEMAS.find((s) => s.slug === slug);
  if (!p) notFound();

  return <PaginaSistema p={p} />;
}
