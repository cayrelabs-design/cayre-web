import Link from 'next/link';
import { Logotipo } from '@/components/logo';
import { contacto, navegacion, pie } from '@/content/landing';

export function Pie() {
  const año = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#040814] pt-16 pb-7 text-sm text-texto-3">
      <div className="aura -bottom-32 left-1/2 size-[32rem] -translate-x-1/2 bg-marca/14" />

      <div className="contenedor relative">
        <div className="flex flex-col gap-8 border-b border-white/8 pb-10 md:flex-row md:justify-between">
          <div>
            <Link href="/" aria-label="Cayre Labs, volver al inicio">
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
          <p className="font-mono text-[11px] tracking-[0.05em]">© {año} CAYRE LABS</p>
          <nav aria-label="Legales" className="flex gap-5 text-[12.5px]">
            <Link href="/privacidad" className="hover:text-marca-2">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-marca-2">
              Términos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
