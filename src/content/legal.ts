// Los textos legales del sitio.
//
// ⚠️ Los escribió el equipo de desarrollo describiendo lo que el sitio hace de
// verdad (qué datos pide, dónde los guarda, para qué). NO reemplazan la
// revisión de un abogado: antes de salir a producción conviene que alguien
// matriculado los lea.
//
// ⚠️ PENDIENTE — completar `responsable`: razón social y CUIT de quien responde
// por los datos. Mientras estén en null no se muestran, y la política nombra
// solo a "Valtus" con su mail de contacto.

import { contacto } from './landing';

export const responsable = {
  nombre: 'Valtus',
  razonSocial: null as string | null,
  cuit: null as string | null,
  domicilio: contacto.ubicacion,
  email: contacto.email,
};

/** Se cambia a mano cada vez que cambia el texto: es parte de lo que se informa. */
export const actualizado = '12 de noviembre de 2026';

export type Apartado = {
  titulo: string;
  parrafos?: string[];
  lista?: string[];
};

export const privacidad: { titulo: string; bajada: string; apartados: Apartado[] } = {
  titulo: 'Política de privacidad',
  bajada:
    'Qué datos te pedimos, para qué los usamos y cómo pedir que los corrijamos o los borremos. En castellano y sin letra chica.',
  apartados: [
    {
      titulo: 'Quién responde por tus datos',
      parrafos: [
        `${responsable.nombre}, con domicilio en ${responsable.domicilio}. Para cualquier cosa relacionada con tus datos escribinos a ${responsable.email}.`,
      ],
    },
    {
      titulo: 'Qué datos te pedimos',
      parrafos: ['Solo los que cargás vos en el formulario de contacto:'],
      lista: [
        'Tu nombre.',
        'Un teléfono o un mail, el que prefieras: con uno alcanza para responderte.',
        'El nombre de tu empresa, si lo querés dejar: es opcional.',
        'Lo que nos escribas en el mensaje.',
      ],
    },
    {
      titulo: 'Qué no guardamos',
      lista: [
        'No guardamos tu dirección IP. Para frenar envíos automáticos guardamos un resumen irreversible de esa dirección: sirve para contar cuántas consultas llegaron desde una misma conexión, y no permite reconstruirla.',
        'No usamos cookies de seguimiento ni herramientas de analítica. Si eso cambia, esta página se actualiza antes.',
        'No pedimos ni guardamos datos de pago, documentos ni contraseñas.',
      ],
    },
    {
      titulo: 'Para qué los usamos',
      parrafos: [
        'Para responder tu consulta y, si querés, coordinar el diagnóstico. Nada más.',
        'No los vendemos, no los cedemos y no los usamos para mandarte publicidad que no pediste.',
      ],
    },
    {
      titulo: 'Dónde se guardan',
      parrafos: [
        'En una base de datos a la que solo accede nuestro equipo. El sitio y la base funcionan sobre servicios de infraestructura (Vercel y Supabase) cuyos servidores pueden estar fuera de la Argentina; esos proveedores almacenan los datos por cuenta nuestra y no los usan para otra cosa.',
      ],
    },
    {
      titulo: 'Cuánto tiempo',
      parrafos: [
        'Mientras dure la conversación que abriste con tu consulta. Después los conservamos hasta que nos pidas que los borremos, cosa que podés hacer en cualquier momento.',
      ],
    },
    {
      titulo: 'Tus derechos',
      parrafos: [
        `Podés pedirnos ver, corregir, actualizar o borrar tus datos escribiendo a ${responsable.email}. Te respondemos dentro de los plazos que fija la ley.`,
        'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley Nº 25.326.',
        'La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
      ],
    },
    {
      titulo: 'Cambios',
      parrafos: [
        'Si cambia qué datos pedimos o para qué los usamos, se actualiza esta página y la fecha de arriba.',
      ],
    },
  ],
};

export const terminos: { titulo: string; bajada: string; apartados: Apartado[] } = {
  titulo: 'Términos de uso',
  bajada: 'Las reglas de este sitio, cortas y en castellano.',
  apartados: [
    {
      titulo: 'Qué es este sitio',
      parrafos: [
        `Es la página institucional de ${responsable.nombre}. Cuenta qué hacemos y te deja pedirnos una consulta. Usarlo es gratis y no hace falta registrarse.`,
      ],
    },
    {
      titulo: 'Lo que dice el sitio no es una oferta cerrada',
      parrafos: [
        'La descripción de cada sistema y servicio es informativa. Lo que efectivamente se contrata —alcance, plazos y precio— es lo que queda por escrito en la propuesta que te mandamos, y nada más que eso.',
        'Algunas líneas figuran como "en desarrollo" o "primeros clientes": todavía no se contratan de forma general, y sus funciones pueden cambiar antes de salir.',
        'El diagnóstico de 30 minutos es sin costo y no te obliga a contratar nada.',
      ],
    },
    {
      titulo: 'Contenido y marcas',
      parrafos: [
        `Los textos, el diseño y el código de este sitio son de ${responsable.nombre}.`,
        'Los nombres y logos de otras empresas y plataformas pertenecen a sus dueños. Aparecen solo para identificar a las empresas que usan nuestros sistemas y a las plataformas con las que se conectan; no significan patrocinio ni sociedad con ellas.',
      ],
    },
    {
      titulo: 'Uso correcto',
      parrafos: [
        'Te pedimos que no uses el formulario para mandar publicidad ni envíos automáticos, y que no intentes acceder a partes del sitio que no son públicas. El formulario tiene límites para frenar el abuso.',
      ],
    },
    {
      titulo: 'Disponibilidad',
      parrafos: [
        'Hacemos lo posible para que el sitio esté siempre disponible y sin errores, pero puede tener interrupciones por mantenimiento o por causas que no dependen de nosotros.',
      ],
    },
    {
      titulo: 'Tus datos',
      parrafos: ['Qué datos pedimos y qué hacemos con ellos está en la Política de privacidad.'],
    },
    {
      titulo: 'Ley aplicable y contacto',
      parrafos: [
        `Estos términos se rigen por las leyes de la República Argentina. Por cualquier duda, escribinos a ${responsable.email}.`,
      ],
    },
  ],
};
