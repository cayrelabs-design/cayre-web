import 'server-only';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { crearCliente } from '@/interno/lib/supabase/servidor';

export type Socio = { id: string; nombre: string; email: string };

/**
 * La pregunta que hace toda página y toda acción antes de hacer nada:
 * "¿quién sos, y podés estar acá?".
 *
 * Revisa las mismas tres condiciones que la base, en el mismo orden:
 *   1. hay sesión                     -> si no, a /ingresar
 *   2. pasó el segundo factor         -> si no, a /verificar
 *   3. figura como socio activo       -> si no, a /sin-acceso
 *
 * Devuelve al socio y la conexión a la base ya abierta en su nombre.
 *
 * (Las direcciones son /interno/ingresar, /interno/verificar y
 * /interno/sin-acceso: todo el back office cuelga de /interno.)
 *
 * Que la aplicación y la base revisen lo mismo no es redundancia: la
 * aplicación lo hace para mandar a cada uno a la pantalla correcta; la base lo
 * hace para que, si esta función tuviera un error, igual no salga un dato.
 *
 * `cache` hace que en una misma carga de página la revisión se haga una sola
 * vez, aunque la pidan el marco, la página y tres componentes.
 */
export const exigirSocio = cache(async () => {
  const supabase = await crearCliente();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/interno/ingresar');

  const { data: nivel } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (nivel?.currentLevel !== 'aal2') redirect('/interno/verificar');

  const { data: socio } = await supabase
    .from('socios')
    .select('id, nombre, email')
    .eq('id', user.id)
    .maybeSingle<Socio>();
  if (!socio) redirect('/interno/sin-acceso');

  return { supabase, socio };
});

/** Todos los socios activos, para elegir responsables y participantes. */
export const listarSocios = cache(async () => {
  const { supabase } = await exigirSocio();
  const { data } = await supabase
    .from('socios')
    .select('id, nombre, email')
    .eq('activo', true)
    .order('nombre')
    .returns<Socio[]>();
  return data ?? [];
});
