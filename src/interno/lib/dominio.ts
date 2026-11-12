/**
 * Las palabras del negocio en un solo lugar: los estados posibles de cada cosa
 * y cómo se llaman en pantalla.
 *
 * Las listas tienen que coincidir con las restricciones de la base
 * (supabase/migrations/0002_interno.sql). Si se agrega un estado, se agrega en
 * los dos lados: la base es la que manda, y rechaza lo que no conoce.
 */

export type Tono = 'neutro' | 'info' | 'ok' | 'alerta' | 'error' | 'marca';

// ── Consultas ────────────────────────────────────────────────────────────────
export const ESTADOS_CONSULTA = ['nueva', 'contactada', 'reunion', 'ganada', 'descartada'] as const;
export type EstadoConsulta = (typeof ESTADOS_CONSULTA)[number];

export const CONSULTA: Record<EstadoConsulta, { nombre: string; tono: Tono }> = {
  nueva: { nombre: 'Nueva', tono: 'error' },
  contactada: { nombre: 'Contactada', tono: 'info' },
  reunion: { nombre: 'Reunión agendada', tono: 'marca' },
  ganada: { nombre: 'Ganada', tono: 'ok' },
  descartada: { nombre: 'Descartada', tono: 'neutro' },
};

/** La promesa que hace la web: responder en menos de 4 horas hábiles. */
export const HORAS_PROMETIDAS = 4;

export type Consulta = {
  id: number;
  nombre: string;
  empresa: string | null;
  telefono: string | null;
  email: string | null;
  mensaje: string;
  estado: EstadoConsulta;
  responsable_id: string | null;
  atendida_el: string | null;
  created_at: string;
};

// ── Proyectos ────────────────────────────────────────────────────────────────
export const ESTADOS_PROYECTO = ['activo', 'pausado', 'terminado', 'cancelado'] as const;
export type EstadoProyecto = (typeof ESTADOS_PROYECTO)[number];

export const PROYECTO: Record<EstadoProyecto, { nombre: string; tono: Tono }> = {
  activo: { nombre: 'Activo', tono: 'ok' },
  pausado: { nombre: 'Pausado', tono: 'alerta' },
  terminado: { nombre: 'Terminado', tono: 'neutro' },
  cancelado: { nombre: 'Cancelado', tono: 'neutro' },
};

// Las claves de la izquierda son las que guarda la base (con una restriccion
// en la migracion 0002) y no se ven en ninguna pantalla: quedaron del nombre
// anterior de la empresa y no se cambian. Lo que se muestra es lo de la derecha.
export const LINEAS = {
  cayre360: 'Valtus360',
  cayrepos: 'ValtusPOS',
  cayrecrm: 'ValtusCRM',
  cayrecorp: 'ValtusCorp',
  cayremkt: 'ValtusMKT',
} as const;
export type Linea = keyof typeof LINEAS;

export type Proyecto = {
  id: number;
  nombre: string;
  cliente: string;
  linea: Linea | null;
  estado: EstadoProyecto;
  responsable_id: string | null;
  compromiso_el: string | null;
  descripcion: string | null;
  consulta_id: number | null;
  created_at: string;
};

// ── Tareas ───────────────────────────────────────────────────────────────────
export const ESTADOS_TAREA = ['pendiente', 'en_curso', 'trabada', 'hecha'] as const;
export type EstadoTarea = (typeof ESTADOS_TAREA)[number];

export const TAREA: Record<EstadoTarea, { nombre: string; tono: Tono }> = {
  pendiente: { nombre: 'Pendiente', tono: 'neutro' },
  en_curso: { nombre: 'En curso', tono: 'info' },
  trabada: { nombre: 'Trabada', tono: 'error' },
  hecha: { nombre: 'Hecha', tono: 'ok' },
};

export type Tarea = {
  id: number;
  proyecto_id: number;
  titulo: string;
  detalle: string | null;
  estado: EstadoTarea;
  motivo_traba: string | null;
  responsable_id: string | null;
  vence_el: string | null;
  hecha_el: string | null;
};

// ── Reuniones ────────────────────────────────────────────────────────────────
export const ESTADOS_REUNION = ['agendada', 'hecha', 'cancelada'] as const;
export type EstadoReunion = (typeof ESTADOS_REUNION)[number];

export const REUNION: Record<EstadoReunion, { nombre: string; tono: Tono }> = {
  agendada: { nombre: 'Agendada', tono: 'marca' },
  hecha: { nombre: 'Hecha', tono: 'ok' },
  cancelada: { nombre: 'Cancelada', tono: 'neutro' },
};

export type Reunion = {
  id: number;
  titulo: string;
  inicia_el: string;
  duracion_min: number;
  con_quien: string | null;
  lugar: string | null;
  notas: string | null;
  estado: EstadoReunion;
  consulta_id: number | null;
  proyecto_id: number | null;
  reunion_participantes: { socio_id: string }[];
};
