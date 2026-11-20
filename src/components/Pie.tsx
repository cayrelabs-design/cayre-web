import Link from 'next/link';
import { Logotipo } from '@/components/logo';
import { contacto, navegacion, pie } from '@/content/landing';
import { SISTEMAS } from '@/content/productos';

export function Pie() {
  const año = new Date().getFullYear();

  return (
    // El pie no tiene fondo propio: es el mismo de la página, así que no hay
    // una franja ni un borde donde termina el contenido y empieza el pie.
    //
    // El resplandor azul de abajo es un degradado y no una mancha
    // desenfocada, a propósito: la mancha se cortaba en seco contra el borde de
    // arriba del pie y dibujaba una línea. El degradado llega a transparente
    // antes de tocar ese borde, así que se funde solo.
    <footer className="relative bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(16,137,198,0.16),transparent_70%)] pt-10 pb-7 text-sm text-texto-3">
      <div className="contenedor relative">
        <div className="flex flex-col gap-8 border-b border-white/8 pb-10 md:flex-row md:justify-between">
          <div>
            <Link href="/" aria-label="Valtus, volver al inicio">
              <Logotipo size={24} />
            </Link>
            <p className="mt-3.5 max-w-[34ch] text-[13.5px]">{pie.bajada}</p>
            <a
              href={`mailto:${contacto.email}`}
              className="mt-5 block text-texto-2 hover:text-marca-2"
            >
              {contacto.email}
            </a>
            <p className="mt-1">{contacto.ubicacion}</p>
          </div>

          <nav aria-label="Sistemas" className="flex flex-col gap-y-1">
            {SISTEMAS.map((p) => (
              <Link
                key={p.slug}
                href={`/sistemas/${p.slug}`}
                className="py-1.5 text-texto-2 hover:text-marca-2"
              >
                {p.nombre}
              </Link>
            ))}
          </nav>

          <nav aria-label="Secciones" className="grid grid-cols-2 gap-x-10 gap-y-1">
            {navegacion.map((item) => (
              <Link key={item.href} href={item.href} className="py-1.5 text-texto-2 hover:text-marca-2">
                {item.etiqueta}
              </Link>
            ))}
            <Link href="/#contacto" className="py-1.5 text-texto-2 hover:text-marca-2">
              Contacto
            </Link>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-6">
          <p className="font-mono text-[11px] tracking-[0.05em]">© {año} VALTUS</p>
          <nav aria-label="Legales" className="flex gap-5 text-[12.5px]">
            <Link href="/privacidad" className="hover:text-marca-2">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-marca-2">
              Términos
            </Link>
            <Link href="/eliminacion-de-datos" className="hover:text-marca-2">
              Eliminación de datos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
