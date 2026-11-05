import { servicios } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

export function Servicios() {
  return (
    <Seccion id="servicios" tenue>
      <Encabezamiento etiqueta={servicios.etiqueta} titulo={servicios.titulo} texto={servicios.texto} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servicios.items.map((item) => (
          <article
            key={item.nombre}
            className={
              item.destacado
                ? 'flex flex-col gap-4 border border-marca/45 bg-gradient-to-b from-marca/12 to-transparent p-7 md:col-span-1 lg:col-span-[1]'
                : 'flex flex-col gap-4 border border-linea-2 bg-superficie p-7'
            }
          >
            <span
              className={`flex size-11 items-center justify-center border ${
                item.destacado
                  ? 'border-marca/50 bg-marca/15 text-marca-2'
                  : 'border-linea-2 bg-superficie-2 text-texto-2'
              }`}
              aria-hidden
            >
              <Icono nombre={item.icono} className="size-5" />
            </span>

            <h3 className="text-xl font-bold">{item.nombre}</h3>
            <p className="text-[15px] text-texto-2">{item.texto}</p>

            {item.destacado && (
              <p className="mt-auto pt-2 font-mono text-[10px] tracking-[0.14em] text-marca-2 uppercase">
                Nuestra especialidad
              </p>
            )}
          </article>
        ))}
      </div>
    </Seccion>
  );
}
