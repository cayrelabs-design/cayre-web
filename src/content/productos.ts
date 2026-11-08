/**
 * Los seis productos de Cayre Labs.
 *
 * ⚠️ PENDIENTE: el campo `estado` está en "proximamente" para TODOS. Cambiá a
 * "disponible" los que ya se puedan contratar. Mientras diga "proximamente", la
 * ficha se publica pero sin precio y sin botón de contratar — se muestra, se
 * explica, y el botón lleva a dejar el mail para avisar cuando salga.
 *
 * La razón de que arranque así: publicar un botón de "contratar" en algo que
 * todavía no existe te trae el reclamo el primer día, y el que atiende sos vos.
 */

/**
 * `piloto` existe para no tener que elegir entre dos mentiras: decir
 * "disponible" de algo que todavía no se puede contratar llave en mano, o
 * decir "próximamente" de algo que está funcionando en una operación real.
 */
export type Estado = 'disponible' | 'piloto' | 'proximamente';

export type Producto = {
  slug: string;
  nombre: string;
  rubro: string;
  quien: string;
  resumen: string;
  titular: string;
  bajada: string;
  estado: Estado;
  /** Color propio del producto. Se usa en dosis chicas: el violeta sigue siendo el de la marca. */
  acento: string;
  funciones: string[];
  incluye: string[];
  preguntas: { p: string; r: string }[];
};

export const PRODUCTOS: Producto[] = [
  {
    slug: 'erp',
    nombre: 'CayreERP',
    rubro: 'Gestión integral',
    quien: 'Para el dueño y la administración',
    resumen: 'Compras, ventas, producción y tesorería en un solo lugar.',
    titular: 'Toda la empresa mirando el mismo número.',
    bajada:
      'Compras, ventas, stock, producción, tesorería y cheques. Con la balanza de IVA calculada y lo que está trabado a la vista.',
    estado: 'proximamente',
    acento: '#6D4AFF',
    funciones: [
      'Compras, órdenes y pagos a proveedores',
      'Ventas, pedidos y presupuestos',
      'Stock multi-depósito con transferencias',
      'Órdenes de producción',
      'Tesorería, cobranzas y gestión de cheques',
      'Cuentas corrientes de clientes y proveedores',
      'Facturación electrónica y balanza de IVA',
      'Tablero con lo que está trabado hoy',
    ],
    incluye: [
      'Relevamiento sin costo en tu empresa',
      'Migración de datos históricos',
      'Capacitación por rol',
      'Soporte y evolución mensual',
    ],
    preguntas: [
      {
        p: '¿Cómo se cotiza?',
        r: 'Por cantidad de módulos activados, no por usuarios ni por facturación. Después del relevamiento sabés el número exacto.',
      },
      {
        p: '¿Puedo migrar desde otro sistema?',
        r: 'Sí. Traemos productos, clientes, proveedores, saldos y cuentas corrientes.',
      },
    ],
  },

  {
    slug: 'pos',
    nombre: 'CayrePOS',
    rubro: 'Punto de venta',
    quien: 'Para el que atiende el mostrador',
    resumen: 'Punto de venta, facturación e inventario para comercios.',
    titular: 'Cobrá rápido y cerrá la caja sin hacer cuentas.',
    bajada:
      'Punto de venta, facturación electrónica e inventario en el navegador. Sin instalar nada y sin servidor.',
    estado: 'proximamente',
    acento: '#16C784',
    funciones: [
      'Venta con lector de código de barras y balanza',
      'Facturación electrónica conectada a ARCA',
      'Inventario con alertas de stock mínimo',
      'Caja por turnos y cierre con arqueo ciego',
      'Clientes con cuenta corriente y fiado',
      'Actualización masiva de precios',
      'Reportes de ventas, márgenes y productos sin movimiento',
      'Usuarios con permisos por rol',
    ],
    incluye: [
      'Sin límite de productos ni de ventas',
      'Facturación ARCA incluida, sin costo por comprobante',
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
        p: '¿Puedo usar mi impresora?',
        r: 'Trabajamos con impresoras térmicas comunes y con facturación electrónica de ARCA, que reemplaza al controlador fiscal.',
      },
      {
        p: '¿Sirve para indumentaria?',
        r: 'Sí. Al registrarte elegís el rubro y el sistema acomoda las pantallas: grilla de talle y color para ropa, peso y balanza para almacén.',
      },
    ],
  },

  // ⚠️ ÚNICO PRODUCTO CONSTRUIDO Y FUNCIONANDO. Todo lo que dice esta ficha existe hoy.
  // NO agregar: Mercado Libre, WooCommerce, facturación ARCA válida (está en pruebas),
  // funcionamiento sin señal, transportistas, ni app en Google Play / App Store.
  {
    slug: 'wms',
    nombre: 'CayreWMS',
    rubro: 'Depósito, ventas y caja',
    quien: 'Para marcas que venden por la tienda, el local y el mayorista',
    resumen: 'Una sola verdad de stock para todos tus canales.',
    titular: 'Tu depósito, tus ventas y tu caja, en un solo sistema.',
    bajada:
      'Sabé dónde está cada prenda, quién la movió y en qué paso está cada pedido. Lo que se vende en el local no se vuelve a vender online.',
    estado: 'disponible',
    acento: '#22C3D6',
    funciones: [
      'Ubicaciones: cada talle y color con su lugar exacto en el estante',
      'Preparación guiada: el sistema dice qué tomar y de dónde, en orden de recorrido',
      'App Android con lector de código de barras, sin teclear',
      'Pedidos de Tienda Nube que entran solos, con reserva de stock',
      'Punto de venta en el local con caja, turnos y arqueo',
      'Cambios y devoluciones escaneando el ticket',
      'Cuentas corrientes de mayoristas con atraso por tramo',
      'Tesorería: bancos, cajas y cheques',
      'Conteos de inventario a ciegas y con doble control',
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
        r: 'Tienda Nube sabe lo que vendiste online. No sabe lo que vendiste en el local ni al mayorista, ni en qué estante está cada prenda. Cayre junta todo y mantiene un solo stock.',
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

  {
    slug: 'rest',
    nombre: 'CayreREST',
    rubro: 'Gastronomía',
    quien: 'Para el que maneja un salón lleno',
    resumen: 'Salón, cocina y caja para restaurantes y bares.',
    titular: 'De la mesa a la parrilla sin que se pierda nada.',
    bajada:
      'El mozo toma el pedido en la tablet y aparece en la pantalla del sector que corresponde, con el reloj corriendo.',
    estado: 'proximamente',
    acento: '#FF7A3D',
    funciones: [
      'Mapa de mesas, apertura y transferencia de cuentas',
      'Comandas dirigidas a cocina, parrilla o barra',
      'Carta con variantes, adicionales y promociones',
      'División de cuenta y cobro parcial',
      'Facturación electrónica ARCA',
      'Stock de insumos con receta por plato',
      'Cierre de turno con arqueo y control de mermas',
      'Reportes por hora, mozo y producto',
    ],
    incluye: [
      'Sin límite de mesas ni de mozos',
      'Funciona en tablet, celular y computadora',
      'Soporte en horario de servicio',
      'Migramos tu carta actual',
    ],
    preguntas: [
      {
        p: '¿Cuántas terminales puedo conectar?',
        r: 'Las que quieras. El precio es por local, no por dispositivo.',
      },
      {
        p: '¿Puedo controlar la merma?',
        r: 'Cada plato tiene su receta, así que el sistema descuenta insumos por venta y te muestra la diferencia contra el stock real.',
      },
    ],
  },

  {
    slug: 'valtus',
    nombre: 'Valtus',
    rubro: 'Marketing',
    quien: 'Para el que maneja la marca',
    resumen: 'Publicá en todas tus redes con textos de IA y pautá en Meta.',
    titular: 'De la foto del producto al anuncio pago.',
    bajada:
      'Toma tu catálogo, escribe el texto con IA, publica en todas tus redes y te arma la pauta en Meta.',
    estado: 'proximamente',
    acento: '#E84BC7',
    funciones: [
      'Conexión con tu tienda: productos, precios y stock',
      'Publicación simultánea en todas las redes conectadas',
      'Textos generados con IA, con el tono de tu marca',
      'Políticas comerciales: qué se promociona y cuándo',
      'Calendario de publicaciones',
      'Campañas en Meta con armado de pauta asistido',
      'Reportes de alcance y resultados',
    ],
    incluye: [
      'Redes sincronizadas',
      'Textos con IA sin límite',
      'Calendario de publicación',
      'Armado de pauta en Meta',
    ],
    preguntas: [
      {
        p: '¿La pauta la pago aparte?',
        r: 'Sí. La inversión publicitaria va directo a Meta y no pasa por Cayre Labs.',
      },
      {
        p: '¿Puedo editar el texto que genera la IA?',
        r: 'Siempre. La IA propone y vos aprobás, corregís o reescribís antes de publicar.',
      },
    ],
  },

  // Funciona hoy adentro de una operación real. Todavía no se contrata llave en
  // mano, por eso va como piloto y no como disponible.
  {
    slug: 'crm',
    nombre: 'CayreCRM',
    rubro: 'Comercial con IA',
    quien: 'Para el que atiende por WhatsApp, Instagram y la tienda a la vez',
    resumen: 'La IA que atiende y vende adentro de tu propio sistema.',
    titular: 'Tu IA no debería tener que preguntarle el stock a otro sistema.',
    bajada:
      'Atiende, califica al cliente y deja la venta lista para que tu vendedor la cierre sin cambiar de pantalla. Y como vive adentro de tu sistema, cuando dice "lo tengo", lo tiene.',
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
      'Lo que el CRM aprende vuelve al marketing: mejores públicos, menos plata tirada',
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
];

export const porSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);
