import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/PaginaLegal';
import { privacidad } from '@/content/legal';

export const metadata: Metadata = {
  title: privacidad.titulo,
  description: privacidad.bajada,
  alternates: { canonical: '/privacidad' },
};

export default function Privacidad() {
  return <PaginaLegal {...privacidad} />;
}
