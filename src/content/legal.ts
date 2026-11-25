// Los textos legales del sitio.
//
// ⚠️ Desde el 25/11/2026 las tres páginas legales tienen DOS partes:
//
//   1. El texto de la plataforma (app.valtus.com.ar), que va primero y entero.
//      No está en este archivo: sale de src/content/legal-plataforma.ts, que se
//      genera de las páginas originales. Son las direcciones que Meta tiene
//      cargadas para esa aplicación, y tienen que seguir diciendo lo mismo.
//   2. Lo propio de ESTE sitio (el formulario de contacto), que va debajo. Eso
//      es lo que se escribe acá, y `delSitio` (al final) elige qué apartados
//      se muestran en cada página.
//
// Los apartados que `delSitio` no elige no se publican: quedaron de cuando
// estas páginas hablaban solo del sitio, y repetirían lo que ya dice el texto
// de la plataforma (quién responde, tus derechos, la ley aplicable).
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
export const actualizado = '25 de noviembre de 2026';

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

/**
 * Cómo pedir que se borren los datos.
 *
 * Existe como página aparte (y no solo como un párrafo de la política de
 * privacidad) por dos motivos:
 *  · es lo que busca alguien que quiere irse, y tiene que encontrarlo solo;
 *  · la dirección /eliminacion-de-datos ya existía en valtus.com.ar antes de
 *    que esta web ocupara el dominio (noviembre de 2026), y puede estar
 *    cargada en plataformas de terceros. No cambiarle la dirección.
 *
 * ⚠️ Habla de los datos de ESTA web (el formulario de contacto) y de los
 * sistemas que se contratan. Si algún día una aplicación de Valtus se conecta
 * con Meta, Google u otra plataforma, esas plataformas exigen que esta página
 * diga qué se borra de lo que se obtuvo de ellas: hay que ampliarla antes.
 */
export const eliminacion: { titulo: string; bajada: string; apartados: Apartado[] } = {
  titulo: 'Eliminación de datos',
  bajada: 'Cómo pedir que borremos tus datos, qué se borra y en cuánto tiempo.',
  apartados: [
    {
      titulo: 'Cómo pedirlo',
      parrafos: [
        `Escribinos a ${responsable.email} y decinos que querés que borremos tus datos. Para ubicar tu consulta alcanza con que nos pases el mail o el teléfono que dejaste en el formulario. No hace falta que expliques el motivo.`,
      ],
    },
    {
      titulo: 'Qué se borra',
      parrafos: ['Todo lo que guardamos de tu consulta:'],
      lista: [
        'Tu nombre, tu teléfono o tu mail, y el nombre de tu empresa.',
        'El mensaje que nos escribiste.',
        'Las anotaciones internas que hayamos hecho sobre esa consulta.',
        'El resumen irreversible de tu conexión que se guarda para frenar envíos automáticos.',
      ],
    },
    {
      titulo: 'En cuánto tiempo',
      parrafos: [
        'Dentro de los cinco días hábiles de recibido tu pedido, que es el plazo que fija la Ley Nº 25.326. Te avisamos cuando esté hecho.',
        'Si más adelante nos volvés a escribir, es una consulta nueva: de la anterior no queda nada.',
      ],
    },
    {
      titulo: 'Si usás uno de nuestros sistemas',
      parrafos: [
        'Los datos que tu empresa carga en un sistema de Valtus son de tu empresa. Podés pedir que te los entreguemos completos y que los eliminemos escribiendo al mismo mail; los plazos y la forma son los que figuran en tu propuesta.',
      ],
    },
    {
      titulo: 'Más información',
      parrafos: ['Qué datos pedimos y para qué los usamos está en la Política de privacidad.'],
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
        'Los sistemas evolucionan: sus funciones pueden cambiar con el tiempo. Las que valen para vos son las que figuran en tu propuesta.',
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

// ── Qué se muestra de este sitio en cada página ──────────────────────────────

/** Busca los apartados por título. Si alguien renombra uno, falla acá y no en silencio. */
function elegir(apartados: Apartado[], titulos: string[]): Apartado[] {
  return titulos.map((titulo) => {
    const apartado = apartados.find((a) => a.titulo === titulo);
    if (!apartado) throw new Error(`legal.ts: no existe el apartado "${titulo}"`);
    return apartado;
  });
}

export type BloqueDelSitio = { titulo: string; bajada: string; apartados: Apartado[] };

export const delSitio: Record<'privacidad' | 'terminos' | 'eliminacion', BloqueDelSitio> = {
  privacidad: {
    titulo: 'El formulario de contacto de este sitio',
    bajada:
      'Además de la plataforma, este sitio tiene un formulario para pedirnos una consulta. Esto es lo que pasa con lo que cargás ahí.',
    apartados: elegir(privacidad.apartados, [
      'Qué datos te pedimos',
      'Qué no guardamos',
      'Para qué los usamos',
      'Dónde se guardan',
      'Cuánto tiempo',
    ]),
  },
  terminos: {
    titulo: 'Sobre este sitio web',
    bajada:
      'Lo de arriba regula el uso de la plataforma. Esto vale para el sitio institucional, que cuenta qué hacemos y te deja pedirnos una consulta.',
    apartados: elegir(terminos.apartados, [
      'Qué es este sitio',
      'Lo que dice el sitio no es una oferta cerrada',
      'Contenido y marcas',
      'Uso correcto',
      'Disponibilidad',
    ]),
  },
  eliminacion: {
    titulo: 'Si nos escribiste por el formulario de este sitio',
    bajada:
      'Lo de arriba es para quienes usan la plataforma. Si lo que querés borrar es una consulta que dejaste en el formulario de contacto, es así.',
    apartados: elegir(eliminacion.apartados, [
      'Cómo pedirlo',
      'Qué se borra',
      'En cuánto tiempo',
      'Si usás uno de nuestros sistemas',
    ]),
  },
};
