'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icono, type NombreIcono } from './Icono';

const ITEMS: { href: string; nombre: string; icono: NombreIcono }[] = [
  { href: '/interno', nombre: 'Tablero', icono: 'tablero' },
  { href: '/interno/consultas', nombre: 'Consultas', icono: 'bandeja' },
  { href: '/interno/agenda', nombre: 'Agenda', icono: 'calendario' },
  { href: '/interno/proyectos', nombre: 'Proyectos', icono: 'carpeta' },
];

/**
 * El menú. En computadora es la columna de la izquierda; en el teléfono pasa a
 * ser una barra fija abajo, que es donde llega el pulgar.
 *
 * `nuevas` es la cantidad de consultas sin atender: se muestra como un globito
 * al lado de "Consultas" para que se vea desde cualquier pantalla.
 */
export function Menu({ nuevas }: { nuevas: number }) {
  const ruta = usePathname();
  const activo = (href: string) => (href === '/interno' ? ruta === '/interno' : ruta.startsWith(href));

  return (
    <nav aria-label="Secciones" className="flex gap-1 lg:flex-col">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={activo(item.href) ? 'page' : undefined}
          className={`relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-semibold transition lg:flex-none lg:flex-row lg:gap-3 lg:px-3.5 lg:py-2.5 lg:text-[14.5px] ${
            activo(item.href)
              ? 'bg-marca-suave text-marca-oscura'
              : 'text-texto-2 hover:bg-fondo hover:text-texto'
          }`}
        >
          <Icono nombre={item.icono} />
          <span>{item.nombre}</span>
          {item.href === '/interno/consultas' && nuevas > 0 && (
            <span
              className="absolute top-1 left-1/2 ml-2 rounded-full bg-error px-1.5 text-[10.5px] leading-5 font-bold text-white lg:static lg:m-0 lg:ml-auto"
              aria-label={`${nuevas} sin atender`}
            >
              {nuevas}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
