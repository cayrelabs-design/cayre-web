import { metodo } from '@/content/landing';
import { ChipIcono, Seccion } from './Seccion';

export function Metodo() {
  return (
    <Seccion id="metodo">
      <div className="aura top-10 -right-24 size-96 bg-marca/14" />

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="rotulo">{metodo.etiqueta}</p>
          <h2 className="mt-4 text-[clamp(1.95rem,4.4vw,3.1rem)] leading-[1.08] font-bold">
            {metodo.lineas.map((l, i) => (
              <span key={i} className="block">
                {l.previo}
                <span className="texto-degradado">{l.destacado}</span>
                {l.resto}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[52ch] text-[17px] text-texto-2">{metodo.texto}</p>
        </div>

        <ol className="flex flex-col gap-4">
          {metodo.pasos.map((paso, i) => (
            <li data-revelar key={paso.titulo} className="vidrio vidrio-interactivo p-7">
              <div className="flex items-start gap-5">
                <ChipIcono nombre={paso.icono} />
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-texto-3">0{i + 1}</p>
                  <h3 className="mt-1 text-xl font-bold">{paso.titulo}</h3>
                  <p className="mt-2 text-[15px] text-texto-2">{paso.texto}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Seccion>
  );
}
