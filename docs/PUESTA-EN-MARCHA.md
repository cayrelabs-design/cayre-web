# Puesta en marcha

Qué hay que hacer para pasar de "anda en mi computadora" a "está publicado".
Está en orden: cada paso depende del anterior.

> **Todo es un solo proyecto.** La web pública y el back office viven en esta
> misma carpeta, se despliegan juntos en un solo proyecto de Vercel y usan la
> misma base de Supabase. El back office está en `/interno`.

---

## 1. Correr las pruebas en la computadora

Con Docker Desktop abierto:

```bash
npx supabase start
```

```bash
npx supabase test db
```

Tienen que dar **32 de 32**. Si alguna falla, no se sigue: esas pruebas son las
que demuestran que nadie de afuera puede leer las consultas.

## 2. Aplicar la migración a la base real

Primero hay que iniciar sesión en Supabase desde la terminal (abre el navegador):

```bash
npx supabase login
```

Después se conecta el proyecto y se mira qué se aplicaría, sin aplicar nada:

```bash
npx supabase link --project-ref pslrgglflfsvdygrzzlo
```

```bash
npx supabase db push --dry-run
```

Tiene que listar **solo** `0002_interno.sql` (la `0001` ya está aplicada). Si es
así:

```bash
npx supabase db push
```

Es aditiva: crea tablas y reglas nuevas, no borra nada de lo que hay.

## 3. Apagar el registro público — en el panel de Supabase

*Authentication → Sign In / Providers → Email:* desactivar **"Allow new users to
sign up"**.

Con esto nadie puede crearse una cuenta. Y aunque alguien lo volviera a prender
por error, una cuenta que no figura en la tabla `socios` no ve nada: las dos
barreras son independientes.

En la misma sección, *Multi-Factor:* confirmar que **TOTP** esté habilitado.

## 4. Dar de alta a cada socio

Son dos pasos por persona, y los dos son a mano. Es a propósito: la lista de
quién entra no se puede modificar desde la aplicación a la que da acceso.

**a) Crear la cuenta.** En el panel: *Authentication → Users → Add user*, con el
mail del socio y una contraseña provisoria larga. Marcar "Auto Confirm User".

**b) Sumarlo a la lista de socios.** En *SQL Editor*, cambiando el nombre y el
mail:

```sql
insert into public.socios (id, nombre, email)
select id, 'Nombre Apellido', email
  from auth.users
 where email = 'mail-del-socio';
```

La contraseña provisoria se le pasa al socio por un canal que no sea el mail
(en persona o por teléfono). La primera vez que entra, el sistema le hace
configurar el segundo factor con la app del celular.

**Para dar de baja a un socio:**

```sql
update public.socios set activo = false where email = 'mail-del-socio';
```

Deja de ver todo en el acto, aunque tenga la sesión abierta.

## 5. Desplegar en Vercel

Un solo proyecto de Vercel, apuntando a este repositorio. Cuatro variables de
entorno (las mismas de `.env.example`):

| Variable | Valor | Quién la usa |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | La URL del proyecto de Supabase | Web y back office |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | La clave **pública** | Back office |
| `SUPABASE_SECRET_KEY` | La clave **secreta** | Solo el formulario de la web |
| `CONSULTAS_SAL` | Un texto largo y aleatorio | Solo el formulario de la web |

La clave secreta se carga directo en Vercel. No se pega en ningún chat, mail ni
archivo del repositorio.

## 6. El dominio

En Vercel, *Settings → Domains*: agregar `cayrelabs.com.ar`.
En WNPower, crear los registros **A / CNAME** que indique Vercel.

**No tocar los registros MX**: son los del correo.

En Supabase, *Authentication → URL Configuration*: poner
`https://cayrelabs.com.ar` como *Site URL*.

El back office queda en `https://cayrelabs.com.ar/interno`.

---

## Para probar el back office en la computadora

Sin tocar la base real:

```bash
npx supabase start
```

```bash
node scripts/preparar-local.mjs
```

```bash
npm run dev -- -p 3010
```

Y abrir `http://localhost:3010/interno`. El usuario de prueba es
`socio@cayre.test` y la contraseña queda en `.env.local`.

## Lo que queda afuera de esta versión

- **Aviso por mail cuando entra una consulta.** Hoy se ve en el tablero y en el
  globito del menú. Para el mail hace falta una cuenta de envío (Resend o
  similar).
- **Recuperar la contraseña desde la pantalla de ingreso.** Por ahora la
  restablece un administrador desde el panel de Supabase.
- **Perder el celular.** Si un socio pierde el segundo factor, un administrador
  le borra el factor desde *Authentication → Users → (el usuario)* y la próxima
  vez que entra lo configura de nuevo.
