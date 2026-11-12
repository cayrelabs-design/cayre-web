'use server';

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { type CampoConsulta, type EstadoConsulta, esquemaConsulta } from '@/lib/consulta';
import { baseConfigurada, consultasRecientes, guardarConsulta } from '@/lib/consultas-db';

const MAXIMO_POR_CONEXION = 3; // consultas cada 10 minutos desde una misma conexión
const TIEMPO_MINIMO_MS = 3000; // una persona tarda más que esto en completar el formulario

function texto(datos: FormData, campo: string) {
  const valor = datos.get(campo);
  return typeof valor === 'string' ? valor : '';
}

export async function enviarConsulta(
  _previo: EstadoConsulta,
  datos: FormData,
): Promise<EstadoConsulta> {
  const valores = {
    nombre: texto(datos, 'nombre'),
    empresa: texto(datos, 'empresa'),
    telefono: texto(datos, 'telefono'),
    email: texto(datos, 'email'),
    mensaje: texto(datos, 'mensaje'),
  };

  // Dos trampas para robots: un campo oculto que una persona nunca completa, y
  // un envío demasiado rápido. Se les responde "ok" para no darles pistas de
  // que fueron detectados, pero no se guarda nada.
  if (texto(datos, 'sitio_web') !== '') return { estado: 'ok' };
  const inicio = Number(texto(datos, 'inicio'));
  if (inicio > 0 && Date.now() - inicio < TIEMPO_MINIMO_MS) return { estado: 'ok' };

  const resultado = esquemaConsulta.safeParse(valores);
  if (!resultado.success) {
    const errores: Partial<Record<CampoConsulta, string>> = {};
    for (const problema of resultado.error.issues) {
      const campo = problema.path[0] as CampoConsulta | undefined;
      if (campo && !errores[campo]) errores[campo] = problema.message;
    }
    return { estado: 'error', mensaje: 'Revisá los datos marcados.', errores, valores };
  }

  // La IP no se guarda: se guarda un resumen irreversible, que alcanza para
  // contar envíos de la misma conexión sin conservar el dato personal.
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const ipHash = ip
    ? createHash('sha256')
        .update(`${process.env.CONSULTAS_SAL ?? 'valtus'}:${ip}`)
        .digest('hex')
    : null;

  const consulta = {
    nombre: resultado.data.nombre,
    empresa: resultado.data.empresa || null,
    telefono: resultado.data.telefono || null,
    email: resultado.data.email || null,
    mensaje: resultado.data.mensaje,
    ipHash,
  };

  if (!baseConfigurada()) {
    // En la computadora, sin Supabase todavía, se simula el envío para poder
    // probar la pantalla. En producción nunca se finge que se recibió.
    if (process.env.NODE_ENV === 'development') {
      console.info('[consulta simulada: falta configurar Supabase]', consulta);
      return { estado: 'ok' };
    }
    return {
      estado: 'error',
      mensaje: 'No pudimos recibir tu consulta. Escribinos por mail y te respondemos enseguida.',
      valores,
    };
  }

  if (ipHash && (await consultasRecientes(ipHash)) >= MAXIMO_POR_CONEXION) {
    return {
      estado: 'error',
      mensaje: 'Recibimos varias consultas seguidas desde tu conexión. Escribinos por mail.',
      valores,
    };
  }

  try {
    await guardarConsulta(consulta);
  } catch (e) {
    console.error(e);
    return {
      estado: 'error',
      mensaje: 'No pudimos guardar tu consulta. Probá de nuevo o escribinos por mail.',
      valores,
    };
  }

  return { estado: 'ok' };
}
