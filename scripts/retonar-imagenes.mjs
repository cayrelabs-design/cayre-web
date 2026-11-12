// Pasa a azul la luz violeta de las imágenes de fondo.
//
// Las fotos del sitio se generaron cuando la marca era violeta, con una luz de
// ese color (la tablet de la portada, la grilla de fondo). Con Valtus la marca
// es azul, y un resplandor violeta en la portada parece de otra empresa.
//
// No es un filtro sobre toda la imagen: un giro de color parejo volvería
// rosada la madera del mostrador. Se mira punto por punto y se cambia SOLO lo
// que está en la gama del violeta al magenta, llevándolo a la gama del azul de
// la marca. La luminosidad y la intensidad de cada punto no se tocan, así que
// las sombras y los brillos quedan donde estaban.
//
// Parte siempre del original (originales/), nunca de una imagen ya retocada:
// se puede correr las veces que haga falta.
//
// Correr con:  node scripts/retonar-imagenes.mjs

import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

// Las mismas medidas que usa scripts/optimizar-imagenes.mjs para estas dos.
const PLAN = [
  { de: '3fb2691b-b445-4674-875d-101cc4377b35.png', a: 'portada-almacen.webp', w: 1920, h: 1080 },
  { de: 'd96e28b4-1202-4acb-bc34-620ddb9baf1f.png', a: 'fondo-grilla.webp', w: 1920, h: 1080 },
];

// Gama que se cambia (en grados de la rueda de color) y gama a la que va.
const DESDE = [232, 325]; // del azul violáceo al magenta
const HACIA = [200, 216]; // los azules de Valtus

function aHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}

function aRgb(h, s, l) {
  h /= 360;
  const tono = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [tono(p, q, h + 1 / 3), tono(p, q, h), tono(p, q, h - 1 / 3)].map((v) => Math.round(v * 255));
}

for (const { de, a, w, h } of PLAN) {
  const { data, info } = await sharp(join(raiz, 'originales', de))
    .resize(w, h, { fit: 'cover', position: sharp.strategy.attention })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let cambiados = 0;
  for (let i = 0; i < data.length; i += 3) {
    const [tono, saturacion, luz] = aHsl(data[i], data[i + 1], data[i + 2]);
    // Los grises casi no tienen color: cambiarles el tono no se ve y solo mete ruido.
    if (saturacion < 0.08 || tono < DESDE[0] || tono > DESDE[1]) continue;
    const avance = (tono - DESDE[0]) / (DESDE[1] - DESDE[0]);
    const nuevo = HACIA[0] + avance * (HACIA[1] - HACIA[0]);
    const [r, g, b] = aRgb(nuevo, saturacion, luz);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
    cambiados++;
  }

  const salida = join(raiz, 'public', 'img', a);
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } })
    .webp({ quality: 82, effort: 6 })
    .toFile(salida);

  const peso = (await stat(salida)).size;
  console.log(
    a.padEnd(24),
    `${((cambiados / (data.length / 3)) * 100).toFixed(1)} % de los puntos pasaron de violeta a azul`,
    `· ${Math.round(peso / 1024)} KB`,
  );
}
