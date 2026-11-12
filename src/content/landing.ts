// Todos los textos de la web viven acá: se corrigen sin tocar el diseño.
//
// Reglas de esta web, acordadas entre los socios:
//
//  · Las empresas se nombran y se muestran con su logo CON AUTORIZACIÓN. Son
//    cinco: Porcenot, Bodysculpt, Ibérico, Shato y Tussy.
//    No se agrega ninguna empresa más sin pedir permiso.
//  · Grupo Marquez NO va todavía (decisión del dueño, 12/11/2026): hay una
//    propuesta presentada y el acuerdo no está firmado. Mostrarlo bajo "trabajan
//    con nuestros sistemas" antes de la firma sería decir algo que aún no es
//    cierto, justo delante de quien lo está decidiendo. Su logo quedó listo en
//    public/logos/clientes/grupo-marquez.png: el día que firmen, se agrega el
//    nombre a `portada.clientes` y aparece solo.
//  · No se muestran caras ni nombres del equipo. Sí se puede decir "hablás con los socios".
//  · NO se publica: antigüedad de Valtus, cantidad de clientes, testimonios,
//    porcentajes de mejora ni estadísticas. (Regla de honestidad del traspaso, §5.)
//  · De Valtus360 (antes CayreWMS) no se promete: Mercado Libre, WooCommerce,
//    facturación ARCA válida, producción, órdenes de compra,
//    funcionamiento sin señal, transportistas, ni app en Google Play o App Store.

import type { NombreIcono } from '@/components/Icono';

// ── WhatsApp ────────────────────────────────────────────────────────────────
// Poné el número acá y WhatsApp aparece solo en la portada, en la sección de
// contacto y en el menú del teléfono. Mientras sea null no se muestra en
// ningún lado, y el único camino es el formulario.
//
// Formato internacional, sin "+" ni espacios ni guiones: 5491122334455.
const whatsappNumero: string | null = null;
// Cómo se lee en pantalla. Si queda null se muestra el número tal cual.
const whatsappComoSeLee: string | null = null;

export const contacto = {
  email: 'hola@valtus.com.ar',
  whatsappVisible: whatsappNumero ? (whatsappComoSeLee ?? whatsappNumero) : null,
  whatsappLink: whatsappNumero
    ? `https://wa.me/${whatsappNumero}?text=${encodeURIComponent('Hola, vi la web de Valtus y quiero hacer una consulta.')}`
    : null,
  ubicacion: 'Buenos Aires, Argentina',
};

export const navegacion = [
  { href: '/#punto-de-partida', etiqueta: 'El problema' },
  { href: '/#metodo', etiqueta: 'Cómo trabajamos' },
  { href: '/#productos', etiqueta: 'Qué hacemos' },
  { href: '/#proyectos', etiqueta: 'Proyectos integrales' },
  { href: '/#experiencia', etiqueta: 'Experiencia' },
  { href: '/#por-que', etiqueta: 'Por qué Valtus' },
];

// La portada dice QUIÉNES SON antes que qué venden (decisión del dueño,
// 12/11/2026). Antes abría con "El sistema, la tienda y la pauta": tres cosas
// que se entregan, lo mismo que promete cualquier proveedor. Lo que distingue a
// Valtus es que son gerentes de operación que además hacen el software, y eso
// es lo que tiene que quedar si el visitante lee una sola frase.
//
// El titular termina con una frase corta porque la portada resalta la última.
export const portada = {
  etiqueta: 'Gerentes de operación · Sistemas propios',
  titulo: 'Ordenamos empresas desde adentro. Con sistemas propios.',
  bajada:
    'Somos un equipo de gerentes: entramos a tu operación, encontramos dónde se pierden ventas y rentabilidad, y lo resolvemos con sistemas que desarrollamos nosotros.',
  ctaPrincipal: 'Pedí tu diagnóstico de 30 minutos',
  ctaSecundario: 'Ver lo que hacemos',
  // La prueba de que el software se usa. El orden es el de la franja de logos.
  // Los tres primeros tienen además su caso contado en la sección Experiencia.
  clientesTitulo: 'Trabajan con nuestros sistemas',
  clientes: ['Porcenot', 'Bodysculpt', 'Ibérico Mayorista', 'Shato', 'Tussy'],
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
    'Miramos cómo vendés, cómo cobrás y qué usás hoy. Salís sabiendo por dónde empezar, nos contrates o no. Y si no te hace falta un sistema, también te lo decimos.',
  cta: 'Pedí tu diagnóstico',

  // ── La hoja de hallazgos ──────────────────────────────────────────────────
  // Muestra cómo mira Valtus una operación: no una lista de funciones, sino lo
  // que se encuentra y lo que cuesta.
  //
  // ⚠️ Son EJEMPLOS GENÉRICOS, del tipo de cosa que aparece en cualquier
  // relevamiento. No son datos de ningún cliente, y así lo dice la sección.
  // No reemplazarlos por hallazgos reales de una empresa sin su autorización
  // expresa: lo que se encuentra adentro de un cliente es del cliente.
  //
  // Sin cifras, por la regla de honestidad. Van seis áreas distintas a
  // propósito: el argumento es que se mira la operación entera, no la tienda.
  hallazgosTitulo: 'Lo que suele aparecer',
  hallazgosNota: 'Ejemplos del tipo de hallazgo de un relevamiento. No son datos de ningún cliente.',
  hallazgos: [
    {
      area: 'Tienda',
      vimos: 'El costo de envío aparece recién en el último paso.',
      cuesta: 'Carritos abandonados a un clic de pagar.',
    },
    {
      area: 'Atención',
      vimos: 'Las consultas de la noche se responden al otro día.',
      cuesta: 'Clientes que a la mañana ya compraron en otro lado.',
    },
    {
      area: 'Stock',
      vimos: 'El local y la tienda venden el mismo producto.',
      cuesta: 'Pedidos cancelados y clientes que no vuelven.',
    },
    {
      area: 'Administración',
      vimos: 'El mismo pedido se carga a mano en tres lugares.',
      cuesta: 'Horas de trabajo y un error distinto en cada copia.',
    },
    {
      area: 'Pauta',
      vimos: 'La publicidad se mide por clics, no por ventas cerradas.',
      cuesta: 'Plata puesta en campañas que no venden.',
    },
    {
      area: 'Caja',
      vimos: 'El cierre del día nunca coincide con el sistema.',
      cuesta: 'Diferencias que nadie puede explicar.',
    },
  ],
};

/**
 * ValtusCorp: los proyectos integrales.
 *
 * Es la línea donde Valtus se hace cargo de una operación entera, no de un
 * sistema. Hasta el 12/11/2026 era una tarjeta chica que decía "desarrollos a
 * medida", y eso mostraba a la empresa bastante más chica de lo que es: por
 * eso tiene sección propia.
 *
 * Reglas de este bloque:
 *  · Describe CÓMO es un proyecto integral, no promete un resultado. Sin
 *    porcentajes ni metas de venta: eso va en la propuesta de cada cliente.
 *  · No dice cómo se cobra. Cada proyecto Corp tiene condiciones propias, que
 *    no son las de los sistemas (el "abono fijo" vale para los sistemas).
 *  · No nombra a ningún cliente.
 */
export const proyectos: {
  etiqueta: string;
  titulo: string;
  texto: string;
  abarcaTitulo: string;
  abarca: string[];
  etapas: { titulo: string; texto: string; icono: NombreIcono }[];
  regla: string;
  modalidadTitulo: string;
  modalidad: string[];
  condiciones: string;
  cta: string;
} = {
  etiqueta: '04 — ValtusCorp · Proyectos integrales',
  titulo: 'Cuando el proyecto es la operación entera.',
  texto:
    'Hay empresas a las que no les falta un sistema: les falta que alguien mire todo junto. Ahí entramos con un equipo de gerentes y nos hacemos cargo, área por área.',
  abarcaTitulo: 'Qué puede abarcar',
  abarca: [
    'Sistemas',
    'Procesos',
    'Área comercial',
    'Atención y posventa',
    'Inteligencia artificial',
    'Pauta publicitaria',
    'Convenios de cobro y logística',
    'Compras',
    'Red de sucursales',
  ],
  etapas: [
    {
      titulo: 'Relevamiento interno',
      texto: 'En persona y área por área. Queda escrito quién hace qué y dónde se pierde.',
      icono: 'chat',
    },
    {
      titulo: 'Herramientas',
      texto: 'CRM con inteligencia artificial, tablero en vivo, tienda, precios y catálogo.',
      icono: 'grilla',
    },
    {
      titulo: 'Red comercial',
      texto: 'Sucursales, convenios de cobro y de logística, y compras.',
      icono: 'usuarios',
    },
    {
      titulo: 'Sistema propio',
      texto: 'Una plataforma a medida que conecta toda la estructura.',
      icono: 'codigo',
    },
  ],
  regla: 'Cada etapa cierra con resultados concretos antes de abrir la siguiente.',
  modalidadTitulo: 'Cómo se trabaja',
  modalidad: [
    'Gerentes de sistemas, comercial e inteligencia artificial',
    'Trabajo presencial, con cada área',
    'Reunión semanal con la dirección',
    'Reporte semanal y tablero en vivo',
  ],
  condiciones: 'Cada proyecto integral tiene su alcance y sus condiciones, escritos en su propuesta.',
  cta: 'Contanos tu operación',
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

/**
 * Las plataformas con las que el sistema se conecta. Antes vivian adentro de
 * la seccion "A tu medida", que se saco porque repetia el argumento de
 * ValtusPOS -> Valtus360 y porque su tercer nivel se llamaba "360", igual que
 * el producto.
 */
export const integraciones = {
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
  etiqueta: '06 — Experiencia',
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

export const porQue = {
  etiqueta: '07 — Por qué Valtus',
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
      // Decía "escala pyme... en presupuestos de pyme". Se cambió el 12/11/2026:
      // Valtus también toma operaciones grandes, y esa frase los achicaba.
      titulo: 'Criterio de sistemas grandes, a tu escala',
      texto:
        'Trazabilidad, permisos y control de cambios, tengas un local o una red de sucursales.',
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
      // "En los sistemas" a propósito: los proyectos integrales (ValtusCorp)
      // tienen condiciones propias. Sin esa aclaración, un cliente Corp lee acá
      // lo contrario de lo que dice su propuesta.
      titulo: 'Abono fijo en los sistemas',
      texto:
        'No sube por usuarios, por facturas ni por canales cuando crecés. Los proyectos integrales tienen condiciones propias, escritas en su propuesta.',
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
