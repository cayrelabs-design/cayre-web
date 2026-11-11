import type { Tono } from '@/interno/lib/dominio';

const COLORES: Record<Tono, string> = {
  neutro: 'bg-fondo text-texto-2',
  info: 'bg-info-suave text-info',
  ok: 'bg-ok-suave text-ok',
  alerta: 'bg-alerta-suave text-alerta',
  error: 'bg-error-suave text-error',
  marca: 'bg-marca-suave text-marca-oscura',
};

/**
 * La pastilla de estado. El color nunca va solo: siempre lleva la palabra,
 * para que se entienda igual sin distinguir colores.
 */
export function Estado({ nombre, tono }: { nombre: string; tono: Tono }) {
  return (
    <span className={`pastilla ${COLORES[tono]}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {nombre}
    </span>
  );
}

/** El cartel de error o de aviso que aparece arriba de una pantalla. */
export function Aviso({ texto, tono = 'error' }: { texto?: string; tono?: 'error' | 'ok' }) {
  if (!texto) return null;
  return (
    <p
      role={tono === 'error' ? 'alert' : 'status'}
      className={`mb-5 rounded-xl border px-4 py-3 text-sm font-semibold ${
        tono === 'error'
          ? 'border-error/30 bg-error-suave text-error'
          : 'border-ok/30 bg-ok-suave text-ok'
      }`}
    >
      {texto}
    </p>
  );
}
