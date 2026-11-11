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
 * Las cinco líneas.
 *
 * El orden no es casual: primero el único sistema construido y funcionando
 * —que es toda la prueba que tiene la página— y después el resto. Lo que
 * todavía no se puede contratar lo dice, y por eso no lleva botón: publicar
 * "contratar" sobre algo que no existe trae el reclamo el primer día, y el que
 * atiende el teléfono sos vos.
 */

function Insignia({ estado }: { estado: Producto['estado'] }) {
  if (estado === 'disponible') {
    return (
      <span className="flex items-center gap-2 rounded-full bg-ok/15 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.12em] text-ok uppercase">
        <span className="latir size-1.5 rounded-full bg-ok" aria-hidden />
        Funcionando hoy
      </span>
    );
  }
  if (estado === 'piloto') {
    return (
      <span className="flex items-center gap-2 rounded-full bg-alerta/15 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.12em] text-alerta uppercase">
        <span className="latir size-1.5 rounded-full bg-alerta" aria-hidden />
        Primeros clientes
      </span>
    );
  }
  return (
    <span className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.12em] text-texto-3 uppercase">
      En desarrollo
    </span>
  );
}

/** Ficha ancha, a dos columnas. La usa la línea que encabeza la sección. */
function FichaAncha({ p }: { p: Producto }) {
  return (
    <article
      data-revelar
      className="vidrio-marca grid gap-8 p-8 !rounded-[32px] lg:grid-cols-[1fr_1fr] lg:p-11"
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="size-8 flex-none rounded-xl" style={{ background: p.acento }} aria-hidden />
          <Insignia estado={p.estado} />
        </div>

        <h3 className="mt-5 text-[clamp(1.7rem,3.4vw,2.35rem)] leading-tight font-bold">
          {p.nombre}
        </h3>
        <p className="mt-1 font-mono text-[10.5px] tracking-[0.14em] text-marca-2 uppercase">
          {p.rubro}
        </p>

        <p className="mt-5 text-[19px] leading-snug font-semibold text-white">{p.titular}</p>
        <p className="mt-3 text-[16px] text-texto-2">{p.bajada}</p>
        <p className="mt-5 text-[14.5px] text-texto-3">{p.quien}</p>

        <Link
          href="#contacto"
          className="mt-8 inline-flex items-center gap-2 self-start font-mono text-[11px] tracking-[0.1em] text-marca-2 uppercase hover:text-marca-3"
        >
          Quiero verlo funcionando
          <Icono nombre="flecha" className="size-3.5" />
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

/** Ficha de media columna. Muestra las seis primeras funciones y corta. */
function Ficha({ p }: { p: Producto }) {
  return (
    <article data-revelar className="vidrio vidrio-interactivo flex flex-col p-6">
      {/* min-h fija: si una insignia es más larga que las otras, la fila de
          tarjetas se desalinea y los nombres quedan a distinta altura. */}
      <div className="flex min-h-14 flex-wrap items-center gap-2.5">
        <span className="size-6 flex-none rounded-lg" style={{ background: p.acento }} aria-hidden />
        <Insignia estado={p.estado} />
      </div>

      <h3 className="mt-4 text-[22px] leading-tight font-bold">{p.nombre}</h3>
      <p className="mt-1 font-mono text-[9.5px] tracking-[0.14em] text-marca-2 uppercase">
        {p.rubro}
      </p>

      <p className="mt-3.5 text-[15.5px] leading-snug font-semibold text-white">{p.titular}</p>
      <p className="mt-2 text-[14px] text-texto-2">{p.resumen}</p>

      {/* Lo que todavía no se contrata no lleva invitación a contratarlo. */}
      {p.estado !== 'proximamente' && (
        <Link
          href="#contacto"
          className="mt-auto inline-flex items-center gap-2 self-start pt-5 font-mono text-[10.5px] tracking-[0.08em] text-marca-2 uppercase hover:text-marca-3"
        >
          Verlo funcionando
          <Icono nombre="flecha" className="size-3.5" />
        </Link>
      )}
    </article>
  );
}

export function Productos() {
  const [principal, ...otrosSistemas] = SISTEMAS;

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
        etiqueta="03 — Las cinco líneas"
        titulo="Tres sistemas y dos cosas que hacemos nosotros."
        texto="Los sistemas comparten usuarios, permisos, productos y clientes: el que arranca con uno y mañana necesita otro no migra nada, se le activa."
      />

      {/* Sólo la línea que está construida y funcionando lleva ficha grande con
          la lista entera: es la prueba de la página. Las otras cuatro van en
          una fila de tarjetas chicas — el detalle es conversación de reunión,
          no de landing. */}
      <FichaAncha p={principal} />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...otrosSistemas, ...SERVICIOS].map((p) => (
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
