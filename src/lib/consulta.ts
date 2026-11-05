import { z } from 'zod';

// Validación compartida: el servidor la aplica siempre, aunque el navegador ya
// haya validado. Lo que valida el navegador es comodidad; lo que vale es esto.
export const esquemaConsulta = z
  .object({
    nombre: z.string().trim().min(2, 'Contanos tu nombre.').max(120, 'Usá menos de 120 caracteres.'),
    empresa: z.string().trim().max(120, 'Usá menos de 120 caracteres.'),
    telefono: z
      .string()
      .trim()
      .max(40, 'Revisá el número.')
      .regex(/^[0-9+()\-\s]*$/, 'Usá solo números.'),
    email: z.union([z.literal(''), z.email('Revisá el email.').max(160)]),
    mensaje: z.string().trim().min(5, 'Contanos un poco más.').max(2000, 'Usá menos de 2000 caracteres.'),
  })
  .refine((d) => d.telefono !== '' || d.email !== '', {
    message: 'Dejanos un WhatsApp o un email para responderte.',
    path: ['telefono'],
  });

export type CampoConsulta = 'nombre' | 'empresa' | 'telefono' | 'email' | 'mensaje';

export type EstadoConsulta = {
  estado: 'inicial' | 'ok' | 'error';
  mensaje?: string;
  errores?: Partial<Record<CampoConsulta, string>>;
  // Se devuelven para que el formulario no se vacíe si hay que corregir algo.
  valores?: Partial<Record<CampoConsulta, string>>;
};

export const estadoInicial: EstadoConsulta = { estado: 'inicial' };
