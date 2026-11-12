import Link from 'next/link';
import { integraciones } from '@/content/landing';
import { TRAZOS_DE_MARCA } from '@/content/marcas';
import { SERVICIOS, SISTEMAS, type Producto } from '@/content/productos';
import { logoPublicado } from '@/lib/logos';
import { aSlug } from '@/lib/slug';
import { Icono } from './Icono';
import { Marquesina } from './Marquesina';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Las herramientas: cuatro de las cinco líneas. La quinta, ValtusCorp, tiene
 * sección propia (Proyectos.tsx).
 *
 * El orden no es casual: primero la línea principal, con su lista completa de
 * funciones, y después las otras tres en tarjetas chicas.
 *
 * Las cinco se muestran iguales, sin cartel de estado ("funcionando hoy",
 * "primeros clientes", "en desarrollo"). Es decisión del dueño (12/11/2026):
 * el sitio se sale a comercializar cuando todo esté funcionando y probado, así
 * que el estado de avance no es información para el visitante.
 *
 * El dato sigue anotado en src/content/productos.ts (`estado`), para uso
 * interno. Antes de salir a vender conviene repasarlo: ese archivo dice qué
 * está construido de verdad.
 */

/** Ficha ancha, a dos columnas. La usa la línea que encabeza la sección. */
function FichaAncha({ p }: { p: Producto }) {
  return (
    <article
      data-revelar
      className="vidrio-marca grid gap-8 p-8 !rounded-[32px] lg:grid-cols-[1fr_1fr] lg:p-11"
    >
      <div>
        <span className="block size-8 rounded-xl" style={{ background: p.acento }} aria-hidden />

        <h3 className="mt-5 text-[clamp(1.7rem,3.4vw,2.35rem)] leading-tight font-bold">
          {p.nombre}
        </h3>
        <p className="mt-1 font-mono text-[10.5px] tracking-[0.14em] text-marca-2 uppercase">
          {p.rubro}
        </p>

        <p className="mt-5 text-[19px] leading-snug font-semibold text-white">{p.titular}</p>
        <p className="mt-3 text-[16px] text-texto-2">{p.bajada}</p>
        <p className="mt-5 text-[14.5px] text-texto-3">{p.quien}</p>

        <Link href={`/sistemas/${p.slug}`} className="boton boton-secundario mt-8 self-start">
          Conocer {p.nombre}
          <Icono nombre="flecha" className="size-4" />
        </Link>
      </div>

      <ul className="flex flex-col gap-2.5 border-white/10 pt-2 lg:border-l lg:pt-0 lg:pl-11">
        {p.funciones.map((f, i) => (
          <li
            key={f}
            className={`items-start gap-2.5 text-[14.5px] text-texto-2 ${
              i < 6 ? 'flex' : 'hidden sm:flex'
            }`}
          >
            <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
            <span>{f}</span>
          </li>
        ))}
        {p.funciones.length > 6 && (
          <li className="pt-1 text-[13.5px] text-texto-3 sm:hidden">
            y {p.funciones.length - 6} funciones más
          </li>
        )}
      </ul>
    </article>
  );
}

/**
 * Ficha chica: nombre, rubro, la idea en una frase y el enlace.
 *
 * Los sistemas llevan a su página propia (/sistemas/…), donde está el detalle.
 * Los servicios no tienen página: su enlace va directo al formulario.
 */
function Ficha({ p }: { p: Producto }) {
  const esSistema = p.linea === 'sistema';

  return (
    <article data-revelar className="vidrio vidrio-interactivo flex flex-col p-6">
      <span className="block size-6 rounded-lg" style={{ background: p.acento }} aria-hidden />

      <h3 className="mt-4 text-[22px] leading-tight font-bold">{p.nombre}</h3>
      <p className="mt-1 font-mono text-[9.5px] tracking-[0.14em] text-marca-2 uppercase">
        {p.rubro}
      </p>

      <p className="mt-3.5 text-[15.5px] leading-snug font-semibold text-white">{p.titular}</p>
      <p className="mt-2 text-[14px] text-texto-2">{p.resumen}</p>

      <Link
        href={esSistema ? `/sistemas/${p.slug}` : '#contacto'}
        className="mt-auto inline-flex items-center gap-2 self-start pt-5 font-mono text-[10.5px] tracking-[0.08em] text-marca-2 uppercase hover:text-marca-3"
      >
        {esSistema ? `Conocer ${p.nombre}` : 'Verlo funcionando'}
        <Icono nombre="flecha" className="size-3.5" />
      </Link>
    </article>
  );
}

export function Productos() {
  const [principal, ...otrosSistemas] = SISTEMAS;

  // ValtusCorp no va acá: tiene sección propia justo debajo (Proyectos.tsx).
  // En una tarjeta chica al lado del punto de venta, un proyecto que abarca
  // una empresa entera se leía como "también hacemos cosas a medida".
  const enTarjeta = [...otrosSistemas, ...SERVICIOS].filter((p) => p.slug !== 'corp');

  // Cada integracion se muestra con lo mejor que haya: el logo oficial si el
  // archivo esta en public/logos/integraciones/, si no su isotipo, si no el nombre.
  const marcas = integraciones.integraciones.map((nombre) => {
    const slug = aSlug(nombre);
    return {
      nombre,
      logo: logoPublicado('integraciones', slug),
      trazo: TRAZOS_DE_MARCA[slug] ?? null,
    };
  });

  return (
    <Seccion id="productos">
      <Encabezamiento
        etiqueta="03 — Las herramientas"
        titulo="Los sistemas los hicimos nosotros."
        texto="Los sistemas comparten usuarios, permisos, productos y clientes: el que arranca con uno y mañana necesita otro no migra nada, se le activa."
      />

      {/* Sólo la línea que está construida y funcionando lleva ficha grande con
          la lista entera: es la prueba de la página. Las otras tres van en una
          fila de tarjetas chicas — el detalle es conversación de reunión, no
          de landing. La quinta, ValtusCorp, es la sección que sigue. */}
      <FichaAncha p={principal} />

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {enTarjeta.map((p) => (
          <Ficha key={p.slug} p={p} />
        ))}
      </div>

      {/* La cinta cierra la seccion: el visitante acaba de ver que hacemos y lo
          que le queda por preguntar es si se lleva bien con lo que ya tiene. */}
      <div className="mt-16">
        <p className="rotulo !text-texto-3 text-center">{integraciones.integracionesTitulo}</p>
        <div className="mt-5">
          <Marquesina marcas={marcas} />
        </div>
      </div>
    </Seccion>
  );
}
