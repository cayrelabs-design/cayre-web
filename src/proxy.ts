import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * El portero del back office. Corre antes de cada página de /interno, y SOLO
 * de /interno (ver `matcher`, al final): la web pública no pasa por acá, así
 * que sigue siendo estática y rápida, y no consulta sesiones de nadie.
 *
 * Hace dos cosas:
 *  1. Renueva la sesión si está por vencer, para que nadie quede afuera en la
 *     mitad del trabajo.
 *  2. Manda a /interno/ingresar a quien no inició sesión.
 *
 * Importante: el portero es una comodidad, NO es la seguridad. Solo evita
 * mostrarle pantallas vacías a quien no entró. La seguridad de verdad está en
 * dos lugares más adentro: `exigirSocio()` (src/interno/lib/sesion.ts), que revisa el
 * segundo factor y la lista de socios en cada página y en cada acción, y las
 * reglas de la base, que valen aunque todo lo demás falle.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clavePublica = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Si faltan las variables (un despliegue nuevo donde todavía no se cargaron),
  // el back office se cierra con un cartel claro en vez de romperse con un
  // error ilegible. Cerrado es la respuesta segura: sin poder verificar quién
  // entra, no entra nadie. La web pública no pasa por acá y sigue andando.
  if (!url || !clavePublica) {
    return new NextResponse(
      'El back office todavía no está configurado: faltan las variables de Supabase en este despliegue.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  let respuesta = NextResponse.next({ request });

  const supabase = createServerClient(
    url,
    clavePublica,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (lista) => {
          for (const { name, value } of lista) request.cookies.set(name, value);
          respuesta = NextResponse.next({ request });
          for (const { name, value, options } of lista) {
            respuesta.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // getUser() le pregunta al servicio de sesiones si la sesión sigue siendo
  // válida. No alcanza con leer la cookie: una cookie se puede fabricar.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ruta = request.nextUrl.pathname;
  const esIngreso = ruta.startsWith('/interno/ingresar');

  if (!user && !esIngreso) {
    const destino = request.nextUrl.clone();
    destino.pathname = '/interno/ingresar';
    destino.search = '';
    return NextResponse.redirect(destino);
  }

  if (user && esIngreso) {
    const destino = request.nextUrl.clone();
    destino.pathname = '/interno';
    destino.search = '';
    return NextResponse.redirect(destino);
  }

  return respuesta;
}

export const config = {
  // Solo el back office. Ninguna página pública pasa por el portero.
  matcher: ['/interno', '/interno/:path*'],
};
