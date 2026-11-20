# El dominio valtus.com.ar

Qué tenía cargado el dominio antes de pasar a esta web, y cómo se hace el cambio.

## Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| El nombre `valtus.com.ar` | NIC Argentina (nic.ar). Ahí solo dice "responden los servidores de Vercel". **No hay que tocarlo.** |
| Los servidores que responden | `ns1.vercel-dns.com` y `ns2.vercel-dns.com` |
| Los registros (a dónde va la web, a dónde va el correo) | En la cuenta de Vercel que tenga agregado el dominio |
| El correo `@valtus.com.ar` | Google |

Como los registros viven en una cuenta de Vercel, **al quitar el dominio de esa
cuenta se borran todos**: la web y el correo dejan de responder hasta que se
vuelven a cargar en la cuenta nueva.

## Foto de los registros, tomada el 20/11/2026

Vista desde afuera, antes de cualquier cambio. Es lo que hay que volver a cargar
en la cuenta nueva para que el correo siga andando.

| Tipo | Nombre | Valor | Para qué |
|---|---|---|---|
| MX | `@` (el dominio pelado) | `smtp.google.com` — prioridad `1` | Que los mails lleguen a Google |
| TXT | `@` | `google-site-verification=QU5mZgEfTeGFfKYmAzJA4OPlgsBgjxZnL4EDmYU-pHc` | Le demuestra a Google que el dominio es de ustedes |
| TXT | `google._domainkey` | la clave larga de abajo | Firma los mails que salen, para que no caigan en spam |

Clave de `google._domainkey` (va todo en un solo renglón, sin espacios):

```text
v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnmLgewLOChbXwU01MF1QnCF9Utgyl7jiqrW3U47uXqNtNHCbmkOLlyhfk4msMj6IIwkMttW3RUfa70oWkL0ufLi4/ReQUtwb3RjG8BrYQSfKK/O/JX1YqfNpqXCsnbzAme1pt/1YOHFIL00dQtL3mCMH9kUkaGBIGjhCYaRHYMP7bQPddc/kXxkrq/WfFEukSSrdcl/PjdosXkt1/udE1p69uNQtF+EZ+vPxorrH2iajEp/UimGNkqFFXc9+kRqMAqkP2Wwn22siSPMEHXR4FmhW1az3ONoI/AmEUROC21l1JdrUb0/EW3vtWm/+RuxrZBjmphXjSnQrWvxVTkKP8QIDAQAB
```

**Lo que NO se ve desde afuera.** Esta foto solo muestra los nombres que se
probaron. Si en la cuenta anterior hay otros registros (subdominios, otras
verificaciones), no figuran acá: conviene que quien tiene esa cuenta copie la
lista completa de la pantalla "DNS Records" antes de quitar el dominio.

No había registro SPF ni DMARC. No son obligatorios para recibir, pero ayudan a
que los mails que ustedes mandan no caigan en spam. Cuando el correo esté
andando en la cuenta nueva conviene sumarlos (los valores los da Google).

## Qué había en el dominio

- `valtus.com.ar`: un sitio mínimo con Privacidad, Términos, Eliminación de
  datos y Contacto.
- `app.valtus.com.ar`: una plataforma con pantalla de ingreso.

Las dos se dan de baja (decisión de los socios, 20/11/2026) y el dominio pasa a
mostrar esta web. Las direcciones `/privacidad`, `/terminos`,
`/eliminacion-de-datos` y `/contacto` siguen existiendo acá, para que ningún
enlace viejo termine en "página no encontrada". **Su contenido cambia:** ahora
describen esta web, no aquella plataforma.

## El cambio, paso a paso

1. **En la cuenta anterior:** copiar la lista completa de "DNS Records" y las
   claves guardadas en los proyectos. Después de borrar no se recuperan.
2. **En la cuenta anterior:** quitar `valtus.com.ar` (Domains → el dominio →
   Remove). Con eso alcanza para liberarlo; borrar la cuenta entera es opcional.
3. **En la cuenta de esta web:** proyecto `cayre-web` → Settings → Domains →
   Add → `valtus.com.ar`. Repetir con `www.valtus.com.ar` y elegir que
   redirija al dominio pelado.
4. **En la cuenta de esta web:** Domains → `valtus.com.ar` → DNS Records →
   cargar los tres registros de la tabla de arriba.
5. **Comprobar:** que `https://valtus.com.ar` muestre esta web y que un mail de
   prueba a una casilla `@valtus.com.ar` llegue.
6. **En Supabase:** Authentication → URL Configuration → Site URL →
   `https://valtus.com.ar`.

Entre el paso 2 y el 4 el correo no recibe. Hechos seguidos son unos minutos, y
los mails que lleguen en ese rato no se pierden: quien los manda reintenta
durante horas.
