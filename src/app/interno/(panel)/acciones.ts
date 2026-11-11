'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ESTADOS_CONSULTA,
  ESTADOS_PROYECTO,
  ESTADOS_REUNION,
  ESTADOS_TAREA,
  LINEAS,
} from '@/interno/lib/dominio';
import { desdeFormulario } from '@/interno/lib/formato';
import { exigirSocio } from '@/interno/lib/sesion';

/**
 * Todo lo que el back office puede CAMBIAR pasa por este archivo.
 *
 * Cada acción hace lo mismo, en el mismo orden:
 *   1. `exigirSocio()`  — quién sos y si podés.
 *   2. validar          — lo que llega del formulario se revisa siempre acá,
 *                         en el servidor. Lo que valida el navegador es
 *                         comodidad; lo que vale es esto.
 *   3. guardar          — con la sesión del socio. La base vuelve a revisar el
 *                         permiso y las reglas (por ejemplo, que una tarea
 *                         trabada diga por qué).
 *
 * Si algo falla, se vuelve a la pantalla con el motivo arriba, en castellano.
 */

// ── Utilidades ───────────────────────────────────────────────────────────────

const texto = (datos: FormData, campo: string) => String(datos.get(campo) ?? '').trim();
const opcional = (valor: string) => (valor === '' ? null : valor);

/** Vuelve a `ruta` mostrando el error. Corta la acción. */
function fallar(ruta: string, mensaje: string): never {
  const separador = ruta.includes('?') ? '&' : '?';
  redirect(`${ruta}${separador}error=${encodeURIComponent(mensaje)}`);
}

const idNumerico = z.coerce.number().int().positive();
const socioOpcional = z.union([z.literal(''), z.uuid()]);
const fechaOpcional = z.union([z.literal(''), z.iso.date()]);

// ── Consultas ────────────────────────────────────────────────────────────────

export async function cambiarConsulta(datos: FormData) {
  const { supabase } = await exigirSocio();
  const id = idNumerico.safeParse(datos.get('id'));
  if (!id.success) redirect('/interno/consultas');
  const ruta = `/interno/consultas/${id.data}`;

  const cambios = z
    .object({
      estado: z.enum(ESTADOS_CONSULTA),
      responsable_id: socioOpcional,
    })
    .safeParse({ estado: texto(datos, 'estado'), responsable_id: texto(datos, 'responsable_id') });
  if (!cambios.success) fallar(ruta, 'Revisá el estado y el responsable.');

  const { error } = await supabase
    .from('consultas')
    .update({
      estado: cambios.data.estado,
      responsable_id: opcional(cambios.data.responsable_id),
    })
    .eq('id', id.data);
  if (error) fallar(ruta, 'No se pudo guardar el cambio.');

  revalidatePath('/interno', 'layout');
  redirect(ruta);
}

/** "La tomo yo": pasa a contactada y queda a nombre del socio que tocó el botón. */
export async function tomarConsulta(datos: FormData) {
  const { supabase, socio } = await exigirSocio();
  const id = idNumerico.safeParse(datos.get('id'));
  if (!id.success) redirect('/interno/consultas');

  const { error } = await supabase
    .from('consultas')
    .update({ estado: 'contactada', responsable_id: socio.id })
    .eq('id', id.data);
  if (error) fallar(`/interno/consultas/${id.data}`, 'No se pudo tomar la consulta.');

  revalidatePath('/interno', 'layout');
  redirect(`/interno/consultas/${id.data}`);
}

export async function anotarEnConsulta(datos: FormData) {
  const { supabase } = await exigirSocio();
  const id = idNumerico.safeParse(datos.get('id'));
  if (!id.success) redirect('/interno/consultas');
  const ruta = `/interno/consultas/${id.data}`;

  const nota = z.string().min(1).max(4000).safeParse(texto(datos, 'texto'));
  if (!nota.success) fallar(ruta, 'Escribí la nota antes de guardarla.');

  // El autor no se manda: lo pone la base con la sesión. Así nadie puede
  // firmar una nota con el nombre de otro.
  const { error } = await supabase
    .from('consulta_notas')
    .insert({ consulta_id: id.data, texto: nota.data });
  if (error) fallar(ruta, 'No se pudo guardar la nota.');

  revalidatePath(ruta);
  redirect(ruta);
}

// ── Proyectos ────────────────────────────────────────────────────────────────

const esquemaProyecto = z.object({
  nombre: z.string().min(2, 'Poné el nombre del proyecto.').max(160),
  cliente: z.string().min(2, 'Poné el cliente.').max(160),
  linea: z.union([z.literal(''), z.enum(Object.keys(LINEAS) as [keyof typeof LINEAS])]),
  responsable_id: socioOpcional,
  compromiso_el: fechaOpcional,
  descripcion: z.string().max(4000),
});

function leerProyecto(datos: FormData) {
  return esquemaProyecto.safeParse({
    nombre: texto(datos, 'nombre'),
    cliente: texto(datos, 'cliente'),
    linea: texto(datos, 'linea'),
    responsable_id: texto(datos, 'responsable_id'),
    compromiso_el: texto(datos, 'compromiso_el'),
    descripcion: texto(datos, 'descripcion'),
  });
}

export async function crearProyecto(datos: FormData) {
  const { supabase } = await exigirSocio();
  const consulta = idNumerico.safeParse(datos.get('consulta_id'));
  const origen = consulta.success ? `/interno/consultas/${consulta.data}` : '/interno/proyectos';

  const p = leerProyecto(datos);
  if (!p.success) fallar(origen, p.error.issues[0]?.message ?? 'Revisá los datos del proyecto.');

  const { data, error } = await supabase
    .from('proyectos')
    .insert({
      nombre: p.data.nombre,
      cliente: p.data.cliente,
      linea: opcional(p.data.linea),
      responsable_id: opcional(p.data.responsable_id),
      compromiso_el: opcional(p.data.compromiso_el),
      descripcion: opcional(p.data.descripcion),
      consulta_id: consulta.success ? consulta.data : null,
    })
    .select('id')
    .single();
  if (error || !data) fallar(origen, 'No se pudo crear el proyecto.');

  // Si el proyecto nació de una consulta, esa consulta se ganó.
  if (consulta.success) {
    await supabase.from('consultas').update({ estado: 'ganada' }).eq('id', consulta.data);
  }

  revalidatePath('/interno', 'layout');
  redirect(`/interno/proyectos/${data.id}`);
}

export async function cambiarProyecto(datos: FormData) {
  const { supabase } = await exigirSocio();
  const id = idNumerico.safeParse(datos.get('id'));
  if (!id.success) redirect('/interno/proyectos');
  const ruta = `/interno/proyectos/${id.data}`;

  const p = leerProyecto(datos);
  const estado = z.enum(ESTADOS_PROYECTO).safeParse(texto(datos, 'estado'));
  if (!p.success || !estado.success) {
    fallar(ruta, (!p.success && p.error.issues[0]?.message) || 'Revisá los datos del proyecto.');
  }

  const { error } = await supabase
    .from('proyectos')
    .update({
      nombre: p.data.nombre,
      cliente: p.data.cliente,
      linea: opcional(p.data.linea),
      responsable_id: opcional(p.data.responsable_id),
      compromiso_el: opcional(p.data.compromiso_el),
      descripcion: opcional(p.data.descripcion),
      estado: estado.data,
    })
    .eq('id', id.data);
  if (error) fallar(ruta, 'No se pudo guardar el proyecto.');

  revalidatePath('/interno', 'layout');
  redirect(ruta);
}

// ── Tareas ───────────────────────────────────────────────────────────────────

const esquemaTarea = z
  .object({
    titulo: z.string().min(2, 'Escribí qué hay que hacer.').max(200),
    estado: z.enum(ESTADOS_TAREA),
    motivo_traba: z.string().max(400),
    responsable_id: socioOpcional,
    vence_el: fechaOpcional,
  })
  // La misma regla que tiene la base. Acá sirve para contestar con una frase
  // clara en vez de con un error de base de datos.
  .refine((t) => t.estado !== 'trabada' || t.motivo_traba.length >= 3, {
    message: 'Para marcarla como trabada, contá qué la traba.',
  });

function leerTarea(datos: FormData) {
  return esquemaTarea.safeParse({
    titulo: texto(datos, 'titulo'),
    estado: texto(datos, 'estado') || 'pendiente',
    motivo_traba: texto(datos, 'motivo_traba'),
    responsable_id: texto(datos, 'responsable_id'),
    vence_el: texto(datos, 'vence_el'),
  });
}

export async function crearTarea(datos: FormData) {
  const { supabase } = await exigirSocio();
  const proyecto = idNumerico.safeParse(datos.get('proyecto_id'));
  if (!proyecto.success) redirect('/interno/proyectos');
  const ruta = `/interno/proyectos/${proyecto.data}`;

  const t = leerTarea(datos);
  if (!t.success) fallar(ruta, t.error.issues[0]?.message ?? 'Revisá la tarea.');

  const { error } = await supabase.from('tareas').insert({
    proyecto_id: proyecto.data,
    titulo: t.data.titulo,
    estado: t.data.estado,
    motivo_traba: opcional(t.data.motivo_traba),
    responsable_id: opcional(t.data.responsable_id),
    vence_el: opcional(t.data.vence_el),
  });
  if (error) fallar(ruta, 'No se pudo crear la tarea.');

  revalidatePath('/interno', 'layout');
  redirect(ruta);
}

export async function cambiarTarea(datos: FormData) {
  const { supabase } = await exigirSocio();
  const id = idNumerico.safeParse(datos.get('id'));
  const proyecto = idNumerico.safeParse(datos.get('proyecto_id'));
  if (!id.success || !proyecto.success) redirect('/interno/proyectos');
  const ruta = `/interno/proyectos/${proyecto.data}`;

  // El botón "Borrar" manda el mismo formulario con otra intención.
  if (texto(datos, 'intencion') === 'borrar') {
    const { error } = await supabase.from('tareas').delete().eq('id', id.data);
    if (error) fallar(ruta, 'No se pudo borrar la tarea.');
    revalidatePath('/interno', 'layout');
    redirect(ruta);
  }

  const t = leerTarea(datos);
  if (!t.success) fallar(ruta, t.error.issues[0]?.message ?? 'Revisá la tarea.');

  const { error } = await supabase
    .from('tareas')
    .update({
      titulo: t.data.titulo,
      estado: t.data.estado,
      motivo_traba: opcional(t.data.motivo_traba),
      responsable_id: opcional(t.data.responsable_id),
      vence_el: opcional(t.data.vence_el),
    })
    .eq('id', id.data);
  if (error) fallar(ruta, 'No se pudo guardar la tarea.');

  revalidatePath('/interno', 'layout');
  redirect(ruta);
}

// ── Agenda ───────────────────────────────────────────────────────────────────

const esquemaReunion = z.object({
  titulo: z.string().min(2, 'Poné de qué es la reunión.').max(160),
  cuando: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Elegí el día y la hora.'),
  duracion_min: z.coerce.number().int().min(5).max(600),
  con_quien: z.string().max(160),
  lugar: z.string().max(400),
  notas: z.string().max(4000),
  participantes: z.array(z.uuid()).max(20),
});

export async function crearReunion(datos: FormData) {
  const { supabase } = await exigirSocio();
  const consulta = idNumerico.safeParse(datos.get('consulta_id'));
  const proyecto = idNumerico.safeParse(datos.get('proyecto_id'));

  const r = esquemaReunion.safeParse({
    titulo: texto(datos, 'titulo'),
    cuando: texto(datos, 'cuando'),
    duracion_min: texto(datos, 'duracion_min') || '30',
    con_quien: texto(datos, 'con_quien'),
    lugar: texto(datos, 'lugar'),
    notas: texto(datos, 'notas'),
    participantes: datos.getAll('participantes').map(String),
  });
  if (!r.success) fallar('/interno/agenda', r.error.issues[0]?.message ?? 'Revisá los datos de la reunión.');

  const { data, error } = await supabase
    .from('reuniones')
    .insert({
      titulo: r.data.titulo,
      inicia_el: desdeFormulario(r.data.cuando).toISOString(),
      duracion_min: r.data.duracion_min,
      con_quien: opcional(r.data.con_quien),
      lugar: opcional(r.data.lugar),
      notas: opcional(r.data.notas),
      consulta_id: consulta.success ? consulta.data : null,
      proyecto_id: proyecto.success ? proyecto.data : null,
    })
    .select('id')
    .single();
  if (error || !data) fallar('/interno/agenda', 'No se pudo agendar la reunión.');

  if (r.data.participantes.length > 0) {
    await supabase
      .from('reunion_participantes')
      .insert(r.data.participantes.map((socio_id) => ({ reunion_id: data.id, socio_id })));
  }

  // Agendar el diagnóstico mueve la consulta sola a "reunión agendada".
  if (consulta.success) {
    await supabase
      .from('consultas')
      .update({ estado: 'reunion' })
      .eq('id', consulta.data)
      .in('estado', ['nueva', 'contactada']);
  }

  revalidatePath('/interno', 'layout');
  redirect('/interno/agenda');
}

export async function cambiarReunion(datos: FormData) {
  const { supabase } = await exigirSocio();
  const id = idNumerico.safeParse(datos.get('id'));
  const estado = z.enum(ESTADOS_REUNION).safeParse(texto(datos, 'estado'));
  if (!id.success || !estado.success) redirect('/interno/agenda');

  const { error } = await supabase
    .from('reuniones')
    .update({ estado: estado.data })
    .eq('id', id.data);
  if (error) fallar('/interno/agenda', 'No se pudo actualizar la reunión.');

  revalidatePath('/interno', 'layout');
  redirect('/interno/agenda');
}
