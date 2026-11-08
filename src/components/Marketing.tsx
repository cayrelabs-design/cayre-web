import Image from 'next/image';
import { marketing } from '@/content/landing';
import { Icono } from './Icono';

export function Marketing() {
  return (
    <section id="marketing" className="relative overflow-hidden py-24 md:py-28">
      <Image
        src="/img/fondo-textura.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-fondo via-fondo/90 to-fondo" />
      <div className="aura top-24 -left-20 size-96 bg-cian/12" />

      <div className="contenedor relative">
        <div className="mx-auto mb-14 max-w-[62ch] text-center">
          <p className="rotulo">{marketing.etiqueta}</p>
          <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.875rem)] leading-[1.1] font-bold">
            {marketing.titulo}
            <span className="texto-degradado block">{marketing.tituloDestacado}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[56ch] text-[17px] text-texto-2">{marketing.texto}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-6">
          <div>
            <p className="rotulo !text-texto-3">{marketing.paraQuienTitulo}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {marketing.paraQuien.map((item) => (
                <li key={item.titulo} className="vidrio p-6">
                  <h3 className="text-[16.5px] font-bold">{item.titulo}</h3>
                  <p className="mt-1 text-[14.5px] text-texto-2">{item.texto}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="rotulo !text-texto-3">{marketing.pilaresTitulo}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {marketing.pilares.map((item) => (
                <li key={item.titulo} className="vidrio flex items-start gap-4 p-6">
                  <span className="mt-0.5 flex-none text-cian" aria-hidden>
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

        <div className="vidrio-marca mt-6 p-9 !rounded-[32px] text-center">
          <h3 className="text-[22px] font-bold">{marketing.combinado.titulo}</h3>
          <p className="mx-auto mt-3 max-w-[62ch] text-[16px] text-texto-2">
            {marketing.combinado.texto}
          </p>
          <a href="#contacto" className="boton boton-primario degradado mt-7">
            {marketing.cta}
            <Icono nombre="flecha" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
