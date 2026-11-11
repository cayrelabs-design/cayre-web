// Prepara los logos de otras empresas para mostrarlos sobre el fondo oscuro.
//
// Los logos llegan como vienen: negro sobre blanco, azul sobre blanco, blanco
// sobre azul, con márgenes distintos y tamaños distintos. La web los muestra
// todos en blanco, uno al lado del otro, y para eso cada archivo tiene que
// cumplir tres cosas:
//
//   1. Fondo transparente. La web los pinta de blanco con un filtro que tiñe
//      todo lo que no sea transparente: con fondo blanco quedaría un rectángulo.
//   2. Sin márgenes. Si no, dos logos del mismo alto se ven de tamaños distintos.
//   3. Su proporción anotada, para que la web le dé a cada uno un tamaño parejo
//      a la vista (ver src/components/Marca.tsx).
//
// Cómo saca el fondo: mira qué tan oscuro es cada punto. En un logo oscuro
// sobre fondo claro, lo oscuro es logo y lo claro es fondo; en uno claro sobre
// fondo oscuro (ARCA), al revés. Los tonos intermedios quedan semitransparentes,
// que es lo que conserva los bordes suaves y los colores secundarios (la franja
// amarilla de Ibérico, el óvalo de Mercado Libre).
//
// Los originales viven en originales/logos/ (fuera de public/, no se publican).
// El resultado va a public/logos/ y es lo único que ve el visitante.
//
// Para sumar un logo: dejar el archivo en originales/logos/, agregarlo a PLAN
// y correr:  node scripts/preparar-logos.mjs

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'originales', 'logos');
const destino = join(raiz, 'public', 'logos');

// `slug` es el nombre de la marca tal como lo calcula src/lib/slug.ts.
// `fondo` dice cómo viene el original: 'claro' (logo oscuro) u 'oscuro' (logo claro).
const PLAN = [
  { de: 'porcenot.png', carpeta: 'clientes', slug: 'porcenot', fondo: 'claro' },
  { de: 'bodysculpt.webp', carpeta: 'clientes', slug: 'bodysculpt', fondo: 'claro' },
  { de: 'iberico.png', carpeta: 'clientes', slug: 'iberico-mayorista', fondo: 'claro' },
  { de: 'shato.png', carpeta: 'clientes', slug: 'shato', fondo: 'claro' },
  { de: 'tussy.png', carpeta: 'clientes', slug: 'tussy', fondo: 'claro' },
  { de: 'grupo-marquez.png', carpeta: 'clientes', slug: 'grupo-marquez', fondo: 'claro' },

  { de: 'mercado-libre.png', carpeta: 'integraciones', slug: 'mercado-libre', fondo: 'claro' },
  { de: 'tiendanube.webp', carpeta: 'integraciones', slug: 'tiendanube', fondo: 'claro' },
  { de: 'arca.png', carpeta: 'integraciones', slug: 'arca', fondo: 'oscuro' },
];

const ALTO_MAXIMO = 160; // píxeles: el doble de lo que se muestra, para pantallas de alta densidad
const RUIDO = 22; // por debajo de esta opacidad (de 255) se considera fondo sucio y se borra

const medidas = {};

for (const { de, carpeta, slug, fondo } of PLAN) {
  // Se apoya sobre blanco (o sobre negro, si el logo es claro) por si el
  // original ya traía transparencia: así todos entran al mismo cálculo.
  const base = fondo === 'claro' ? '#ffffff' : '#000000';
  const { data, info } = await sharp(join(origen, de))
    .flatten({ background: base })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const puntos = info.width * info.height;
  const opacidad = new Uint8Array(puntos);
  let maxima = 0;
  for (let i = 0; i < puntos; i++) {
    const luz = 0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2];
    const valor = fondo === 'claro' ? 255 - luz : luz;
    opacidad[i] = valor;
    if (valor > maxima) maxima = valor;
  }

  // El punto de arriba a la izquierda es fondo: dice cuánto "pesa" el fondo en
  // la cuenta. En un fondo blanco puro es cero; en el azul de ARCA no, y sin
  // descontarlo queda un rectángulo fantasma detrás de las letras.
  const piso = opacidad[0];

  // Se estira para que la parte más marcada del logo quede totalmente opaca
  // (un logo azul no es "negro del todo" y quedaría lavado), y se limpia el ruido.
  const salida = Buffer.alloc(puntos * 4, 255);
  for (let i = 0; i < puntos; i++) {
    const a = Math.max(0, Math.min(255, Math.round(((opacidad[i] - piso) / (maxima - piso)) * 255)));
    salida[i * 4 + 3] = a < RUIDO ? 0 : a;
  }

  const recortado = await sharp(salida, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();

  const archivo = join(destino, carpeta, `${slug}.png`);
  await mkdir(dirname(archivo), { recursive: true });
  const final = await sharp(recortado)
    .resize({ height: ALTO_MAXIMO, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(archivo);

  medidas[`${carpeta}/${slug}`] = [final.width, final.height];
  console.log(`${carpeta}/${slug}.png`.padEnd(40), `${final.width}×${final.height}`.padEnd(10), `${Math.round(final.size / 102.4) / 10} KB`);
}

// La web lee este archivo para saber la proporción de cada logo sin tener que
// abrir las imágenes.
await writeFile(join(destino, 'medidas.json'), JSON.stringify(medidas, null, 2) + '\n');
console.log('\nmedidas.json escrito.');
