import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * La conexión a la base desde el servidor, EN NOMBRE DEL SOCIO que está
 * sentado.
 *
 * Usa la clave pública más la sesión que viaja en las cookies del navegador.
 * Eso significa que cada pedido llega a la base firmado por una persona, y la
 * base decide qué puede ver esa persona (las reglas están en
 * supabase/migrations/0002_interno.sql).
 *
 * El back office NO usa la clave secreta, a propósito. Si mañana hay un error
 * en una pantalla, lo peor que puede pasar es que un socio vea lo que un socio
 * ya podía ver.
 *
 * Ojo: la clave secreta SÍ existe en esta aplicación, porque el formulario de
 * la web pública la necesita para guardar las consultas (src/lib/consultas-db.ts).
 * Nada de src/interno ni de src/app/interno puede importar ese archivo: lo
 * impide una regla en eslint.config.mjs, que corta el chequeo si alguien lo
 * intenta.
 */
export async function crearCliente() {
  const almacen = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => almacen.getAll(),
        setAll: (lista) => {
          try {
            for (const { name, value, options } of lista) almacen.set(name, value, options);
          } catch {
            // Desde una página (no desde una acción) las cookies son de solo
            // lectura. No es un error: la sesión la renueva proxy.ts.
          }
        },
      },
    },
  );
}
