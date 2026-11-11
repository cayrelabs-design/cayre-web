// Optimiza las imágenes de `originales/` y las deja en `public/img/`.
//
// Los originales pesan entre 1,7 y 2,2 MB cada uno. Servir eso tal cual sería
// mandarle 25 MB al que entra desde el celular. Acá se recortan a una
// proporción común por grupo, se achican a un ancho razonable y se convierten
// a WebP, que pesa la cuarta parte con la misma calidad visible.
//
// Correr con:  node scripts/optimizar-imagenes.mjs

import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'originales');
const destino = join(raiz, 'public', 'img');

// nombre de archivo original -> { salida, ancho, alto, calidad }
// El recorte es "cover" con posición de atención: sharp elige la zona con más
// entropía, que en estas fotos es donde está el objeto principal.
const PLAN = [
  // Portada — 16:9, la única que se ve a pantalla completa
  { de: '3fb2691b-b445-4674-875d-101cc4377b35.png', a: 'portada-almacen.webp', w: 1920, h: 1080 },

  // Industrias — todas a 4:3 para que la grilla quede pareja
  { de: 'f8e0b5d5-ec9a-4854-80df-31bb1d5cda90.png', a: 'industria-minorista.webp',    w: 1200, h: 900 },
  { de: '4edccc3d-f439-4fa7-833b-0fff6bf5e375.png', a: 'industria-gastronomia.webp',  w: 1200, h: 900 },
  { de: '2682a4dd-198b-455f-929f-36c9b6150a3e.png', a: 'industria-distribucion.webp', w: 1200, h: 900 },
  { de: '339a7583-9bcd-4ca2-bf21-daf50c48a385.png', a: 'industria-indumentaria.webp', w: 1200, h: 900 },
  { de: 'd0a8ddb1-ed93-4892-91c9-c0a4bf49fee8.png', a: 'industria-construccion.webp', w: 1200, h: 900 },
  { de: '52ce7597-8381-434c-9ef0-e346c2f42168.png', a: 'industria-produccion.webp',   w: 1200, h: 900 },

  // Fondos abstractos
  { de: 'd96e28b4-1202-4acb-bc34-620ddb9baf1f.png', a: 'fondo-grilla.webp',   w: 1920, h: 1080 },
  { de: 'd96af251-5871-418c-bd51-e7c798bfc684.png', a: 'fondo-textura.webp',  w: 1920, h: 1080 },
  { de: '6ed463d2-773a-4064-a78c-c02fe425c793.png', a: 'fondo-vertical.webp', w: 1000, h: 1250 },

  // Los retratos de los socios se sacaron a proposito: el sitio no muestra caras.
  // Lo que esta en public/ se puede abrir por direccion aunque ninguna pagina lo
  // enlace, asi que una foto que no se publica no puede vivir ahi.
];

const kb = (n) => `${Math.round(n / 1024).toLocaleString('es-AR')} KB`;

await mkdir(destino, { recursive: true });

let pesoAntes = 0;
let pesoDespues = 0;
const faltantes = [];

for (const { de, a, w, h } of PLAN) {
  const entrada = join(origen, de);
  try {
    await stat(entrada);
  } catch {
    faltantes.push(de);
    continue;
  }

  const antes = (await stat(entrada)).size;
  const salida = join(destino, a);

  await sharp(entrada)
    .resize(w, h, { fit: 'cover', position: sharp.strategy.attention })
    .webp({ quality: 82, effort: 6 })
    .toFile(salida);

  const despues = (await stat(salida)).size;
  pesoAntes += antes;
  pesoDespues += despues;

  const ahorro = Math.round((1 - despues / antes) * 100);
  console.log(`  ${a.padEnd(30)} ${kb(antes).padStart(9)} -> ${kb(despues).padStart(8)}  (-${ahorro}%)`);
}

console.log('');
console.log(`  TOTAL  ${kb(pesoAntes)} -> ${kb(pesoDespues)}  (-${Math.round((1 - pesoDespues / pesoAntes) * 100)}%)`);

if (faltantes.length) {
  console.log('');
  console.log('  No encontrados en originales/:');
  for (const f of faltantes) console.log(`    - ${f}`);
}

// Avisar si quedó algún original sin plan de optimización
const enDisco = (await readdir(origen)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const planeados = new Set(PLAN.map((p) => p.de));
const sinPlan = enDisco.filter((f) => !planeados.has(f));
if (sinPlan.length) {
  console.log('');
  console.log('  Originales sin usar (no se publican):');
  for (const f of sinPlan) console.log(`    - ${f}`);
}
