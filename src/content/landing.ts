// Todos los textos de la web viven acá: se corrigen sin tocar el diseño.
//
// Dos reglas de esta web:
//  · Los tres clientes se nombran con autorización. No se agrega ninguno más sin pedirla.
//  · No se muestran caras ni nombres del equipo: la prueba son los clientes, no las fotos.

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
  { href: '#metodo', etiqueta: 'Cómo trabajamos' },
  { href: '#servicios', etiqueta: 'Servicios' },
  { href: '#funciones', etiqueta: 'Funciones' },
  { href: '#escala', etiqueta: 'A tu medida' },
  { href: '#experiencia', etiqueta: 'Experiencia' },
  { href: '#marketing', etiqueta: 'Marketing' },
  { href: '#por-que', etiqueta: 'Por qué Cayre' },
];

export const portada = {
  etiqueta: 'E-commerce, sistemas y marketing',
  titulo: 'El sistema, la tienda y la pauta. Un solo equipo.',
  bajada:
    'Desarrollamos plataformas de e-commerce y sistemas de gestión, y hacemos el marketing que los llena de ventas. Todo conectado, todo nuestro, todo medido contra tu facturación real.',
  ctaPrincipal: 'Contanos tu problema',
  ctaSecundario: 'Ver lo que hacemos',
  clientesTitulo: 'Confían en nosotros',
  clientes: ['Porcenot', 'Bodysculpt', 'Ibérico Mayorista'],
};

export const metodo = {
  etiqueta: '01 — Cómo trabajamos',
  lineas: [
    { destacado: 'Escuchamos', resto: ' el problema.' },
    { destacado: 'Creamos', resto: ' la solución.' },
    { previo: 'La ', destacado: 'implementamos', resto: '.' },
  ],
  texto:
    'Somos una empresa de tecnología. Construimos el sistema que ordena tu operación, la tienda que te vende de noche y las campañas que la llenan de gente. No tercerizamos ninguna de las tres.',
  pasos: [
    {
      titulo: 'Escuchamos',
      texto:
        'Diagnóstico de tu operación: cómo vendés, cómo cobrás, qué usás hoy y dónde se pierde tiempo o plata.',
      icono: 'chat' as NombreIcono,
    },
    {
      titulo: 'Creamos',
      texto:
        'Propuesta por escrito con alcance, etapas, fechas y precio. Después desarrollamos por etapas: primero lo que más duele.',
      icono: 'codigo' as NombreIcono,
    },
    {
      titulo: 'Implementamos',
      texto: 'Puesta en marcha con tu equipo, capacitación y acompañamiento con un abono mensual.',
      icono: 'cohete' as NombreIcono,
    },
  ],
};

export const servicios: {
  etiqueta: string;
  titulo: string;
  texto: string;
  items: { nombre: string; texto: string; icono: NombreIcono; destacado?: boolean }[];
} = {
  etiqueta: '02 — Lo que hacemos',
  titulo: 'Especialistas en tiendas online y en marketing que vende.',
  texto:
    'Cada venta, venga del local, de la tienda o de un vendedor, descuenta del mismo stock y queda atada a su cobranza. Y cada peso de pauta se mide contra esa venta, no contra un clic.',
  items: [
    {
      nombre: 'Plataformas de e-commerce',
      texto:
        'Tiendas minoristas y mayoristas desarrolladas a medida, conectadas al stock, a los precios por lista y a la cobranza. No instalamos plantillas: las construimos.',
      icono: 'bolsa',
      destacado: true,
    },
    {
      nombre: 'Marketing digital',
      texto:
        'Campañas en Meta y Google, contenido, marca y posicionamiento. Con un panel que las mide contra tus ventas reales y tu margen.',
      icono: 'objetivo',
      destacado: true,
    },
    {
      nombre: 'ERP',
      texto: 'Ventas, stock, compras, producción y administración en un solo sistema.',
      icono: 'grilla',
    },
    {
      nombre: 'CRM',
      texto: 'WhatsApp e Instagram en una bandeja compartida, con embudo de ventas y seguimiento.',
      icono: 'chat',
    },
    {
      nombre: 'WMS',
      texto: 'Depósito ordenado: ubicaciones, armado de pedidos por escaneo y despacho.',
      icono: 'deposito',
    },
    {
      nombre: 'Desarrollos a medida',
      texto: 'Lo que tu negocio hace distinto y ningún sistema de catálogo contempla.',
      icono: 'codigo',
    },
  ],
};

export const funciones: {
  etiqueta: string;
  titulo: string;
  texto: string;
  items: { nombre: string; texto: string; icono: NombreIcono }[];
  rubroTitulo: string;
  rubros: string[];
} = {
  etiqueta: '03 — Funciones principales',
  titulo: 'La base que toda empresa necesita, lista desde el primer día.',
  texto:
    'Vienen en todos los sistemas que hacemos. Sobre esa base construimos lo que hace distinto a tu negocio.',
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
  etiqueta: '04 — A tu medida',
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
  etiqueta: '05 — Experiencia',
  titulo: 'Sistemas que están funcionando hoy.',
  texto: 'Empresas reales, con nombre y apellido, operando todos los días sobre lo que construimos.',
  casos: [
    {
      cliente: 'Porcenot',
      rubro: 'Fábrica e importadora de revestimientos',
      desafio:
        'Vende al público, a mayoristas y a arquitectos, desde varios depósitos y por varios canales a la vez.',
      items: [
        'Sistema de gestión completo, de la compra al cobro.',
        'Tienda minorista propia, conectada al mismo stock.',
        'CRM con WhatsApp para todo el equipo comercial.',
      ],
      icono: 'fabrica',
    },
    {
      cliente: 'Bodysculpt',
      rubro: 'Indumentaria',
      desafio: 'Miles de prendas en talles y colores, varios locales, tienda online y venta mayorista.',
      items: [
        'Punto de venta por talle y color, con stock por local.',
        'Portal donde los mayoristas piden solos.',
        'Tienda online sincronizada con el mismo stock.',
      ],
      icono: 'remera',
    },
    {
      cliente: 'Ibérico Mayorista',
      rubro: 'Distribución de alimentos',
      desafio: 'Vende a comercios y gastronómicos, con cuentas corrientes y mucha venta por peso.',
      items: [
        'Tienda mayorista B2B desarrollada a medida.',
        'Facturación electrónica y cuentas corrientes.',
        'Control de rentabilidad producto por producto.',
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
  etiqueta: '06 — Marketing digital',
  titulo: 'El sistema ordena la operación.',
  tituloDestacado: 'El marketing la llena de ventas.',
  texto:
    'Un área de Cayre Labs para empresas que ya tienen algo bueno para vender y necesitan que se note. Se puede contratar con o sin sistema.',
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
      'Una tienda sin tráfico no vende. Tráfico sobre una tienda que no convierte es plata tirada. Las dos cosas las hacemos nosotros, así que nadie se puede echar la culpa.',
  },
  cta: 'Consultar por marketing',
};

export const porQue = {
  etiqueta: '07 — Por qué Cayre',
  titulo: 'Lo que nos hace distintos.',
  texto: 'Ocho compromisos que van por escrito en cada propuesta.',
  compromisos: [
    {
      titulo: 'Hacemos el software, no lo revendemos',
      texto:
        'Si te falta una función, se agrega. No dependés de que un proveedor del exterior decida si tu caso le importa.',
    },
    {
      titulo: 'Un responsable asignado',
      texto: 'Un project manager de punta a punta, con el equipo detrás. Siempre sabés a quién llamar.',
    },
    {
      titulo: 'Tienda y pauta bajo el mismo techo',
      texto: 'El que hace la tienda y el que trae el tráfico son el mismo equipo. No hay a quién culpar.',
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
