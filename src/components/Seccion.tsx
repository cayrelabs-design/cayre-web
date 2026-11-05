/**
 * Piezas que se repiten en todas las secciones. Tenerlas en un solo lugar es
 * lo que hace que el sitio se vea como un sistema y no como diez páginas
 * pegadas: si cambia el espaciado de un encabezado, cambia en todas.
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
    <section
      id={id}
      className={`border-b border-linea py-20 md:py-24 ${tenue ? 'bg-fondo-2' : ''}`}
    >
      <div className="contenedor">{children}</div>
    </section>
  );
}

export function Encabezamiento({
  etiqueta,
  titulo,
  texto,
  centrado,
}: {
  etiqueta: string;
  titulo: React.ReactNode;
  texto?: string;
  centrado?: boolean;
}) {
  return (
    <div className={`mb-11 max-w-[62ch] ${centrado ? 'mx-auto text-center' : ''}`}>
      <p className="rotulo">{etiqueta}</p>
      <h2 className="mt-3.5 text-[clamp(1.7rem,3.8vw,2.625rem)] leading-[1.05] font-extrabold">
        {titulo}
      </h2>
      {texto && (
        <p className={`mt-3.5 max-w-[56ch] text-[17px] text-texto-2 ${centrado ? 'mx-auto' : ''}`}>
          {texto}
        </p>
      )}
    </div>
  );
}

export function Tarjeta({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-linea-2 bg-superficie p-7 ${className}`}>{children}</div>
  );
}
