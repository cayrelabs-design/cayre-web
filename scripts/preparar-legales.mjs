// Arma los textos legales de la plataforma a partir de las páginas originales.
//
// De dónde salen. Hasta el 25/11/2026, en valtus.com.ar había un sitio mínimo
// con tres páginas legales (privacidad, términos y eliminación de datos) que
// describen la plataforma de app.valtus.com.ar. Son las direcciones que Meta
// tiene cargadas para esa aplicación y que vuelve a visitar cada tanto. Cuando
// esta web pasó a ocupar el dominio, esas tres direcciones tenían que seguir
// diciendo lo mismo.
//
// Por eso el texto NO se volvió a escribir: se guardó una copia de las páginas
// tal como estaban (originales/legales/, tomadas el 20/11/2026) y este script
// saca de ahí el contenido, sin tocar una palabra. Lo único que cambia es el
// envoltorio: se le quitan los estilos del sitio viejo para que tome los de
// este.
//
// Qué deja pasar. Solo las etiquetas de texto (títulos, párrafos, listas,
// tablas, negritas, enlaces). De los atributos, solo el nombre del ancla en los
// títulos y el destino en los enlaces. Cualquier otra cosa se descarta: el
// resultado se inserta tal cual en la página, así que no puede traer nada que
// no sea texto.
//
// Si la plataforma cambia sus textos: reemplazar los archivos de
// originales/legales/ por los nuevos y volver a correr esto.
//
// Correr con:  node scripts/preparar-legales.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');

const PAGINAS = [
  { clave: 'privacidad', archivo: 'privacidad.html' },
  { clave: 'terminos', archivo: 'terminos.html' },
  { clave: 'eliminacion', archivo: 'eliminacion-de-datos.html' },
];

const PERMITIDAS = new Set([
  'h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'a', 'code', 'br',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
]);

/** Un enlace solo puede ir a una página del sitio, a un ancla, a un mail o a https. */
const destinoValido = (href) => /^(\/[a-z0-9\-/]*|#[a-z0-9-]+|mailto:[^"'<>\s]+|https:\/\/[^"'<>\s]+)$/i.test(href);

function limpiar(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(\/?)([a-z0-9]+)\b([^>]*)>/gi, (_, cierre, nombre, atributos) => {
      const etiqueta = nombre.toLowerCase();
      if (!PERMITIDAS.has(etiqueta)) return '';
      if (cierre) return `</${etiqueta}>`;

      if (etiqueta === 'h2' || etiqueta === 'h3') {
        const id = /\bid="([a-z0-9-]+)"/i.exec(atributos)?.[1];
        return id ? `<${etiqueta} id="${id}">` : `<${etiqueta}>`;
      }
      if (etiqueta === 'a') {
        const href = /\bhref="([^"]*)"/i.exec(atributos)?.[1] ?? '';
        if (!destinoValido(href)) throw new Error(`Enlace que no se esperaba: ${href}`);
        const externo = href.startsWith('https://');
        return `<a href="${href}"${externo ? ' target="_blank" rel="noopener noreferrer"' : ''}>`;
      }
      return `<${etiqueta}>`;
    })
    .replace(/[ \t]*\n[ \t]*/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

const salida = {};

for (const { clave, archivo } of PAGINAS) {
  const pagina = await readFile(join(raiz, 'originales', 'legales', archivo), 'utf8');

  const articulo = /<article[^>]*>([\s\S]*?)<\/article>/.exec(pagina)?.[1];
  if (!articulo) throw new Error(`${archivo}: no se encontró el artículo`);

  const titulo = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(articulo)?.[1]?.trim();
  const fecha = /<time[^>]*>([\s\S]*?)<\/time>/.exec(articulo)?.[1]?.trim();
  if (!titulo || !fecha) throw new Error(`${archivo}: falta el título o la fecha`);

  // El texto empieza después del índice que la página vieja mostraba en el
  // teléfono. El índice no se trae: lo arma esta web a su manera, o no lo arma.
  const finDelIndice = articulo.indexOf('</nav>');
  if (finDelIndice < 0) throw new Error(`${archivo}: no se encontró el índice`);
  const cuerpo = limpiar(articulo.slice(finDelIndice + '</nav>'.length));

  // Comprobación: lo que quedó tiene que tener las mismas palabras que el
  // original. Si la limpieza se comió algo, se nota acá y no en producción.
  const soloTexto = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const original = soloTexto(articulo.slice(finDelIndice + '</nav>'.length).replace(/<!--[\s\S]*?-->/g, ''));
  if (soloTexto(cuerpo) !== original) throw new Error(`${archivo}: el texto limpio no coincide con el original`);

  salida[clave] = { titulo, actualizado: fecha, html: cuerpo };
  console.log(archivo.padEnd(26), `"${titulo}" · ${fecha} · ${soloTexto(cuerpo).split(' ').length} palabras`);
}

const archivoDeSalida = join(raiz, 'src', 'content', 'legal-plataforma.ts');
await writeFile(
  archivoDeSalida,
  `// ⚠️ ARCHIVO GENERADO. No editarlo a mano: se pisa.
//
// Son los textos legales de la plataforma (app.valtus.com.ar), tal como
// estaban publicados en valtus.com.ar. Los arma scripts/preparar-legales.mjs a
// partir de originales/legales/. Ahí está explicado por qué no se reescriben.

export type TextoDePlataforma = {
  titulo: string;
  /** La fecha que traía la página original. No es la de esta web. */
  actualizado: string;
  /** Solo etiquetas de texto: lo garantiza el script que lo genera. */
  html: string;
};

export const legalPlataforma: Record<'privacidad' | 'terminos' | 'eliminacion', TextoDePlataforma> = ${JSON.stringify(salida, null, 2)};
`,
  'utf8',
);
console.log('->', 'src/content/legal-plataforma.ts');
