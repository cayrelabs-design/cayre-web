// Deja lista la computadora para probar el back office con la base LOCAL.
//
//   1. Lee la dirección y la clave pública de la base local (la que levanta
//      `npx supabase start`) y las escribe en .env.local.
//   2. Inventa una contraseña para el socio de prueba y la guarda ahí mismo.
//   3. Carga los datos de prueba (supabase/semilla-local.sql).
//
// No imprime ninguna clave en pantalla, y .env.local no se sube al repositorio.
// Si .env.local ya tenía otras variables, las respeta: solo toca las suyas.
// Se niega a correr si la base no es la local: los datos de prueba no pueden
// terminar nunca en la base real.
//
// Correr con:  node scripts/preparar-local.mjs

import { execFileSync, spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const archivoEnv = join(raiz, '.env.local');

const estado = execFileSync('npx', ['supabase', 'status', '-o', 'env'], {
  cwd: raiz,
  encoding: 'utf8',
  shell: true,
  stdio: ['ignore', 'pipe', 'ignore'],
});

const leer = (nombre) => estado.match(new RegExp(`^${nombre}="?([^"\\r\\n]+)"?`, 'm'))?.[1];
const url = leer('API_URL');
const clavePublica = leer('PUBLISHABLE_KEY') ?? leer('ANON_KEY');

if (!url || !clavePublica) {
  console.error('No encontré la base local. ¿Está corriendo? Probá: npx supabase start');
  process.exit(1);
}
if (!/^http:\/\/(127\.0\.0\.1|localhost):/.test(url)) {
  console.error(`La base (${url}) no es la local. No sigo.`);
  process.exit(1);
}

const previo = existsSync(archivoEnv) ? readFileSync(archivoEnv, 'utf8') : '';
const valorPrevio = (nombre) => previo.match(new RegExp(`^${nombre}=(.+)$`, 'm'))?.[1];

// Si ya había una contraseña de prueba, se conserva: así no cambia en cada corrida.
const propias = {
  NEXT_PUBLIC_SUPABASE_URL: url,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: clavePublica,
  SEMILLA_EMAIL: valorPrevio('SEMILLA_EMAIL') ?? 'socio@cayre.test',
  SEMILLA_CLAVE: valorPrevio('SEMILLA_CLAVE') ?? randomBytes(15).toString('base64url'),
};

// Se conservan las líneas que no son de este script y se reescriben las propias.
const ajenas = previo
  .split(/\r?\n/)
  .filter((linea) => !Object.keys(propias).some((nombre) => linea.startsWith(`${nombre}=`)))
  .filter((linea) => !linea.startsWith('# [local]'))
  .join('\n')
  .trim();

writeFileSync(
  archivoEnv,
  [
    ajenas,
    ajenas && '',
    '# [local] Escrito por scripts/preparar-local.mjs. Apunta a la base LOCAL.',
    ...Object.entries(propias).map(([nombre, valor]) => `${nombre}=${valor}`),
    '',
  ]
    .filter((linea) => linea !== false && linea !== undefined)
    .join('\n')
    .replace(/^\n+/, ''),
);
console.log('.env.local actualizado (base local).');

const semilla = readFileSync(join(raiz, 'supabase', 'semilla-local.sql'));
const carga = spawnSync(
  'docker',
  [
    'exec', '-i', 'supabase_db_cayre-interno', 'psql', '-U', 'postgres', '-q',
    '-v', `email=${propias.SEMILLA_EMAIL}`,
    '-v', `clave=${propias.SEMILLA_CLAVE}`,
  ],
  { input: semilla, encoding: 'utf8' },
);
if (carga.status !== 0) {
  console.error('No se pudieron cargar los datos de prueba:\n' + carga.stderr);
  process.exit(1);
}
console.log(
  `Datos de prueba cargados. Socio de prueba: ${propias.SEMILLA_EMAIL} (la contraseña está en .env.local).`,
);
