# Valtus — web pública y back office

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

0. **Qué tiene que quedar del sitio** (decisión del dueño, 12/11/2026): Valtus
   es un equipo de gerentes de operación que hace sus propios sistemas y puede
   hacerse cargo de una operación grande. No es un proveedor de software para
   comercios ni una agencia de marketing. La portada dice quiénes son; los
   sistemas son las herramientas; **ValtusCorp** (proyectos integrales) tiene
   sección propia y no vuelve a ser una tarjeta chica.
1. **Regla de honestidad:** no se publica antigüedad, cantidad de clientes,
   testimonios, porcentajes ni estadísticas. El dueño la ratificó el
   12/11/2026: el tamaño se cuenta con el alcance de los proyectos, sin cifras.
2. **De Valtus360 se lista solo lo que anda hoy** (ver el encabezado de
   `src/content/productos.ts`).
3. **Empresas con nombre y logo: solo las autorizadas** (lista en
   `src/content/landing.ts`). No se agrega ninguna sin permiso del dueño, y
   ninguna aparece como cliente antes de firmar.
4. **No se muestran caras ni nombres del equipo.**
5. **Una sola oferta:** el diagnóstico de 30 minutos. No sumar botones que
   compitan. El botón de ValtusCorp ("Contanos tu operación") lleva al mismo
   formulario: es la misma puerta con otro cartel.
9. **Cada sistema tiene su página** (`/sistemas/valtus360`, `/sistemas/crm`,
   `/sistemas/pos`; decisión del dueño, 12/11/2026). No tienen textos propios:
   salen de `src/content/productos.ts`, igual que las tarjetas de la portada,
   para que no puedan decir cosas distintas. Los servicios (ValtusCorp y
   ValtusMKT) no tienen página.
10. **Las tres páginas legales llevan primero el texto de la plataforma, sin
    tocar** (`/privacidad`, `/terminos`, `/eliminacion-de-datos`). Son las
    direcciones que Meta tiene cargadas para la aplicación de
    `app.valtus.com.ar` y las vuelve a visitar. Ese texto no se edita acá: sale
    de `originales/legales/` con `node scripts/preparar-legales.mjs`. Lo propio
    de esta web va debajo, en `src/content/legal.ts`. No cambiarles la
    dirección ni sacar el texto de la plataforma sin hablarlo con quien maneja
    esa aplicación.
7. **Los hallazgos de la sección de diagnóstico son ejemplos genéricos.** Lo
   que se encuentra adentro de un cliente es del cliente: no se publica, ni
   siquiera sin nombre, sin su autorización expresa.
8. **ValtusCorp no dice cómo se cobra ni promete resultados.** Cada proyecto
   integral tiene condiciones propias, escritas en su propuesta. El "abono
   fijo" de los compromisos vale para los sistemas, y así está aclarado.
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
