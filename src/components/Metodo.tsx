import { metodo } from '@/content/landing';
import { Icono } from './Icono';
import { Seccion } from './Seccion';

export function Metodo() {
  return (
    <Seccion id="metodo">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="rotulo">{metodo.etiqueta}</p>
          <h2 className="mt-3.5 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold">
            {metodo.lineas.map((l, i) => (
              <span key={i} className="block">
                {l.previo}
                <span className="text-marca-2">{l.destacado}</span>
                {l.resto}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-[52ch] text-[17px] text-texto-2">{metodo.texto}</p>
        </div>

        <ol className="flex flex-col gap-px bg-linea">
          {metodo.pasos.map((paso, i) => (
            <li key={paso.titulo} className="bg-fondo p-7">
              <div className="flex items-start gap-5">
                <span
                  className="flex size-11 flex-none items-center justify-center border border-linea-2 bg-superficie text-marca-2"
                  aria-hidden
                >
                  <Icono nombre={paso.icono} className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-texto-3">
                    0{i + 1}
                  </p>
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
