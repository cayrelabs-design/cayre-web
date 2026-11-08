// Todos los textos de la web viven acá: se corrigen sin tocar el diseño.
//
// Reglas de esta web, acordadas entre los socios:
//
//  · Las tres empresas se nombran CON AUTORIZACIÓN y no son clientes externos: los socios
//    son quienes las operan. Se dice así, porque es la verdad y además vende más que
//    "confían en nosotros". No se agrega ninguna empresa más sin pedir permiso.
//  · No se muestran caras ni nombres del equipo. Sí se puede decir "hablás con los socios".
//  · NO se publica: antigüedad de Cayre Labs, cantidad de clientes, testimonios,
//    porcentajes de mejora ni estadísticas. (Regla de honestidad del traspaso, §5.)
//  · De Cayre360 (antes CayreWMS) no se promete: Mercado Libre, WooCommerce,
//    facturación ARCA válida, producción, órdenes de compra,
//    funcionamiento sin señal, transportistas, ni app en Google Play o App Store.

import type { NombreIcono } from '@/components/Icono';

// TODO: cuando haya número, completar. Mientras sea null, los botones de
// WhatsApp no se muestran y el llamado a la acción lleva al formulario.
const whatsappNumero: string | null = null;

export const contacto = {
  email: 'hola@cayrelabs.com.ar',
  whatsappVisible: null as string | null,
  whatsappLink: whatsappNumero
    ? `https://wa.me/${whatsappNumero}?text=${encodeURIComponent('Hola, vi la web de Cayre Labs y quiero hacer una consulta.')}`
    : null,
  ubicacion: 'Buenos Aires, Argentina',
};

export const navegacion = [
  { href: '#punto-de-partida', etiqueta: 'El problema' },
  { href: '#metodo', etiqueta: 'Cómo trabajamos' },
  { href: '#productos', etiqueta: 'Qué hacemos' },
  { href: '#funciones', etiqueta: 'Funciones' },
  { href: '#experiencia', etiqueta: 'Experiencia' },
  { href: '#marketing', etiqueta: 'Marketing' },
  { href: '#por-que', etiqueta: 'Por qué Cayre' },
];

export const portada = {
  etiqueta: 'E-commerce, sistemas y marketing',
  titulo: 'El sistema, la tienda y la pauta. Un solo equipo.',
  bajada:
    'Desarrollamos tu tienda online y tu sistema de gestión, y hacemos el marketing que los llena de ventas.',
  ctaPrincipal: 'Pedí tu diagnóstico de 30 minutos',
  ctaSecundario: 'Ver lo que hacemos',
  // No es una franja de logos de clientes: es la prueba de que el software se usa
  // todos los días en operaciones reales, por la gente que lo construyó.
  clientesTitulo: 'Nuestros sistemas operan todos los días en',
  clientes: ['Porcenot', 'Bodysculpt', 'Ibérico Mayorista'],
  clientesPie: 'No son casos de estudio: son empresas que operamos.',
};

/**
 * El antes y después, contado por quienes lo vivieron adentro de las operaciones
 * que manejan. Cada dolor va emparejado con lo que lo resolvió: así se lee como
 * un cambio y no como dos listas sueltas.
 *
 * Sin porcentajes ni estadísticas (regla de honestidad del traspaso, §5).
 */
export const puntoDePartida = {
  etiqueta: '01 — El punto de partida',
  titulo: 'Todas las empresas que ordenamos empezaron igual.',
  texto:
    'Planillas que entendían dos o tres personas. Las pérdidas estaban, pero nadie las podía encontrar.',
  pares: [
    {
      antes: 'Miles de planillas que solo entendían unos pocos',
      despues: 'Un solo sistema, y cada dato cargado una sola vez',
    },
    {
      antes: 'Varios canales de venta peleando por el mismo stock',
      despues: 'Una sola verdad de stock, con QR y código de barras en cada movimiento',
    },
    {
      antes: 'Horas de administración que podían automatizarse',
      despues: 'Facturación automática y la logística como un proceso, no como un apuro',
    },
    {
      antes: 'Cierres de caja que nunca daban: siempre sobraba o faltaba plata',
      despues: 'Caja cuadrada al cierre, con cada movimiento registrado y con autor',
    },
    {
      antes: 'Nadie sabía qué se pagó ni cuándo',
      despues: 'Flujo de caja a la vista y previsibilidad financiera',
    },
  ],
  cierre:
    'No cambiaron de rubro ni de gente. Cambió que la información dejó de estar partida en pedazos.',
};

// Las cuatro etapas son las aprobadas en el documento de traspaso (§4.2).
export const metodo = {
  etiqueta: '02 — Cómo trabajamos',
  lineas: [
    { destacado: 'Primero el proceso.', resto: '' },
    { previo: 'Después el ', destacado: 'software', resto: '.' },
  ],
  texto:
    'Un sistema arriba de un circuito roto acelera el problema. Por eso la auditoría viene antes que la licencia.',
  pasos: [
    {
      titulo: 'Relevamiento',
      texto:
        'Dos semanas adentro de tu operación, mirando el circuito real.',
      icono: 'chat' as NombreIcono,
    },
    {
      titulo: 'Propuesta cerrada',
      texto: 'Alcance, cronograma y precio por escrito. Lo que queda afuera, también.',
      icono: 'documento' as NombreIcono,
    },
    {
      titulo: 'Puesta en marcha',
      texto:
        'Por etapas, arrancando por el módulo que más duele. La operación no se frena.',
      icono: 'cohete' as NombreIcono,
    },
    {
      titulo: 'Acompañamiento',
      texto: 'Capacitación, documentación y soporte.',
      icono: 'usuarios' as NombreIcono,
    },
  ],
};

/**
 * La puerta de entrada comercial. Seis productos marean a un dueño de pyme: la
 * venta entra por acá y adentro se decide qué módulo.
 */
export const diagnostico = {
  etiqueta: 'Por dónde se empieza',
  titulo: 'Un diagnóstico de 30 minutos, sin costo.',
  texto:
    'Salís con un diagnóstico de tu operación y por dónde empezar, nos contrates o no.',
  items: [
    'Miramos tu circuito real: cómo vendés, cómo cobrás y qué usás hoy',
    'Te decimos qué se puede automatizar y qué conviene dejar como está',
    'Si hace falta un sistema, te decimos cuál y por qué. Si no hace falta, también',
  ],
  cta: 'Pedí tu diagnóstico',
};

export const funciones: {
  etiqueta: string;
  titulo: string;
  texto: string;
  items: { nombre: string; texto: string; icono: NombreIcono }[];
  rubroTitulo: string;
  rubros: string[];
} = {
  etiqueta: '05 — Funciones principales',
  titulo: 'La base que toda empresa necesita, lista desde el primer día.',
  texto:
    'Vienen en todos los sistemas que hacemos.',
  items: [
    { nombre: 'Gestión contable', texto: 'Libro IVA, ingresos y egresos, listo para tu contador.', icono: 'calculadora' },
    { nombre: 'Facturación electrónica', texto: 'ARCA directo, con tu propio certificado.', icono: 'documento' },
    { nombre: 'Stock', texto: 'Varios depósitos, ajustes y transferencias.', icono: 'caja' },
    { nombre: 'Ventas y punto de venta', texto: 'Pedidos, cambios y caja por local.', icono: 'recibo' },
    { nombre: 'Clientes y cuentas corrientes', texto: 'Saldos al día y antigüedad de la deuda.', icono: 'usuarios' },
    { nombre: 'Cobranzas', texto: 'Cada cobro imputado al pedido que paga.', icono: 'billetera' },
    { nombre: 'Caja, bancos y cheques', texto: 'Cierre diario y cheques de punta a punta.', icono: 'banco' },
    { nombre: 'Compras y proveedores', texto: 'Órdenes de compra, recepciones y pagos.', icono: 'carrito' },
    { nombre: 'Listas de precios', texto: 'Por tipo de cliente y por canal de venta.', icono: 'etiqueta' },
    { nombre: 'Usuarios y permisos', texto: 'Cada uno ve lo suyo, y queda registro de todo.', icono: 'candado' },
    { nombre: 'Reportes y tablero', texto: 'Ventas, márgenes y deuda, de un vistazo.', icono: 'grafico' },
    { nombre: 'Importación de datos', texto: 'Tu catálogo y tus clientes desde Excel o tu sistema actual.', icono: 'subir' },
  ],
  rubroTitulo: 'Y sobre esa base, lo propio de tu rubro',
  rubros: [
    'Talle y color',
    'Venta por kilo y balanza',
    'Producción y materia prima',
    'Importación y comercio exterior',
    'Portal mayorista',
    'Lotes y vencimientos',
    'Envíos y seguimiento',
  ],
};

export const escala = {
  etiqueta: '06 — A tu medida',
  titulo: 'Desde lo simple hasta un sistema 360.',
  texto:
    'Arrancás con lo que más te duele y el sistema crece con tu empresa, sin cambiar de proveedor ni perder tus datos.',
  niveles: [
    {
      etiqueta: 'Inicial',
      titulo: 'Un circuito resuelto',
      items: ['Ventas, stock y caja', 'Un canal de venta', 'Facturación electrónica'],
    },
    {
      etiqueta: 'Integral',
      titulo: 'Toda la operación',
      items: [
        'Varios canales de venta',
        'Tienda online propia',
        'Cobranzas y tesorería',
        'Compras y proveedores',
        'Reportes de rentabilidad',
      ],
    },
    {
      etiqueta: '360',
      titulo: 'La empresa entera, conectada',
      items: [
        'Ventas en todos los canales',
        'CRM con WhatsApp e Instagram',
        'Producción y materia prima',
        'Comercio exterior',
        'Logística y envíos',
        'Conciliación bancaria',
        'Pauta conectada a las ventas',
      ],
    },
  ],
  integracionesTitulo: 'Se conecta con lo que ya usás',
  integraciones: [
    'ARCA',
    'Mercado Pago',
    'Mercado Libre',
    'Tiendanube',
    'WhatsApp',
    'Meta Ads',
    'Google Ads',
    'Correo Argentino',
    'Tu banco',
  ],
};

export const experiencia: {
  etiqueta: string;
  titulo: string;
  texto: string;
  casos: { cliente: string; rubro: string; desafio: string; items: string[]; icono: NombreIcono }[];
  cierre: { titulo: string; texto: string };
} = {
  etiqueta: '07 — Experiencia',
  titulo: 'Sistemas que están funcionando hoy.',
  texto:
    'Tres operaciones distintas, con problemas que no se parecen en nada.',
  casos: [
    {
      cliente: 'Porcenot',
      rubro: 'Fábrica e importadora de revestimientos',
      // Lo distintivo: cada venta compromete producción, materia prima o un contenedor.
      desafio:
        'Cada venta compromete una producción, una materia prima o un contenedor que todavía está en camino.',
      items: [
        'Fecha de entrega real, atada a la compra de materia prima.',
        'El vendedor atiende, cotiza y cierra sin cambiar de pantalla.',
        'Comercio exterior adentro: costo del contenedor y preventa antes de que llegue.',
        'Tienda con calculadora de materiales y simulación de la obra terminada.',
        'Lo que el CRM aprende vuelve a la pauta.',
      ],
      icono: 'fabrica',
    },
    {
      cliente: 'Bodysculpt',
      rubro: 'Indumentaria',
      // Lo distintivo: la escala. 170.000 es un dato de su operación, no una mejora.
      desafio:
        'Ciento setenta mil productos entre talles y colores. Lo que no se encuentra, no se vende.',
      items: [
        'Cada talle y cada color con su lugar exacto en el estante.',
        'Preparación guiada por escáner, sin errores de talle.',
        'Portal donde cada mayorista arma su pedido y lo sigue en tiempo real.',
        'Una sola verdad de stock para el local, la tienda y el mayorista.',
      ],
      icono: 'remera',
    },
    {
      cliente: 'Ibérico Mayorista',
      rubro: 'Distribución de alimentos',
      // Lo distintivo: cada comercio pide distinto, y la administración necesita cerrar el día.
      desafio:
        'Cada comercio pide distinto todos los días. Y la caja tiene que cerrar igual.',
      items: [
        'Tienda B2B donde cada comercio arma su propio pedido.',
        'De la nota de pedido al comprobante, sin pasos sueltos.',
        'Arqueo de cajas que deja a administración al día, no a fin de mes.',
      ],
      icono: 'camion',
    },
  ],
  cierre: {
    titulo: '¿Tu rubro no está en la lista?',
    texto: 'Escuchamos el problema y lo resolvemos igual.',
  },
};

export const marketing = {
  etiqueta: '08 — Marketing digital',
  titulo: 'El sistema ordena la operación.',
  tituloDestacado: 'El marketing la llena de ventas.',
  texto:
    'Para empresas que ya tienen algo bueno para vender y necesitan que se note. Con o sin sistema.',
  paraQuienTitulo: 'Para quién es',
  paraQuien: [
    {
      titulo: 'Vendés bien pero nadie te conoce',
      texto: 'Buen producto y buena atención, pero el que no te conoce no llega nunca.',
    },
    {
      titulo: 'Invertís en pauta a ciegas',
      texto: 'Pagás campañas todos los meses y nadie te sabe decir cuánto volvió en ventas.',
    },
    {
      titulo: 'Tenés tienda y no vende',
      texto: 'Entra gente, mira y se va. El problema puede ser el tráfico o puede ser la tienda.',
    },
  ],
  pilaresTitulo: 'Qué hacemos',
  pilares: [
    {
      titulo: 'Estrategia y campañas',
      texto: 'Meta y Google Ads con un plan detrás, no publicaciones sueltas a ver qué pasa.',
    },
    {
      titulo: 'Contenido y marca',
      texto: 'Identidad, fotos, piezas y redes, con una voz consistente en todos lados.',
    },
    {
      titulo: 'Medición contra la venta real',
      texto: 'Un panel que cruza lo invertido con lo facturado y con el margen, no con los clics.',
    },
  ],
  combinado: {
    titulo: 'Tienda + Marketing',
    texto:
      'Una tienda sin tráfico no vende. Tráfico sobre una tienda que no convierte es plata tirada. Las dos las hacemos nosotros: nadie se puede echar la culpa.',
  },
  cta: 'Consultar por marketing',
};

export const porQue = {
  etiqueta: '09 — Por qué Cayre',
  titulo: 'Lo que nos hace distintos.',
  texto: 'Diez compromisos que van por escrito en cada propuesta.',
  compromisos: [
    {
      titulo: 'Hablás con los socios, no con una mesa de ayuda',
      texto: 'El que releva tu proceso es el mismo que después atiende el teléfono.',
    },
    {
      titulo: 'Primero el proceso, después el software',
      texto:
        'Ordenamos el circuito antes de automatizarlo. Al revés, solo se acelera el problema.',
    },
    {
      titulo: 'Escala pyme, criterio de sistemas grandes',
      texto:
        'Trazabilidad, permisos y control de cambios, en presupuestos de pyme.',
    },
    {
      titulo: 'Hacemos el software, no lo revendemos',
      texto:
        'Si te falta una función, se agrega. No depende de un proveedor del exterior.',
    },
    {
      titulo: 'Lo usamos nosotros primero',
      texto:
        'Nacieron adentro de operaciones que manejamos todos los días.',
    },
    {
      titulo: 'Abono fijo',
      texto: 'No sube por usuarios, por facturas ni por canales cuando crecés.',
    },
    {
      titulo: 'Sin permanencia mínima',
      texto: 'Si un día te vas, te llevás tus datos completos.',
    },
    {
      titulo: 'Traemos tu historial',
      texto: 'Clientes, pedidos, saldos y cuentas corrientes: no arrancás de cero.',
    },
    {
      titulo: 'Soporte con tiempos escritos',
      texto: 'Respuesta en menos de 4 horas hábiles, por WhatsApp o mail.',
    },
    {
      titulo: 'Revisión de seguridad',
      texto: 'Antes de cada entrega revisamos permisos y accesos, y queda documentado.',
    },
  ],
  abonoTitulo: 'Qué incluye el abono',
  abono: [
    'Servidores y copias de seguridad diarias',
    'Soporte por WhatsApp y mail',
    'Actualizaciones y correcciones',
    'Horas mensuales para mejoras',
  ],
};

export const contactoSeccion = {
  titulo: '¿Hablamos?',
  texto: 'Contanos qué te está costando hoy. En 30 minutos vemos si te podemos ayudar.',
  formularioTitulo: 'Dejanos tu consulta',
  formularioTexto: 'Te respondemos en menos de 4 horas hábiles.',
};

export const pie = {
  bajada: 'E-commerce, sistemas de gestión y marketing digital',
};
