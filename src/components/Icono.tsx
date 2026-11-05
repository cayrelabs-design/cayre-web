/**
 * Iconos de línea, dibujados en una grilla de 24 px con el mismo grosor de
 * trazo. Van como SVG en línea para que hereden el color del texto y no
 * cuesten un pedido de red cada uno.
 */

const TRAZOS: Record<string, React.ReactNode> = {
  chat: <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1-5.2A8 8 0 1 1 21 12Z" />,
  codigo: <path d="m8 6-5 6 5 6M16 6l5 6-5 6" />,
  cohete: (
    <>
      <path d="M13 3c4 1.5 7 5 8 9-4-1-7.5 2-9 6-2.5-1-4.5-3-5.5-5.5C10.5 10.5 13 7 13 3Z" />
      <path d="M6.5 14.5 3 18l3 3 3.5-3.5" />
      <circle cx="14.5" cy="9.5" r="1.5" />
    </>
  ),
  bolsa: (
    <>
      <path d="M4 8h16l-1.3 12.2a1 1 0 0 1-1 .8H6.3a1 1 0 0 1-1-.8L4 8Z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
    </>
  ),
  objetivo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.3" />
    </>
  ),
  grilla: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
    </>
  ),
  deposito: (
    <>
      <path d="M3 9.5 12 4l9 5.5V21H3V9.5Z" />
      <path d="M8 21v-6h8v6" />
      <path d="M8 15h8" />
    </>
  ),
  calculadora: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0" />
    </>
  ),
  documento: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  caja: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </>
  ),
  recibo: (
    <>
      <path d="M5 3h14v18l-2.3-1.6L14.4 21l-2.4-1.6L9.6 21l-2.3-1.6L5 21V3Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  usuarios: (
    <>
      <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M22 20v-1.5a4 4 0 0 0-3-3.8" />
    </>
  ),
  billetera: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16.5 14.5h.01" />
    </>
  ),
  banco: (
    <>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 21h18" />
    </>
  ),
  carrito: (
    <>
      <path d="M2 3h3l2.5 12h11L21 7H6" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </>
  ),
  etiqueta: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </>
  ),
  candado: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  grafico: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21v-7M11 21V6M16 21v-10M21 21v-5" />
    </>
  ),
  subir: (
    <>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </>
  ),
  fabrica: (
    <>
      <path d="M3 21V10l5 3.5V10l5 3.5V10l5 3.5V21H3Z" />
      <path d="M18 10V4h3v6M7 17h2M13 17h2" />
    </>
  ),
  remera: <path d="M8 3 4 5.5 6 10l2-1v12h8V9l2 1 2-4.5L16 3l-2 2h-4L8 3Z" />,
  camion: (
    <>
      <path d="M2 7h11v9H2zM13 10h4.5l3 3v3H13z" />
      <circle cx="6.5" cy="18.5" r="1.8" />
      <circle cx="17" cy="18.5" r="1.8" />
    </>
  ),
  flecha: <path d="M4 12h15M13 6l6 6-6 6" />,
  check: <path d="m5 13 4.5 4.5L19 7" />,
};

export type NombreIcono = keyof typeof TRAZOS;

export function Icono({ nombre, className }: { nombre: NombreIcono; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {TRAZOS[nombre]}
    </svg>
  );
}
