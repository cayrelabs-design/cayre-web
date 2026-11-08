import { servicios } from '@/content/landing';
import { ChipIcono, Encabezamiento, Seccion } from './Seccion';

export function Servicios() {
  return (
    <Seccion id="servicios" tenue>
      <Encabezamiento etiqueta={servicios.etiqueta} titulo={servicios.titulo} texto={servicios.texto} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {servicios.items.map((item) => (
          <article
            key={item.nombre}
            className={`flex flex-col gap-4 p-7 ${item.destacado ? 'vidrio-marca' : 'vidrio'}`}
          >
            <ChipIcono nombre={item.icono} destacado={item.destacado} />

            <h3 className="text-xl font-bold">{item.nombre}</h3>
            <p className="text-[15px] text-texto-2">{item.texto}</p>

            {item.destacado && (
              <p className="mt-auto pt-2 font-mono text-[10px] tracking-[0.14em] text-marca-3 uppercase">
                Nuestra especialidad
              </p>
            )}
          </article>
        ))}
      </div>
    </Seccion>
  );
}
