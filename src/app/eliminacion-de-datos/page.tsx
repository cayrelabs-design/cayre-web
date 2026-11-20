import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/PaginaLegal';
import { eliminacion } from '@/content/legal';

export const metadata: Metadata = {
  title: eliminacion.titulo,
  description: eliminacion.bajada,
  alternates: { canonical: '/eliminacion-de-datos' },
};

export default function EliminacionDeDatos() {
  return <PaginaLegal {...eliminacion} />;
}
