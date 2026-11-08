import Link from 'next/link';
import { SERVICIOS, SISTEMAS, type Producto } from '@/content/productos';
import { Icono } from './Icono';
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
        En operación · primeros clientes
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

        <Link href="#contacto" className="boton boton-primario degradado mt-8">
          Quiero verlo funcionando
          <Icono nombre="flecha" className="size-4" />
        </Link>
      </div>

      <ul className="flex flex-col gap-2.5 border-white/10 pt-2 lg:border-l lg:pt-0 lg:pl-11">
        {p.funciones.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-texto-2">
            <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Ficha de media columna. Muestra las seis primeras funciones y corta. */
function Ficha({ p }: { p: Producto }) {
  return (
    <article data-revelar className="vidrio vidrio-interactivo flex flex-col p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="size-7 flex-none rounded-lg" style={{ background: p.acento }} aria-hidden />
        <Insignia estado={p.estado} />
      </div>

      <h3 className="mt-5 text-[26px] leading-tight font-bold">{p.nombre}</h3>
      <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-marca-2 uppercase">
        {p.rubro}
      </p>

      <p className="mt-4 text-[17px] leading-snug font-semibold text-white">{p.titular}</p>
      <p className="mt-2.5 text-[15px] text-texto-2">{p.bajada}</p>

      <ul className="mt-5 flex flex-col gap-2 border-t border-white/8 pt-5">
        {p.funciones.slice(0, 6).map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-texto-2">
            <Icono nombre="check" className="mt-1 size-3 flex-none text-cian" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[13.5px] text-texto-3">{p.quien}</p>

      {/* Lo que todavía no se contrata no lleva botón de contratar. */}
      {p.estado !== 'proximamente' && (
        <Link
          href="#contacto"
          className="mt-5 inline-flex items-center gap-2 self-start font-mono text-[11px] text-marca-2 hover:text-marca-3"
        >
          Quiero verlo funcionando
          <Icono nombre="flecha" className="size-3.5" />
        </Link>
      )}
    </article>
  );
}

export function Productos() {
  const [principal, ...otrosSistemas] = SISTEMAS;

  return (
    <Seccion id="productos" tenue>
      <Encabezamiento
        etiqueta="04 — Las cinco líneas"
        titulo="Tres sistemas y dos cosas que hacemos nosotros."
        texto="Los sistemas comparten usuarios, permisos, productos y clientes: el que arranca con uno y mañana necesita otro no migra nada, se le activa."
      />

      <FichaAncha p={principal} />

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {otrosSistemas.map((p) => (
          <Ficha key={p.slug} p={p} />
        ))}
      </div>

      <p className="rotulo !text-texto-3 mt-14 text-center">Y lo que hacemos nosotros</p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {SERVICIOS.map((p) => (
          <Ficha key={p.slug} p={p} />
        ))}
      </div>
    </Seccion>
  );
}
