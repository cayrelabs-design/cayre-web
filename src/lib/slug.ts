/**
 * "Ibérico Mayorista" -> "iberico-mayorista".
 *
 * Es el nombre con el que se busca el archivo del logo de cada marca, así que
 * tiene que dar siempre lo mismo para el mismo nombre: minúsculas, sin acentos
 * y con guiones en lugar de espacios.
 */
export function aSlug(nombre: string): string {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
