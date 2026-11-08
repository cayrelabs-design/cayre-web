import Link from 'next/link';
import { PRODUCTOS } from '@/content/productos';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Los seis sistemas. El que está construido se muestra distinto y primero: es
 * la única prueba real que tiene el sitio de que esto existe y anda. Los demás
 * se publican con su marca de "próximamente" y sin precio ni botón de contratar.
 */
export function Productos() {
  // Los que ya existen —el que se contrata y el que está en operación— van
  // destacados y arriba. El resto queda abajo, chico y sin botón.
  const destacados = PRODUCTOS.filter((p) => p.estado !== 'proximamente');
  const proximos = PRODUCTOS.filter((p) => p.estado === 'proximamente');

  return (
    <Seccion id="productos" tenue>
      <Encabezamiento
        etiqueta="04 — Los sistemas"
        titulo="Uno por cada parte del negocio."
        texto="Comparten usuarios, permisos, productos y clientes. El que arranca con uno y mañana necesita otro no migra nada: se le activa."
      />

      {destacados.map((p) => (
        <article data-revelar
          key={p.slug}
          className="vidrio-marca mb-4 grid gap-8 p-8 !rounded-[32px] lg:grid-cols-[1fr_1fr] lg:p-11"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="size-8 flex-none rounded-xl"
                style={{ background: p.acento }}
                aria-hidden
              />
              {p.estado === 'disponible' ? (
                <span className="flex items-center gap-2 rounded-full bg-ok/15 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.12em] text-ok uppercase">
                  <span className="size-1.5 rounded-full bg-ok" aria-hidden />
                  Disponible
                </span>
              ) : (
                <span className="flex items-center gap-2 rounded-full bg-alerta/15 px-3 py-1.5 font-mono text-[9.5px] tracking-[0.12em] text-alerta uppercase">
                  <span className="size-1.5 rounded-full bg-alerta" aria-hidden />
                  En operación · abriendo a los primeros clientes
                </span>
              )}
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
      ))}

      <div className="mt-12">
        <p className="rotulo !text-texto-3 text-center">En desarrollo</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proximos.map((p) => (
            <article data-revelar key={p.slug} className="vidrio vidrio-interactivo flex flex-col gap-3 p-7">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="size-7 flex-none rounded-lg opacity-70"
                  style={{ background: p.acento }}
                  aria-hidden
                />
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-texto-3 uppercase">
                  Próximamente
                </span>
              </div>
              <h3 className="text-[19px] font-bold">{p.nombre}</h3>
              <p className="text-[14px] text-texto-2">{p.resumen}</p>
            </article>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
