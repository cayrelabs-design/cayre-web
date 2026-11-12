import Image from 'next/image';
import { contacto, portada } from '@/content/landing';
import { logoPublicado } from '@/lib/logos';
import { aSlug } from '@/lib/slug';
import { Icono } from './Icono';
import { Marca } from './Marca';

/**
 * Los tres pasos que dispara una sola venta. Flotan sobre la foto, cada uno a
 * su ritmo, y son la versión chiquita del diagrama que viene más abajo: no son
 * una captura de pantalla inventada, son el circuito real contado en tres
 * palabras cada uno.
 */
const PASOS_VENTA = [
  { texto: 'Venta registrada', arriba: '18%', derecha: '6%', demora: '0s' },
  { texto: 'Stock descontado', arriba: '42%', derecha: '26%', demora: '1.4s' },
  { texto: 'Factura emitida', arriba: '66%', derecha: '9%', demora: '2.8s' },
];

export function Portada() {
  // El titular cierra con una frase corta —"Un solo equipo."— que es la que
  // conviene resaltar. Se separa acá y no en el contenido: el texto publicado
  // sigue siendo exactamente el mismo.
  const corte = portada.titulo.lastIndexOf('.', portada.titulo.length - 2);
  const principio = corte > 0 ? portada.titulo.slice(0, corte + 1) : portada.titulo;
  const remate = corte > 0 ? portada.titulo.slice(corte + 1).trim() : '';

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* El acercamiento es de un 6% en diez segundos: mirándolo no se nota,
          sacándolo sí. La foto deja de ser un fondo y pasa a estar viva. */}
      <div className="absolute inset-0">
        <Image
          src="/img/portada-almacen.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-[acercar_14s_ease-in-out_infinite_alternate] object-cover object-[72%_center]"
        />
      </div>

      {/* El degradado tiene que hacer dos cosas a la vez: dejar leer el titular
          sobre la izquierda y dejar ver la foto a la derecha. Si se pasa de
          oscuro —y es fácil pasarse— la imagen desaparece y la portada queda
          en negro. Por eso se corta en el 55% y suelta rápido. */}
      <div className="absolute inset-0 bg-gradient-to-r from-fondo from-22% via-fondo/80 via-56% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-fondo to-transparent" />

      {/* Los resplandores son lo que le da profundidad al fondo sin sumar peso:
          son dos divs con desenfoque, no imágenes. */}
      <div className="aura derivar -top-24 -left-32 size-[34rem] bg-marca/22" />
      <div className="aura derivar top-40 left-[38%] size-80 bg-cian/12 [animation-delay:-8s]" />

      {/* Los pasos de la venta, flotando sobre la foto. Van sólo en pantallas
          anchas: en el teléfono taparían el titular. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {PASOS_VENTA.map((paso) => (
          <span
            key={paso.texto}
            className="vidrio con-desenfoque flotar absolute flex items-center gap-2.5 !rounded-full px-4 py-2.5"
            style={{ top: paso.arriba, right: paso.derecha, animationDelay: paso.demora }}
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-ok/20 text-ok">
              <Icono nombre="check" className="size-3" />
            </span>
            <span className="text-[13.5px] font-medium text-white">{paso.texto}</span>
          </span>
        ))}
      </div>

      <div className="contenedor relative py-16 md:py-20 lg:py-24">
        <div className="flex max-w-[48ch] flex-col gap-6">
          <p className="vidrio con-desenfoque inline-flex w-fit items-center gap-2.5 !rounded-full px-4 py-2">
            <span className="latir size-1.5 rounded-full bg-cian" aria-hidden />
            <span className="rotulo !text-[9.5px] !tracking-[0.1em] !text-texto-2 sm:!text-[11px] sm:!tracking-[0.16em]">
              {portada.etiqueta}
            </span>
          </p>

          {/* El titular NO lleva animación de entrada a propósito: es el
              elemento más grande de la pantalla y, por lo tanto, el que mide
              Google para la velocidad de carga. Si arranca invisible, la página
              puntúa como si tardara casi un segundo más. */}
          <h1 className="text-[clamp(2.3rem,5.6vw,4rem)] leading-[1.06] font-bold">
            {principio} {remate && <span className="texto-degradado">{remate}</span>}
          </h1>

          <p
            className="entrada max-w-[46ch] text-[clamp(1.05rem,1.8vw,1.2rem)] leading-relaxed text-texto-2"
            style={{ animationDelay: "80ms" }}
          >
            {portada.bajada}
          </p>

          <div className="entrada flex flex-wrap gap-3" style={{ animationDelay: "160ms" }}>
            <a href="#contacto" className="boton boton-primario degradado">
              {portada.ctaPrincipal}
              <Icono nombre="flecha" className="size-4" />
            </a>
            {/* WhatsApp es el canal donde compra la pyme argentina. Aparece
                solo cuando hay número cargado; mientras no lo haya, el único
                camino es el formulario y no se promete un canal que no existe. */}
            {contacto.whatsappLink ? (
              <a
                href={contacto.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="boton boton-secundario"
              >
                <Icono nombre="chat" className="size-4" />
                Escribinos por WhatsApp
              </a>
            ) : (
              <a href="#productos" className="boton boton-secundario">
                {portada.ctaSecundario}
              </a>
            )}
          </div>

        </div>

        {/* La prueba: las empresas que trabajan con los sistemas, en una franja
            a todo el ancho al pie de la portada.

            La franja no sabe cuántos logos hay: en pantalla ancha se reparten
            el ancho en partes iguales, sean cinco o siete; en el teléfono van
            de a tres por fila y la última fila queda centrada. Así, sumar o
            sacar una empresa es tocar la lista de textos y nada más. */}
        <div
          className="vidrio con-desenfoque entrada mt-10 flex flex-col gap-x-10 gap-y-5 px-6 py-5 lg:mt-14 lg:flex-row lg:items-center lg:px-8"
          style={{ animationDelay: "240ms" }}
        >
          <p className="rotulo flex-none !text-texto-3 lg:max-w-[13rem]">{portada.clientesTitulo}</p>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-6 sm:flex-nowrap">
            {portada.clientes.map((cliente) => (
              <li
                key={cliente}
                className="flex basis-[calc(33.333%-1rem)] items-center justify-center sm:min-w-0 sm:flex-1 sm:basis-0"
              >
                <Marca
                  nombre={cliente}
                  logo={logoPublicado('clientes', aSlug(cliente))}
                  alto={30}
                  alFrente
                  className="text-center font-display text-[15px] font-bold tracking-tight text-white"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
