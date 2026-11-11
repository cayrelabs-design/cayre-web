import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/PaginaLegal';
import { terminos } from '@/content/legal';

export const metadata: Metadata = {
  title: terminos.titulo,
  description: terminos.bajada,
  alternates: { canonical: '/terminos' },
};

export default function Terminos() {
  return <PaginaLegal {...terminos} />;
}
