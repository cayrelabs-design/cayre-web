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
            <a href="#inicio">
              <Logotipo size={24} />
            </a>
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
              <a key={item.href} href={item.href} className="py-1.5 text-texto-2 hover:text-marca-2">
                {item.etiqueta}
              </a>
            ))}
            <a href="#contacto" className="py-1.5 text-texto-2 hover:text-marca-2">
              Contacto
            </a>
          </nav>
        </div>

        <p className="pt-6 font-mono text-[11px] tracking-[0.05em]">© {año} CAYRE LABS</p>
      </div>
    </footer>
  );
}
