import Image from 'next/image';
import { marketing } from '@/content/landing';
import { Icono } from './Icono';

export function Marketing() {
  return (
    <section id="marketing" className="relative overflow-hidden border-b border-linea py-20 md:py-24">
      <Image
        src="/img/fondo-textura.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fondo via-fondo/88 to-fondo" />

      <div className="contenedor relative">
        <div className="mb-11 max-w-[62ch]">
          <p className="rotulo">{marketing.etiqueta}</p>
          <h2 className="mt-3.5 text-[clamp(1.7rem,3.8vw,2.625rem)] leading-[1.05] font-extrabold">
            {marketing.titulo}
            <span className="block text-marca-2">{marketing.tituloDestacado}</span>
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] text-texto-2">{marketing.texto}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="rotulo text-texto-3">{marketing.paraQuienTitulo}</p>
            <ul className="mt-5 flex flex-col gap-px bg-linea">
              {marketing.paraQuien.map((item) => (
                <li key={item.titulo} className="bg-fondo py-5">
                  <h3 className="text-[16.5px] font-bold">{item.titulo}</h3>
                  <p className="mt-1 text-[14.5px] text-texto-2">{item.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="rotulo text-texto-3">{marketing.pilaresTitulo}</p>
            <ul className="mt-5 flex flex-col gap-px bg-linea">
              {marketing.pilares.map((item) => (
                <li key={item.titulo} className="flex items-start gap-4 bg-fondo py-5">
                  <span className="mt-0.5 flex-none text-marca-2" aria-hidden>
                    <Icono nombre="check" className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-[16.5px] font-bold">{item.titulo}</h3>
                    <p className="mt-1 text-[14.5px] text-texto-2">{item.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-11 border border-marca/45 bg-gradient-to-br from-marca/14 to-transparent p-8">
          <h3 className="text-[22px] font-extrabold">{marketing.combinado.titulo}</h3>
          <p className="mt-3 max-w-[62ch] text-[16px] text-texto-2">{marketing.combinado.texto}</p>
          <a
            href="#contacto"
            className="mt-6 inline-flex min-h-12 items-center gap-2 bg-marca px-7 font-display font-semibold text-fondo transition hover:bg-marca-2"
          >
            {marketing.cta}
            <Icono nombre="flecha" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
