/**
 * El nombre de una empresa: con su logo si el archivo está, escrito si no.
 *
 * Este componente no sabe de archivos: recibe el logo ya resuelto (o null)
 * desde el servidor. Por eso lo pueden usar tanto las secciones de servidor
 * como las de cliente, y nunca dibuja una imagen rota.
 *
 * Los logos se muestran en blanco (`logo-blanco` en globals.css). Sobre fondo
 * oscuro, seis logos cada uno con su color se pelean entre sí y con la página;
 * en un solo tono se leen como un conjunto.
 */

export type LogoResuelto = { src: string; proporcion: number } | null | undefined;

/**
 * El tamaño de un logo dentro de una fila de logos.
 *
 * Si a todos se les da el mismo alto, uno apaisado ("porcenot") queda enorme y
 * uno apilado (el de Body Sculpt, con el símbolo arriba) queda diminuto. Lo que
 * el ojo compara es la superficie, así que se les da a todos una superficie
 * parecida: los apaisados salen más bajos y los apilados más altos.
 *
 * `alto` es el alto que recibe un logo de proporción 3 a 1, que es el caso
 * típico. Los demás se acomodan alrededor, dentro de un tope para que ninguno
 * rompa la fila.
 */
export function medidaDeLogo(proporcion: number, alto: number) {
  const h = Math.min(alto * 1.75, Math.max(alto * 0.72, alto * Math.sqrt(3 / proporcion)));
  return { width: Math.round(h * proporcion), height: Math.round(h) };
}

export function Marca({
  nombre,
  logo,
  alto = 26,
  tenue,
  alFrente,
  className = '',
}: {
  nombre: string;
  logo: LogoResuelto;
  /** Alto de referencia, en píxeles (ver `medidaDeLogo`). */
  alto?: number;
  /** Más apagado, para filas secundarias. */
  tenue?: boolean;
  /** Se ve apenas carga la pagina (la portada): no esperar al scroll para pedirlo. */
  alFrente?: boolean;
  /** Estilo del nombre escrito, para cuando no hay logo. */
  className?: string;
}) {
  if (!logo) return <span className={className}>{nombre}</span>;

  const medida = medidaDeLogo(logo.proporcion, alto);
  return (
    // Es <img> y no next/image a propósito: son logos chicos, ya optimizados
    // por scripts/preparar-logos.mjs, y su ancho depende de cada archivo.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={nombre}
      width={medida.width}
      height={medida.height}
      className={tenue ? 'logo-blanco logo-tenue' : 'logo-blanco'}
      loading={alFrente ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
