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

export type Estado = 'disponible' | 'proximamente';

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

  {
    slug: 'wms',
    nombre: 'CayreWMS',
    rubro: 'Depósito',
    quien: 'Para el que mueve la mercadería',
    resumen: 'Ubicaciones, picking y control de inventario.',
    titular: 'Que nadie vuelva a buscar un pallet a mano.',
    bajada:
      'Cada cosa con su ubicación, cada movimiento registrado y el inventario controlado sin frenar el depósito.',
    estado: 'proximamente',
    acento: '#22C3D6',
    funciones: [
      'Mapa de ubicaciones por sector, calle y altura',
      'Recepción con control contra la orden de compra',
      'Picking guiado por recorrido óptimo',
      'Packing y control de bulto antes de despachar',
      'Inventario cíclico sin parar la operación',
      'Trazabilidad por lote y vencimiento',
    ],
    incluye: [
      'Relevamiento del depósito',
      'Armado del mapa de ubicaciones',
      'Capacitación del equipo',
      'Integrado a CayreERP',
    ],
    preguntas: [
      {
        p: '¿Hace falta comprar equipos?',
        r: 'Funciona con lectores de mano comunes. No hace falta infraestructura especial para empezar.',
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

  {
    slug: 'crm',
    nombre: 'CayreCRM',
    rubro: 'Comercial',
    quien: 'Para el equipo de ventas',
    resumen: 'Cartera, seguimiento comercial y post-venta ordenados.',
    titular: 'La cartera es de la empresa, no del vendedor.',
    bajada:
      'Embudo, ficha única de cliente y seguimiento. Si mañana se va alguien del equipo, la información se queda.',
    estado: 'proximamente',
    acento: '#4C9AFF',
    funciones: [
      'Embudo de ventas configurable por etapa',
      'Ficha única de cliente con todo el historial',
      'Tareas, recordatorios y alertas de seguimiento',
      'Gestión de reclamos y post-venta',
      'Reportes de desempeño por vendedor',
      'Conectado a pedidos y cuentas corrientes del ERP',
    ],
    incluye: [
      'Embudo a medida de tu proceso',
      'Importación de tu cartera actual',
      'Alertas por cliente sin contacto',
      'Integrado al ERP',
    ],
    preguntas: [
      {
        p: '¿Se integra con WhatsApp?',
        r: 'El registro de conversaciones se carga desde la ficha del cliente. La integración directa se evalúa por proyecto.',
      },
    ],
  },
];

export const porSlug = (slug: string) => PRODUCTOS.find((p) => p.slug === slug);
