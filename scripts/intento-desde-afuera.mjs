// Intenta entrar a la base REAL como lo haría un extraño: solo con la clave
// PÚBLICA, que es la que cualquiera puede sacar del navegador.
//
// Es la prueba de que las consultas, los proyectos y la agenda no se pueden
// leer ni escribir desde afuera. Todos los renglones tienen que decir
// "permission denied". Si alguno devuelve filas, hay una regla floja.
//
// Solo lee e intenta; no cambia nada. No imprime ninguna clave: solo dice qué
// pidió y qué le contestaron. Necesita la sesión de Supabase iniciada
// (npx supabase login).
//
// Correr con:  node scripts/intento-desde-afuera.mjs

import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

const REF = 'pslrgglflfsvdygrzzlo';
const URL_BASE = `https://${REF}.supabase.co`;

const salida = execFileSync('npx', ['supabase', 'projects', 'api-keys', '--project-ref', REF], {
  cwd: raiz,
  encoding: 'utf8',
  shell: true,
  stdio: ['ignore', 'pipe', 'ignore'],
});

// La clave publica: la nueva (sb_publishable_...) o, si no hay, la "anon" clasica.
const publica =
  salida.match(/sb_publishable_[A-Za-z0-9_-]+/)?.[0] ??
  [...salida.matchAll(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g)]
    .map((m) => m[0])
    .find((jwt) => {
      try {
        return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString()).role === 'anon';
      } catch {
        return false;
      }
    });

if (!publica) {
  console.error('No pude obtener la clave publica.');
  process.exit(1);
}
console.log(`Clave publica obtenida (${publica.startsWith('sb_') ? 'formato nuevo' : 'formato anon'}); no se imprime.\n`);

const cabeceras = { apikey: publica, Authorization: `Bearer ${publica}`, 'Content-Type': 'application/json' };

async function intento(nombre, ruta, opciones = {}) {
  const r = await fetch(`${URL_BASE}${ruta}`, { headers: cabeceras, ...opciones });
  const texto = await r.text();
  let resumen = texto.slice(0, 110).replace(/\s+/g, ' ');
  try {
    const j = JSON.parse(texto);
    if (Array.isArray(j)) resumen = `devolvio ${j.length} filas`;
    else if (j.message) resumen = j.message;
  } catch {}
  console.log(`${nombre.padEnd(46)} HTTP ${r.status}  ${resumen}`);
}

await intento('Leer las consultas', '/rest/v1/consultas?select=*');
await intento('Leer quienes son los socios', '/rest/v1/socios?select=*');
await intento('Leer los proyectos', '/rest/v1/proyectos?select=*');
await intento('Leer la agenda', '/rest/v1/reuniones?select=*');
await intento('Leer el historial de consultas', '/rest/v1/consulta_notas?select=*');
await intento('Escribir una consulta salteando la web', '/rest/v1/consultas', {
  method: 'POST',
  body: JSON.stringify({ nombre: 'intruso', mensaje: 'escrito directo a la base' }),
});
await intento('Preguntar si es socio', '/rest/v1/rpc/es_socio', { method: 'POST', body: '{}' });

// Esto es publico y de solo lectura: como esta configurado el inicio de sesion.
const ajustes = await (await fetch(`${URL_BASE}/auth/v1/settings`, { headers: cabeceras })).json();
console.log('\nConfiguracion del inicio de sesion (publica):');
console.log(`  registro publico apagado: ${ajustes.disable_signup === true ? 'SI' : 'NO  <-- hay que apagarlo'}`);
console.log(`  ingreso con mail y contraseña: ${ajustes.external?.email ? 'habilitado' : 'deshabilitado'}`);
