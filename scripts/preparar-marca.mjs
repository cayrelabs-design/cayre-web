// Prepara el logo de Valtus para la web a partir de los originales.
//
// El original (originales/marca/valtus-logo.png) viene sobre fondo blanco, con
// la doble V en azul petróleo y las letras en azul marino. La web necesita dos
// versiones con fondo transparente:
//
//   public/marca/valtus-logo.png        los colores originales, para fondos claros
//                                       (el back office)
//   public/marca/valtus-logo-claro.png  letras blancas y doble V celeste, para
//                                       fondos oscuros (la web pública)
//
// Cómo distingue la doble V de las letras: por el color. Cada punto del logo es
// una mezcla del blanco del fondo con una de las dos tintas, y la proporción
// entre lo que le falta de verde y lo que le falta de rojo es distinta en cada
// tinta (0,68 en el petróleo, 0,95 en el marino). Eso sirve también en los
// bordes suavizados, donde el color ya no es "puro".
//
// De paso comprueba que el isotipo dibujado a mano como vector
// (src/components/logo.tsx) coincide con el archivo original: si alguien toca
// los puntos del dibujo y se aparta del logo real, este script lo dice.
//
// Correr con:  node scripts/preparar-marca.mjs

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'originales', 'marca');
const destino = join(raiz, 'public', 'marca');

// Los colores de la marca, medidos sobre el original.
export const MARINO = [0x14, 0x20, 0x41]; // #142041
export const PETROLEO = [0x08, 0x56, 0x82]; // #085682
// Sobre fondo oscuro el petróleo no se ve: ahí la doble V va en un celeste de
// la misma familia, y las letras en blanco.
const CELESTE = [0x4f, 0xb4, 0xee]; // #4fb4ee
const BLANCO = [255, 255, 255];

const ALTO = 132; // el logo se muestra a unos 26-32 px: esto cubre pantallas de alta densidad

await mkdir(destino, { recursive: true });

const { data, info } = await sharp(join(origen, 'valtus-logo.png'))
  .flatten({ background: '#ffffff' })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

async function variante(nombre, colorV, colorLetras) {
  const puntos = info.width * info.height;
  const salida = Buffer.alloc(puntos * 4);
  for (let i = 0; i < puntos; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const faltaR = 255 - r, faltaG = 255 - g;
    // Qué tan "tinta" es el punto: 0 = fondo blanco, 1 = tinta plena.
    const cobertura = Math.min(1, faltaR / 235);
    const esV = faltaR > 12 && faltaG / faltaR < 0.82;
    const color = esV ? colorV : colorLetras;
    salida[i * 4] = color[0];
    salida[i * 4 + 1] = color[1];
    salida[i * 4 + 2] = color[2];
    salida[i * 4 + 3] = cobertura < 0.06 ? 0 : Math.round(cobertura * 255);
  }
  const recortado = await sharp(salida, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
  const final = await sharp(recortado)
    .resize({ height: ALTO })
    .png({ compressionLevel: 9 })
    .toFile(join(destino, nombre));
  console.log(nombre.padEnd(26), `${final.width}×${final.height}`, `${Math.round(final.size / 102.4) / 10} KB`);
  return final;
}

await variante('valtus-logo.png', PETROLEO, MARINO);
await variante('valtus-logo-claro.png', CELESTE, BLANCO);

// ── Comprobación del isotipo vectorial ───────────────────────────────────────
// Los mismos puntos que usa src/components/logo.tsx, en las coordenadas del
// original de 1500 px.
const EXTERIOR = '150.85,305 320.85,305 749.5,1047.5 1178.15,305 1348.15,305 834.85,1195.5 664.15,1195.5';
const INTERIOR = '493.85,305 663.85,305 749.5,453 835.15,305 1006.15,305 749.5,749.5';
const dibujo = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1500"><rect width="1500" height="1500" fill="#fff"/><polygon points="${EXTERIOR}" fill="#000"/><polygon points="${INTERIOR}" fill="#000"/></svg>`,
);
const a = await sharp(dibujo).greyscale().raw().toBuffer();
const b = await sharp(join(origen, 'valtus-isotipo.png')).removeAlpha().greyscale().raw().toBuffer();
let distintos = 0;
let tinta = 0;
for (let i = 0; i < a.length; i++) {
  const esTintaA = a[i] < 128, esTintaB = b[i] < 128;
  if (esTintaB) tinta++;
  if (esTintaA !== esTintaB) distintos++;
}
const error = (distintos / tinta) * 100;
console.log(`\nIsotipo vectorial contra el original: difieren ${distintos} puntos de ${tinta} (${error.toFixed(2)} %).`);
if (error > 1) {
  console.error('El dibujo vectorial se aparta del logo original. Revisar los puntos.');
  process.exit(1);
}
