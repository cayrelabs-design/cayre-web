/**
 * Fechas y horas, siempre en hora de Argentina.
 *
 * El servidor corre en otro huso horario (en Vercel, UTC). Si se dejara que
 * cada fecha se muestre "en la hora de la máquina", una reunión de las 10 se
 * vería a las 13. Por eso el huso se fija acá y todas las pantallas pasan por
 * estas funciones.
 *
 * Argentina no cambia la hora en verano: siempre es UTC-3. Eso permite
 * convertir lo que se carga en un formulario con una cuenta fija.
 */

const HUSO = 'America/Argentina/Buenos_Aires';

const fmtDia = new Intl.DateTimeFormat('es-AR', {
  timeZone: HUSO,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
const fmtCorta = new Intl.DateTimeFormat('es-AR', {
  timeZone: HUSO,
  day: 'numeric',
  month: 'short',
});
const fmtHora = new Intl.DateTimeFormat('es-AR', {
  timeZone: HUSO,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
const fmtClave = new Intl.DateTimeFormat('en-CA', {
  timeZone: HUSO,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** "lunes 16 de noviembre" */
export const diaLargo = (fecha: string | Date) => fmtDia.format(new Date(fecha));
/** "16 nov" */
export const diaCorto = (fecha: string | Date) => fmtCorta.format(new Date(fecha));
/** "10:30" */
export const hora = (fecha: string | Date) => fmtHora.format(new Date(fecha));
/** "2026-11-16", el día en Argentina. Sirve para agrupar y comparar. */
export const claveDia = (fecha: string | Date) => fmtClave.format(new Date(fecha));

export const hoy = () => claveDia(new Date());

/** Una fecha sin hora ("2026-11-16", como la guarda la base) -> "16 nov". */
export function fechaSola(valor: string | null): string {
  if (!valor) return '';
  // Se le pone mediodía para que ningún huso la corra al día anterior.
  return fmtCorta.format(new Date(`${valor}T12:00:00-03:00`));
}

/** Lo que carga un formulario ("2026-11-16T10:30", hora argentina) -> instante exacto. */
export function desdeFormulario(valor: string): Date {
  return new Date(`${valor}:00-03:00`);
}

/** Cuántos días faltan para una fecha sin hora. Negativo si ya pasó. */
export function diasHasta(valor: string): number {
  const a = new Date(`${hoy()}T12:00:00-03:00`).getTime();
  const b = new Date(`${valor}T12:00:00-03:00`).getTime();
  return Math.round((b - a) / 86_400_000);
}

/** "hace 3 horas", "hace 2 días". Para saber cuánto lleva esperando una consulta. */
export function hace(fecha: string | Date): string {
  const minutos = Math.max(0, Math.round((Date.now() - new Date(fecha).getTime()) / 60_000));
  if (minutos < 1) return 'recién';
  if (minutos < 60) return `hace ${minutos} min`;
  const horas = Math.round(minutos / 60);
  if (horas < 24) return `hace ${horas} h`;
  const dias = Math.round(horas / 24);
  return dias === 1 ? 'hace 1 día' : `hace ${dias} días`;
}

/** Horas que pasaron desde una fecha. */
export const horasDesde = (fecha: string | Date) =>
  (Date.now() - new Date(fecha).getTime()) / 3_600_000;

/** El instante de hace N horas, listo para comparar contra la base. */
export const haceHoras = (horas: number) => new Date(Date.now() - horas * 3_600_000).toISOString();

/** El dia (sin hora) de dentro de N dias, en Argentina. */
export const enDias = (dias: number) => claveDia(new Date(Date.now() + dias * 86_400_000));
