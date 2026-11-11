/**
 * El nombre de una empresa: con su logo si el archivo está, escrito si no.
 *
 * Este componente no sabe de archivos: recibe la ruta ya resuelta (o null)
 * desde el servidor. Por eso lo pueden usar tanto las secciones de servidor
 * como las de cliente, y nunca dibuja una imagen rota.
 *
 * Los logos se muestran en blanco (`logo-blanco` en globals.css). Sobre fondo
 * oscuro, tres logos cada uno con su color y su fondo se pelean entre sí y con
 * la página; en un solo tono se leen como un conjunto.
 */
export function Marca({
  nombre,
  archivo,
  alto = 26,
  className = '',
}: {
  nombre: string;
  archivo: string | null | undefined;
  /** Alto del logo en píxeles. El ancho sale solo de la proporción del archivo. */
  alto?: number;
  /** Estilo del nombre escrito, para cuando no hay logo. */
  className?: string;
}) {
  if (!archivo) return <span className={className}>{nombre}</span>;

  return (
    // Es <img> y no next/image a propósito: son logos chicos, casi siempre
    // SVG, y su ancho depende de la proporción de cada archivo.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={archivo}
      alt={nombre}
      height={alto}
      style={{ height: alto, width: 'auto' }}
      className="logo-blanco"
      loading="lazy"
      decoding="async"
    />
  );
}
