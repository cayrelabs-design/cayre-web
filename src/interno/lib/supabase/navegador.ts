import { createBrowserClient } from '@supabase/ssr';

/**
 * La conexión desde el navegador. Se usa en un solo lugar: la pantalla del
 * segundo factor, que necesita hablar con el servicio de sesiones para mostrar
 * el código QR y verificar el código de seis dígitos.
 *
 * Todo lo demás (leer y guardar datos) pasa por el servidor.
 */
export function crearClienteDeNavegador() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
