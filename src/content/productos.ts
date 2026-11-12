/**
 * Las cinco líneas de Valtus.
 *
 * Tres sistemas y dos servicios. El límite entre ellos es el tamaño y la forma
 * del negocio, no la lista de funciones:
 *
 *   Valtus360   empresa mediana con depósito, varios canales y mucho movimiento
 *   ValtusPOS   el mismo circuito, en chico, para el comercio de mostrador
 *   ValtusCRM   la parte comercial, con IA, sobre el sistema que ya tenés
 *   ValtusCorp  lo que tu negocio hace distinto y ningún catálogo contempla
 *   ValtusMKT   la agencia: que lo que construimos se llene de ventas
 *
 * ── Regla de honestidad (traspaso §5) ───────────────────────────────────────
 * `funciones` es lo que ANDA HOY. No es la lista de deseos ni el roadmap: es lo
 * que se puede mostrar funcionando si el cliente lo pide en la reunión.
 *
 * De Valtus360 NO se promete, porque todavía no está: Mercado Libre, WooCommerce,
 * facturación ARCA válida (está en pruebas), producción, órdenes de compra,
 * funcionamiento sin señal, transportistas, ni app en Google Play o App Store.
 */

/**
 * En qué punto está cada línea DE VERDAD. Es un dato interno: desde el
 * 12/11/2026 el sitio no lo muestra (decisión del dueño: se sale a
 * comercializar cuando todo esté funcionando y probado, así que las cinco se
 * presentan iguales).
 *
 * Se conserva acá para que quede escrito qué está construido y qué no. Antes
 * de salir a vender, las cinco tendrían que decir 'disponible'.
 *
 * `piloto` es "funciona en una operación real, pero todavía no se entrega
 * llave en mano".
 */
export type Estado = 'disponible' | 'piloto' | 'proximamente';

/**
 * Un sistema se contrata y se usa; un servicio lo hacemos nosotros. La ficha se
 * arma distinto: el sistema muestra funciones, el servicio muestra entregables.
 */
export type Linea = 'sistema' | 'servicio';

export type Producto = {
  slug: string;
  nombre: string;
  rubro: string;
  quien: string;
  resumen: string;
  titular: string;
  bajada: string;
  linea: Linea;
  estado: Estado;
  /** Color propio de la línea. Se usa en dosis chicas: los colores de la marca son los azules del logo. */
  acento: string;
  funciones: string[];
  incluye: string[];
  preguntas: { p: string; r: string }[];
};

export const PRODUCTOS: Producto[] = [
  // ⚠️ ÉSTE ES EL SISTEMA CONSTRUIDO Y FUNCIONANDO (antes se llamaba CayreWMS).
  // Todo lo que dice `funciones` existe hoy. Ver la regla de honestidad arriba
  // antes de agregar un renglón.
  {
    slug: 'valtus360',
    nombre: 'Valtus360',
    rubro: 'La operación completa',
    quien: 'Para la empresa mediana con depósito, varios canales y mucho movimiento',
    resumen: 'Depósito, local, mayorista y tienda online sobre una sola base.',
    titular: 'Toda la empresa mirando el mismo stock.',
    bajada:
      'Sabé dónde está cada producto, quién lo movió y en qué paso está cada pedido. Lo que se vende en el local no se vuelve a vender online, y la caja cierra el mismo día.',
    linea: 'sistema',
    estado: 'disponible',
    acento: '#22C3D6',
    funciones: [
      'Ubicaciones: cada producto con su lugar exacto en el estante',
      'Preparación guiada: el sistema dice qué tomar y de dónde, en orden de recorrido',
      'App Android con lector de código de barras, sin teclear',
      'Varios depósitos, con transferencias entre ellos',
      'Pedidos de Tienda Nube que entran solos, con reserva de stock',
      'Punto de venta en cada local, con caja, turnos y arqueo',
      'Cambios y devoluciones escaneando el ticket',
      'Portal mayorista con cuenta corriente y atraso por tramo',
      'Tesorería: bancos, cajas y cheques',
      'Conteos de inventario a ciegas y con doble control',
      'Permisos por rol, con autor y hora en cada movimiento',
      'Importación del catálogo desde una planilla',
    ],
    incluye: [
      'Te acompañamos en la migración desde tu sistema actual',
      'Cargás tu catálogo desde una planilla',
      'Guía de uso completa dentro del sistema, pantalla por pantalla',
      'Usuarios y roles: el operario no ve la plata, la cajera no ve el depósito',
      'Tus datos se exportan cuando quieras',
    ],
    preguntas: [
      {
        p: 'Ya tengo Tienda Nube, ¿para qué otro sistema?',
        r: 'Tienda Nube sabe lo que vendiste online. No sabe lo que vendiste en el local ni al mayorista, ni en qué estante está cada producto. Valtus360 junta todo y mantiene un solo stock.',
      },
      {
        p: '¿Mis empleados lo van a poder usar?',
        r: 'El depósito trabaja con el celular y el lector de código de barras, y cada rol ve solo su parte. Adentro del sistema hay una guía de uso pantalla por pantalla.',
      },
      {
        p: '¿Funciona con varios depósitos o locales?',
        r: 'Sí: varios depósitos, transferencias entre ellos y la caja de cada local atada a su depósito.',
      },
      {
        p: '¿Mis datos están seguros?',
        r: 'Cada empresa está aislada de las demás, todo movimiento queda registrado con su autor y su hora, y tus datos se exportan cuando quieras.',
      },
    ],
  },

  // Funciona hoy adentro de una operación real. Todavía no se contrata llave en
  // mano, por eso va como piloto y no como disponible.
  {
    slug: 'crm',
    nombre: 'ValtusCRM',
    rubro: 'Comercial con IA',
    quien: 'Para el que atiende por WhatsApp, Instagram y la tienda a la vez',
    resumen: 'La IA que atiende y vende adentro de tu propio sistema.',
    titular: 'Tu IA no debería tener que preguntarle el stock a otro sistema.',
    bajada:
      'Atiende, califica al cliente y deja la venta lista para que tu vendedor la cierre sin cambiar de pantalla. Y como vive adentro de tu sistema, cuando dice "lo tengo", lo tiene.',
    linea: 'sistema',
    estado: 'piloto',
    acento: '#4C9AFF',
    funciones: [
      'Una sola bandeja para WhatsApp, Instagram y el chat de la tienda',
      'La IA califica al cliente en la conversación y el vendedor cierra ahí mismo',
      'Ve el stock real, el precio y la cuenta corriente: no le pregunta a una integración',
      'Embudo con dueño, fecha y próximo paso, sin planillas paralelas por vendedor',
      'Ficha única de cliente con todo el historial de todos los canales',
      'Pasa la conversación a una persona con el contexto ya cargado',
      'Devuelve cada venta a Meta y Google Analytics: la pauta aprende a quién mostrarse',
    ],
    incluye: [
      'Funcionando hoy adentro de una operación real',
      'Se activa sobre tu sistema: no es otra herramienta más para mantener',
      'La IA habla con la voz de tu marca',
      'Tu equipo sigue atendiendo cuando hace falta una persona',
    ],
    preguntas: [
      {
        p: '¿En qué se diferencia de un chatbot?',
        r: 'Un chatbot responde preguntas frecuentes de una lista. Este ve tu stock, tus precios y la cuenta corriente del cliente, porque es parte del mismo sistema. Cuando dice "lo tengo", lo tiene.',
      },
      {
        p: '¿Reemplaza a mis vendedores?',
        r: 'No. Les saca de encima la consulta repetida y les deja la conversación lista para cerrar, con el cliente ya calificado. El que vende sigue siendo tu vendedor.',
      },
      {
        p: '¿Qué tiene que ver con la pauta publicitaria?',
        r: 'Cada venta que arrancó en un anuncio vuelve a Meta y a Google Analytics. Esas plataformas aprenden a quién mostrarle tu publicidad, y dejás de pagar por clics que no compran.',
      },
    ],
  },

  {
    slug: 'pos',
    nombre: 'ValtusPOS',
    rubro: 'El mismo circuito, en chico',
    quien: 'Para el comercio que atiende mostrador',
    resumen: 'Punto de venta, facturación e inventario para comercios.',
    titular: 'El 360, del tamaño de tu local.',
    bajada:
      'El mismo circuito del sistema grande, sin el depósito ni el canal mayorista. Punto de venta, inventario y caja en el navegador: sin instalar nada y sin servidor.',
    linea: 'sistema',
    estado: 'proximamente',
    acento: '#16C784',
    funciones: [
      'Venta con lector de código de barras y balanza',
      'Inventario con alertas de stock mínimo',
      'Caja por turnos y cierre con arqueo ciego',
      'Clientes con cuenta corriente y fiado',
      'Actualización masiva de precios',
      'Reportes de ventas, márgenes y productos sin movimiento',
      'Usuarios con permisos por rol',
      'Si el negocio crece, se pasa a Valtus360 con los datos puestos',
    ],
    incluye: [
      'Sin límite de productos ni de ventas',
      'Actualizaciones y mejoras',
      'Soporte por WhatsApp',
      'Migramos tu lista de productos',
    ],
    preguntas: [
      {
        p: '¿Necesito instalar algo?',
        r: 'No. Funciona en el navegador, en la computadora del mostrador o en una tablet. El lector de código de barras se enchufa y anda.',
      },
      {
        p: '¿En qué se diferencia de Valtus360?',
        r: 'Es el mismo circuito sin la parte de depósito grande ni el canal mayorista. Si tu negocio crece hasta necesitarlos, no migrás nada: se activa.',
      },
      {
        p: '¿Sirve para indumentaria?',
        r: 'Sí. Al registrarte elegís el rubro y el sistema acomoda las pantallas: grilla de talle y color para ropa, peso y balanza para almacén.',
      },
    ],
  },

  {
    slug: 'corp',
    nombre: 'ValtusCorp',
    rubro: 'Desarrollos a medida',
    quien: 'Para lo que tu negocio hace distinto y ningún sistema de catálogo contempla',
    resumen: 'El software que tu operación necesita y no existe en ningún catálogo.',
    titular: 'Si tu negocio no entra en una plantilla, no lo metas a la fuerza.',
    bajada:
      'Tiendas, portales e integraciones hechas para tu circuito, no adaptadas al nuestro. Empieza siempre por entender cómo trabajás hoy, y esa parte sirve aunque después no nos contrates.',
    linea: 'servicio',
    estado: 'disponible',
    acento: '#6D4AFF',
    funciones: [
      'Plataformas de e-commerce minoristas y mayoristas, construidas, no instaladas',
      'Portales para clientes, proveedores o vendedores',
      'Integraciones con lo que ya usás, y entre sistemas que hoy no se hablan',
      'Módulos propios montados sobre Valtus360',
      'Migraciones desde tu sistema actual, con el historial completo',
      'Auditoría de procesos: qué automatizar, qué simplificar y qué tirar',
    ],
    incluye: [
      'Relevamiento de dos semanas adentro de tu operación',
      'Alcance, cronograma y precio por escrito, con lo que queda afuera también escrito',
      'Puesta en marcha por etapas, sin frenar la operación',
      'Tus datos se exportan cuando quieras',
    ],
    preguntas: [
      {
        p: '¿La auditoría sirve si después no los contrato?',
        r: 'Sí, y es a propósito. Salís con el circuito relevado y con qué conviene cambiar, lo hagamos nosotros o no.',
      },
      {
        p: '¿Cómo sé que no se va a estirar para siempre?',
        r: 'El alcance, el cronograma y el precio van cerrados por escrito antes de empezar, y lo que queda afuera está escrito también.',
      },
    ],
  },

  {
    slug: 'mkt',
    nombre: 'ValtusMKT',
    rubro: 'Agencia de marketing digital',
    quien: 'Para el que ya tiene algo bueno para vender y necesita que se note',
    resumen: 'Campañas, contenido y marca, medidos contra tu facturación.',
    titular: 'El sistema ordena la operación. El marketing la llena de ventas.',
    bajada:
      'Campañas en Meta y Google con un plan detrás, no publicaciones sueltas a ver qué pasa. Y un panel que cruza lo invertido con lo facturado y con el margen, no con los clics.',
    linea: 'servicio',
    estado: 'disponible',
    acento: '#E84BC7',
    funciones: [
      'Estrategia y campañas en Meta y Google Ads',
      'Contenido, identidad y redes con una sola voz',
      'Medición contra la venta real: lo invertido contra lo facturado y el margen',
      'Si tenés Valtus360 o ValtusCRM, la venta vuelve sola a las plataformas',
      'Revisión de la tienda: si entra gente y no compra, el problema puede ser la tienda',
    ],
    incluye: [
      'Se contrata con o sin sistema',
      'Plan mensual con lo que se va a hacer, escrito',
      'Panel de resultados contra facturación',
      'La inversión publicitaria va directo a Meta o Google, no pasa por nosotros',
    ],
    preguntas: [
      {
        p: '¿Tengo que tener un sistema de ustedes?',
        r: 'No. Se contrata solo. Si además tenés Valtus360 o ValtusCRM, la medición deja de depender de los clics y pasa a ser contra tu facturación real.',
      },
      {
        p: '¿La pauta la pago aparte?',
        r: 'Sí. La inversión publicitaria va directo a Meta o a Google y no pasa por Valtus.',
      },
      {
        p: 'Tengo tienda y no vende. ¿Es problema de pauta?',
        r: 'Puede ser el tráfico o puede ser la tienda. Lo miramos antes de proponerte invertir: traer gente a una tienda que no convierte es plata tirada.',
      },
    ],
  },
];

export const porSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);

/** Los tres sistemas, en el orden en que se muestran. */
export const SISTEMAS = PRODUCTOS.filter((p) => p.linea === 'sistema');

/** Los dos servicios. */
export const SERVICIOS = PRODUCTOS.filter((p) => p.linea === 'servicio');
