/**
 * Isotipo de Cayre Labs: la "C" abierta con el cuadrado.
 *
 * Va como SVG en línea y no como imagen para que herede el color del texto
 * (`currentColor`), se pueda usar sobre fondo claro u oscuro sin tener dos
 * archivos, y no cueste un pedido de red aparte.
 */
export function Isotipo({ size = 25, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Cayre Labs"
    >
      <path
        d="M46.14 17.86 A20 20 0 1 0 46.14 46.14"
        stroke="currentColor"
        strokeWidth="9"
        fill="none"
      />
      <rect x="42" y="27" width="10" height="10" rx="2" fill="currentColor" />
    </svg>
  );
}

export function Logotipo({ size = 25 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Isotipo size={size} className="text-marca-2" />
      <span className="font-display text-[17px] font-extrabold tracking-[-0.04em] text-white">
        Cayre Labs
      </span>
    </span>
  );
}
