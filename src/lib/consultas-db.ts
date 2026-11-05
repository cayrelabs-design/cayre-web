import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Solo el servidor habla con la base, y lo hace con la clave secreta.
// La clave pública no puede leer ni escribir la tabla de consultas: la tabla
// tiene RLS activo y ninguna política para los roles anónimo ni autenticado.
// Si alguien encuentra la clave pública en el navegador, no le sirve de nada.

export type NuevaConsulta = {
  nombre: string;
  empresa: string | null;
  telefono: string | null;
  email: string | null;
  mensaje: string;
  ipHash: string | null;
};

function cliente() {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_SECRET_KEY;
  if (!url || !clave) return null;
  return createClient(url, clave, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function baseConfigurada() {
  return cliente() !== null;
}

export async function guardarConsulta(c: NuevaConsulta) {
  const sb = cliente();
  if (!sb) throw new Error('Supabase no está configurado');
  const { error } = await sb.from('consultas').insert({
    nombre: c.nombre,
    empresa: c.empresa,
    telefono: c.telefono,
    email: c.email,
    mensaje: c.mensaje,
    ip_hash: c.ipHash,
  });
  if (error) throw new Error(`No se pudo guardar la consulta: ${error.message}`);
}

/** Cuántas consultas llegaron desde la misma conexión en los últimos minutos. */
export async function consultasRecientes(ipHash: string, minutos = 10) {
  const sb = cliente();
  if (!sb) return 0;
  const desde = new Date(Date.now() - minutos * 60_000).toISOString();
  const { count, error } = await sb
    .from('consultas')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', desde);
  if (error) return 0;
  return count ?? 0;
}
