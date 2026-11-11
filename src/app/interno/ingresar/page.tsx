import type { Metadata } from 'next';
import { Isotipo } from '@/interno/components/Icono';
import { FormularioIngreso } from './FormularioIngreso';

export const metadata: Metadata = { title: 'Ingresar' };

export default function Ingresar() {
  return (
    <main id="contenido" className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-[26rem]">
        <div className="mb-7 flex items-center justify-center gap-3 text-marca">
          <Isotipo size={34} />
          <span className="text-xl font-bold tracking-tight text-texto">Cayre Labs</span>
        </div>

        <div className="tarjeta p-7 sm:p-8">
          <h1 className="text-2xl font-bold">Ingresar</h1>
          <p className="mt-1.5 mb-6 text-[15px] text-texto-2">
            Acceso interno, solo para socios.
          </p>
          <FormularioIngreso />
        </div>

        <p className="mt-5 text-center text-[13px] text-texto-3">
          No hay registro: las cuentas las da de alta un administrador.
        </p>
      </div>
    </main>
  );
}
