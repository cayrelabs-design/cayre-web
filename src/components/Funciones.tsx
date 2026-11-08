import { funciones } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

export function Funciones() {
  return (
    <Seccion id="funciones">
      <Encabezamiento etiqueta={funciones.etiqueta} titulo={funciones.titulo} texto={funciones.texto} />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {funciones.items.map((item) => (
          <li key={item.nombre} className="vidrio flex items-start gap-4 p-6">
            <span className="mt-0.5 flex-none text-cian" aria-hidden>
              <Icono nombre={item.icono} className="size-5" />
            </span>
            <div>
              <h3 className="text-[16px] font-bold">{item.nombre}</h3>
              <p className="mt-1 text-[14px] text-texto-2">{item.texto}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <p className="rotulo !text-texto-3">{funciones.rubroTitulo}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
          {funciones.rubros.map((rubro) => (
            <li
              key={rubro}
              className="vidrio !rounded-full px-4 py-2 text-sm font-medium text-texto-2"
            >
              {rubro}
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
