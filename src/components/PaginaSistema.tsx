import Link from 'next/link';
import { Contacto } from '@/components/Contacto';
import { Encabezado } from '@/components/Encabezado';
import { Etapas } from '@/components/Etapas';
import { Icono } from '@/components/Icono';
import { Pie } from '@/components/Pie';
import { Revelador } from '@/components/Revelador';
import { Encabezamiento, Seccion } from '@/components/Seccion';
import { SISTEMAS, type Producto } from '@/content/productos';

/**
 * La página propia de un sistema (Valtus360, ValtusCRM, ValtusPOS).
 *
 * En la portada cada sistema tiene una tarjeta: alcanza para saber que existe,
 * no para decidir. Acá está entero — qué hace, cómo se usa, qué incluye y las
 * preguntas que hace todo el mundo — y es la página que se le manda a alguien
 * que preguntó por ese sistema en particular.
 *
 * No hay un texto escrito para esta página: todo sale de
 * src/content/productos.ts. Si se corrige una función ahí, cambia acá y en la
 * portada a la vez, y no pueden decir cosas distintas.
 *
 * Mismas reglas que la portada: una sola oferta (todos los botones llevan al
 * formulario), sin cifras, sin capturas de pantalla inventadas.
 */
export function PaginaSistema({ p }: { p: Producto }) {
  const otros = SISTEMAS.filter((s) => s.slug !== p.slug);

  return (
    <>
      <Encabezado contactoEnLaPagina />
      <Revelador />
      <main id="contenido">
        {/* ── Presentación ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* El resplandor lleva el color del sistema: es lo único que cambia
              de una página a otra, y alcanza para que no parezcan la misma. */}
          <div
            className="aura derivar -top-32 -left-28 size-[36rem] opacity-25"
            style={{ background: p.acento }}
          />
          <div className="aura top-24 right-0 size-80 bg-marca/14" />

          <div className="contenedor relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <nav
                aria-label="Dónde estás"
                className="font-mono text-[11px] tracking-[0.1em] text-texto-3 uppercase"
              >
                <Link href="/#productos" className="hover:text-marca-2">
                  Sistemas
                </Link>
                <span className="mx-2" aria-hidden>
                  /
                </span>
                <span className="text-texto-2">{p.nombre}</span>
              </nav>

              <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span
                  className="block size-7 flex-none rounded-lg"
                  style={{ background: p.acento }}
                  aria-hidden
                />
                <span className="font-display text-[22px] font-bold text-white">{p.nombre}</span>
                <span className="rotulo">{p.rubro}</span>
              </p>

              {/* Sin animación de entrada, igual que el titular de la portada:
                  es el elemento que Google mide para la velocidad de carga. */}
              <h1 className="mt-5 text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.06] font-bold">
                {p.titular}
              </h1>

              <p
                className="entrada mt-5 max-w-[52ch] text-[clamp(1.05rem,1.8vw,1.2rem)] leading-relaxed text-texto-2"
                style={{ animationDelay: '80ms' }}
              >
                {p.bajada}
              </p>
              <p className="entrada mt-4 text-[15px] text-texto-3" style={{ animationDelay: '120ms' }}>
                {p.quien}
              </p>

              <div className="entrada mt-8 flex flex-wrap gap-3" style={{ animationDelay: '160ms' }}>
                <a href="#contacto" className="boton boton-primario degradado">
                  Quiero verlo funcionando
                  <Icono nombre="flecha" className="size-4" />
                </a>
                <a href="#funciones" className="boton boton-secundario">
                  Ver qué hace
                </a>
              </div>
            </div>

            <div
              className="vidrio-marca entrada p-7 !rounded-[28px] lg:p-9"
              style={{ animationDelay: '200ms' }}
            >
              <p className="rotulo !text-texto-3">Qué incluye</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {p.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15.5px] text-white">
                    <span className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-ok/20 text-ok">
                      <Icono nombre="check" className="size-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Cómo se usa ──────────────────────────────────────────────── */}
        {p.recorrido && (
          <Seccion>
            <Encabezamiento
              etiqueta="Cómo se usa"
              titulo="El recorrido, en cuatro pasos."
            />
            <Etapas pasos={p.recorrido} rotulo="Paso" />
          </Seccion>
        )}

        {/* ── Funciones ────────────────────────────────────────────────── */}
        <Seccion id="funciones">
          <Encabezamiento etiqueta="Funciones" titulo={`Lo que hace ${p.nombre}.`} />

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {p.funciones.map((f, i) => (
              <li
                key={f}
                data-revelar
                className="vidrio vidrio-interactivo flex items-start gap-4 px-6 py-5"
              >
                <span className="mt-0.5 flex-none font-mono text-[11px] tracking-[0.12em] text-cian">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15.5px] leading-snug font-medium text-white">{f}</span>
              </li>
            ))}
          </ul>
        </Seccion>

        {/* ── Preguntas ────────────────────────────────────────────────── */}
        <Seccion>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div data-revelar className="lg:sticky lg:top-28 lg:self-start">
              <p className="rotulo">Preguntas frecuentes</p>
              <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.875rem)] leading-[1.1] font-bold">
                Lo que nos preguntan siempre.
              </h2>
              <p className="mt-4 max-w-[40ch] text-[17px] text-texto-2">
                Si la tuya no está, escribinos: respondemos nosotros, no una mesa de ayuda.
              </p>
            </div>

            {/* Cada pregunta se abre y se cierra sin JavaScript: es un
                <details> del navegador. La primera viene abierta para que se
                vea que hay una respuesta debajo de cada una. */}
            <div className="flex flex-col gap-3">
              {p.preguntas.map((q, i) => (
                <details key={q.p} open={i === 0} data-revelar className="vidrio group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[17px] leading-snug font-bold text-white [&::-webkit-details-marker]:hidden">
                    <span>{q.p}</span>
                    <span
                      aria-hidden
                      className="mt-0.5 flex size-6 flex-none items-center justify-center rounded-full border border-white/15 font-mono text-[14px] leading-none text-marca-2 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[60ch] text-[15.5px] text-texto-2">{q.r}</p>
                </details>
              ))}
            </div>
          </div>
        </Seccion>

        {/* ── Los otros sistemas ───────────────────────────────────────── */}
        <Seccion>
          <p data-revelar className="rotulo !text-texto-3">
            También hacemos
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {otros.map((o) => (
              <Link
                key={o.slug}
                href={`/sistemas/${o.slug}`}
                data-revelar
                className="vidrio vidrio-interactivo flex flex-col p-6"
              >
                <span
                  className="block size-6 rounded-lg"
                  style={{ background: o.acento }}
                  aria-hidden
                />
                <span className="mt-4 font-display text-[22px] leading-tight font-bold text-white">
                  {o.nombre}
                </span>
                <span className="mt-1 font-mono text-[9.5px] tracking-[0.14em] text-marca-2 uppercase">
                  {o.rubro}
                </span>
                <span className="mt-3 text-[14.5px] text-texto-2">{o.resumen}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[10.5px] tracking-[0.08em] text-marca-2 uppercase">
                  Conocer {o.nombre}
                  <Icono nombre="flecha" className="size-3.5" />
                </span>
              </Link>
            ))}

            <Link
              href="/#proyectos"
              data-revelar
              className="vidrio-marca vidrio-interactivo flex flex-col p-6"
            >
              <span className="block size-6 rounded-lg bg-marca" aria-hidden />
              <span className="mt-4 font-display text-[22px] leading-tight font-bold text-white">
                Proyectos integrales
              </span>
              <span className="mt-1 font-mono text-[9.5px] tracking-[0.14em] text-marca-2 uppercase">
                ValtusCorp
              </span>
              <span className="mt-3 text-[14.5px] text-texto-2">
                Cuando el problema no es un sistema, sino la operación entera.
              </span>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[10.5px] tracking-[0.08em] text-marca-2 uppercase">
                Ver cómo trabajamos
                <Icono nombre="flecha" className="size-3.5" />
              </span>
            </Link>
          </div>
        </Seccion>

        <Contacto />
      </main>
      <Pie />
    </>
  );
}
