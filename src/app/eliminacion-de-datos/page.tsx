import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/PaginaLegal';
import { delSitio } from '@/content/legal';
import { legalPlataforma } from '@/content/legal-plataforma';

// La página tiene dos partes: el texto de la plataforma (el que tienen cargado
// las plataformas de terceros para la aplicación) y, debajo, lo propio de este
// sitio. Ver src/components/PaginaLegal.tsx.
const plataforma = legalPlataforma.eliminacion;

export const metadata: Metadata = {
  title: plataforma.titulo,
  description: delSitio.eliminacion.bajada,
  alternates: { canonical: '/eliminacion-de-datos' },
};

export default function EliminacionDeDatos() {
  return <PaginaLegal plataforma={plataforma} sitio={delSitio.eliminacion} />;
}
