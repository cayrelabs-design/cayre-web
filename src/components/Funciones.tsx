import { funciones } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

/**
 * Las doce funciones de base, en pastillas.
 *
 * Esto era una grilla de doce tarjetas con título y descripción: dos pantallas
 * y media para decir algo que el visitante entiende leyendo los nombres. Ahora
 * entra en un bloque que se barre de un vistazo.
 *
 * La explicación no se perdió: va en el `title`, así que aparece al dejar el
 * mouse quieto encima, y los lectores de pantalla la leen igual.
 */
export function Funciones() {
  return (
    <Seccion id="funciones">
      <Encabezamiento
        etiqueta={funciones.etiqueta}
        titulo={funciones.titulo}
        texto={funciones.texto}
      />

      <ul className="flex flex-wrap justify-center gap-2.5" data-revelar>
        {funciones.items.map((item) => (
          <li
            key={item.nombre}
            title={item.texto}
            className="vidrio vidrio-interactivo flex items-center gap-2.5 !rounded-full px-4 py-2.5"
          >
            <Icono nombre={item.icono} className="size-4 flex-none text-cian" />
            <span className="text-[14.5px] font-medium text-texto-2">{item.nombre}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <p className="rotulo !text-texto-3">{funciones.rubroTitulo}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2.5" data-revelar>
          {funciones.rubros.map((rubro) => (
            <li
              key={rubro}
              className="rounded-full border border-marca/30 bg-marca/10 px-4 py-2 text-sm font-medium text-marca-3"
            >
              {rubro}
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
