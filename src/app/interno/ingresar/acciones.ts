'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { crearCliente } from '@/interno/lib/supabase/servidor';

const esquema = z.object({
  email: z.email().max(160),
  clave: z.string().min(1).max(200),
});

export type EstadoIngreso = { error?: string; email?: string };

export async function ingresar(_previo: EstadoIngreso, datos: FormData): Promise<EstadoIngreso> {
  const email = String(datos.get('email') ?? '').trim();
  const resultado = esquema.safeParse({ email, clave: String(datos.get('clave') ?? '') });

  // El mensaje es el mismo si el mail no existe, si la contraseña está mal o
  // si el formato es inválido. Es a propósito: un mensaje distinto para cada
  // caso le diría a un extraño qué mails tienen cuenta.
  const rechazo: EstadoIngreso = { error: 'El mail o la contraseña no son correctos.', email };
  if (!resultado.success) return rechazo;

  const supabase = await crearCliente();
  const { error } = await supabase.auth.signInWithPassword({
    email: resultado.data.email,
    password: resultado.data.clave,
  });
  if (error) {
    // Supabase frena solo los intentos repetidos. Cuando lo hace, conviene
    // decirlo: si no, el socio sigue probando y se bloquea más tiempo.
    if (error.status === 429) {
      return { error: 'Demasiados intentos seguidos. Esperá unos minutos y probá de nuevo.', email };
    }
    return rechazo;
  }

  // Con la contraseña sola todavía no se ve nada: falta el segundo factor.
  redirect('/interno/verificar');
}

export async function salir() {
  const supabase = await crearCliente();
  await supabase.auth.signOut();
  redirect('/interno/ingresar');
}
