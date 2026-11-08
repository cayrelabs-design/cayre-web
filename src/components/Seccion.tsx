import { Icono, type NombreIcono } from './Icono';

/**
 * Piezas que se repiten en todas las secciones. Tenerlas en un solo lugar es
 * lo que hace que el sitio se vea como un sistema y no como diez páginas
 * pegadas: si cambia el espaciado de un encabezado, cambia en todas.
 *
 * Las secciones ya no se separan con una línea: se separan con aire. La línea
 * cortaba la página en bandas y era buena parte de lo que la hacía ver como un
 * formulario largo.
 */

export function Seccion({
  id,
  tenue,
  children,
}: {
  id?: string;
  tenue?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative overflow-x-clip py-24 md:py-28 ${tenue ? 'bg-fondo-2/60' : ''}`}>
      <div className="contenedor relative">{children}</div>
    </section>
  );
}

export function Encabezamiento({
  etiqueta,
  titulo,
  texto,
  alineado,
}: {
  etiqueta: string;
  titulo: React.ReactNode;
  texto?: string;
  /** Por defecto va centrado; `alineado` lo deja contra el margen izquierdo. */
  alineado?: boolean;
}) {
  return (
    <div data-revelar className={`mb-14 max-w-[62ch] ${alineado ? '' : 'mx-auto text-center'}`}>
      <p className="rotulo">{etiqueta}</p>
      <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.875rem)] leading-[1.1] font-bold">{titulo}</h2>
      {texto && (
        <p className={`mt-4 max-w-[58ch] text-[17px] text-texto-2 ${alineado ? '' : 'mx-auto'}`}>
          {texto}
        </p>
      )}
    </div>
  );
}

export function Tarjeta({
  children,
  className = '',
  destacada,
}: {
  children: React.ReactNode;
  className?: string;
  destacada?: boolean;
}) {
  return (
    <div className={`${destacada ? 'vidrio-marca' : 'vidrio'} p-7 ${className}`}>{children}</div>
  );
}

/**
 * El cuadradito redondeado con el ícono adentro. Se repite en cinco secciones,
 * así que vive acá para que todas lo tengan igual.
 */
export function ChipIcono({
  nombre,
  destacado,
}: {
  nombre: NombreIcono;
  destacado?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`flex size-12 flex-none items-center justify-center rounded-2xl border ${
        destacado
          ? 'border-marca/45 bg-marca/18 text-marca-3'
          : 'border-white/10 bg-white/6 text-marca-2'
      }`}
    >
      <Icono nombre={nombre} className="size-5" />
    </span>
  );
}
