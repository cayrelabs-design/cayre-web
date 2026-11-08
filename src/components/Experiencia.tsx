import { experiencia } from '@/content/landing';
import { Icono } from './Icono';
import { ChipIcono, Encabezamiento, Seccion } from './Seccion';

export function Experiencia() {
  return (
    <Seccion id="experiencia">
      <Encabezamiento
        etiqueta={experiencia.etiqueta}
        titulo={experiencia.titulo}
        texto={experiencia.texto}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {experiencia.casos.map((caso) => (
          <article key={caso.cliente} className="vidrio flex flex-col gap-4 p-8">
            <ChipIcono nombre={caso.icono} />

            {/* El nombre del cliente es el dato que más vende de toda la página:
                va con el peso de un titular, no como una línea de pie. */}
            <div>
              <h3 className="text-[26px] leading-tight font-bold">{caso.cliente}</h3>
              <p className="mt-1 font-mono text-[10.5px] tracking-[0.14em] text-marca-2 uppercase">
                {caso.rubro}
              </p>
            </div>

            <p className="text-[15px] text-texto-2">{caso.desafio}</p>

            <ul className="mt-1 flex flex-col gap-2.5 border-t border-white/8 pt-5">
              {caso.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-texto-2">
                  <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="vidrio mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 px-8 py-7">
        <p className="text-[17px] font-bold">{experiencia.cierre.titulo}</p>
        <p className="text-[15px] text-texto-2">{experiencia.cierre.texto}</p>
        <a
          href="#contacto"
          className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] text-marca-2 hover:text-marca-3"
        >
          Escribinos
          <Icono nombre="flecha" className="size-3.5" />
        </a>
      </div>
    </Seccion>
  );
}
