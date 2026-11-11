/**
 * Íconos de línea, dibujados acá. Son pocos y no vale la pena una librería.
 * Todos sobre una grilla de 24x24, con el color del texto que los rodea.
 */
const TRAZOS = {
  tablero: 'M4 13h6V4H4v9zm0 7h6v-5H4v5zm10 0h6v-9h-6v9zm0-16v5h6V4h-6z',
  bandeja: 'M4 13l2.5-8h11L20 13M4 13v6h16v-6M4 13h5l1 2h4l1-2h5',
  calendario: 'M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  carpeta: 'M4 6a1 1 0 011-1h4l2 2h8a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V6z',
  salir: 'M15 4h3a1 1 0 011 1v14a1 1 0 01-1 1h-3M10 16l4-4-4-4m4 4H4',
  mas: 'M12 5v14M5 12h14',
  flecha: 'M5 12h14m-5-5l5 5-5 5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  reloj: 'M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  alerta: 'M12 9v4m0 3.5v.5M10.3 4.2L3 17a2 2 0 001.7 3h14.6a2 2 0 001.7-3L13.7 4.2a2 2 0 00-3.4 0z',
  persona: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM5 20a7 7 0 0114 0',
  candado: 'M7 10V7a5 5 0 0110 0v3M6 10h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1z',
} as const;

export type NombreIcono = keyof typeof TRAZOS;

export function Icono({ nombre, className = 'size-5' }: { nombre: NombreIcono; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={TRAZOS[nombre]} />
    </svg>
  );
}

/** El isotipo de Cayre Labs: la "C" abierta con el cuadrado. */
export function Isotipo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Cayre Labs">
      <path d="M46.14 17.86 A20 20 0 1 0 46.14 46.14" stroke="currentColor" strokeWidth="9" fill="none" />
      <rect x="42" y="27" width="10" height="10" rx="2" fill="currentColor" />
    </svg>
  );
}
