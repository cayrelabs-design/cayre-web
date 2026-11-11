import type { Metadata } from 'next';
import { Icono } from '@/interno/components/Icono';
import { salir } from '../ingresar/acciones';

export const metadata: Metadata = { title: 'Sin acceso' };

/**
 * A dónde llega alguien que inició sesión y pasó el segundo factor, pero no
 * figura en la lista de socios. No debería pasar nunca —el alta pública está
 * apagada—, pero si pasa, la base no le muestra nada y esta pantalla se lo dice.
 */
export default function SinAcceso() {
  return (
    <main id="contenido" className="flex min-h-screen items-center justify-center px-5">
      <div className="tarjeta w-full max-w-[26rem] p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-error-suave text-error">
          <Icono nombre="candado" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">Esta cuenta no tiene acceso</h1>
        <p className="mt-2 text-[15px] text-texto-2">
          El back office es solo para socios. Si deberías poder entrar, pedile a un administrador
          que te dé de alta.
        </p>
        <form action={salir} className="mt-6">
          <button type="submit" className="ibtn ibtn-secundario">
            Salir
          </button>
        </form>
      </div>
    </main>
  );
}
