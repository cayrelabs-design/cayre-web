# Cayre Labs — web pública y back office

Un solo proyecto: una carpeta, un repositorio, un proyecto de Vercel y una base
de Supabase.

- **La web pública** (`/`, `/privacidad`, `/terminos`): la vidriera. Oscura,
  estática, sin sesiones.
- **El back office** (`/interno`): la herramienta de los socios — consultas que
  llegan de la web, agenda de reuniones y proyectos con tareas. Clara, con
  inicio de sesión.

Antes de escribir código de Next: esta versión tiene cambios respecto de lo
habitual. Leer la guía que corresponda en `node_modules/next/dist/docs/`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Textos de la web | `src/content/landing.ts`, `productos.ts`, `legal.ts` |
| Secciones de la web | `src/components/` |
| Pantallas del back office | `src/app/interno/` |
| Piezas y lógica del back office | `src/interno/` |
| El portero del back office | `src/proxy.ts` (solo corre en `/interno`) |
| Base de datos: tablas y reglas | `supabase/migrations/` |
| Pruebas de acceso | `supabase/tests/` |
| Logos de otras empresas | originales en `originales/logos/`, se procesan con `scripts/preparar-logos.mjs` |
| Cómo publicar | `docs/PUESTA-EN-MARCHA.md` |

## Reglas de la web pública

1. **Regla de honestidad:** no se publica antigüedad, cantidad de clientes,
   testimonios, porcentajes ni estadísticas.
2. **De Cayre360 se lista solo lo que anda hoy** (ver el encabezado de
   `src/content/productos.ts`).
3. **Empresas con nombre y logo: solo las autorizadas** (lista en
   `src/content/landing.ts`). No se agrega ninguna sin permiso del dueño.
4. **No se muestran caras ni nombres del equipo.**
5. **Una sola oferta:** el diagnóstico de 30 minutos. No sumar botones que
   compitan.
6. **Una animación nunca esconde información:** todo se ve igual sin
   JavaScript y con "menos movimiento" activado.

## Reglas del back office

1. **El back office no usa la clave secreta de la base.** Todo pedido viaja con
   la sesión del socio. La clave secreta existe en la aplicación solo para el
   formulario de la web (`src/lib/consultas-db.ts`), y una regla de ESLint
   impide importarlo desde el back office.
2. **El permiso vive en la base.** Toda tabla nueva lleva RLS encendido y sus
   políticas preguntan `public.es_socio()` (sesión + segundo factor + socio
   activo). Las pantallas no son una barrera.
3. **Toda página y toda acción empieza con `exigirSocio()`**
   (`src/interno/lib/sesion.ts`).
4. **Regla nueva, prueba nueva.** Cada cambio de permisos suma su caso a
   `supabase/tests/` y se lo ve fallar antes de darlo por bueno.
5. **Lo que escribió el visitante no se modifica.** El historial de una
   consulta solo se agrega.
6. **Nada se borra salvo las tareas.** Las consultas se descartan; los
   proyectos y las reuniones se cancelan.
7. **Los socios se dan de alta a mano por SQL**, nunca desde la aplicación.
8. **Fechas siempre por `src/interno/lib/formato.ts`** (hora de Argentina).

## Reglas para los dos

- Comentarios y textos en castellano, explicando el porqué en lenguaje llano.
- **Ninguna clave en ningún archivo del repositorio.** Viven en `.env.local`
  (que no se sube) y en Vercel.
- La web y el back office comparten la hoja de estilos (`globals.css`). Los
  colores del back office valen adentro de la clase `interno`; sus clases
  propias llevan "i" adelante cuando chocan con las de la web (`ibtn`,
  `irotulo`).
