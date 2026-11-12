import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Logotipo } from '@/interno/components/Icono';
import { crearCliente } from '@/interno/lib/supabase/servidor';
import { salir } from '../ingresar/acciones';
import { Verificador } from './Verificador';

export const metadata: Metadata = { title: 'Segundo factor' };

export default async function Verificar() {
  const supabase = await crearCliente();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/interno/ingresar');

  // Si ya pasó el segundo factor, no tiene nada que hacer acá.
  const { data: nivel } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (nivel?.currentLevel === 'aal2') redirect('/interno');

  return (
    <main id="contenido" className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-[26rem]">
        <div className="mb-7 flex justify-center">
          <Logotipo size={30} fondo="claro" />
        </div>

        <div className="tarjeta p-7 sm:p-8">
          <h1 className="text-2xl font-bold">Segundo factor</h1>
          <p className="mt-1.5 mb-6 text-[15px] text-texto-2">
            Además de la contraseña pedimos un código del celular. Si alguien consigue tu
            contraseña, sin tu celular no entra.
          </p>
          <Verificador />
        </div>

        <form action={salir} className="mt-5 text-center">
          <button type="submit" className="text-[13px] text-texto-3 underline underline-offset-2 hover:text-marca">
            Salir y entrar con otra cuenta ({user.email})
          </button>
        </form>
      </div>
    </main>
  );
}
