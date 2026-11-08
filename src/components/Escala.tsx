import { escala } from '@/content/landing';
import { Icono } from './Icono';
import { Marquesina } from './Marquesina';
import { Encabezamiento, Seccion } from './Seccion';

export function Escala() {
  return (
    <Seccion id="escala" tenue>
      <Encabezamiento etiqueta={escala.etiqueta} titulo={escala.titulo} texto={escala.texto} />

      <div className="grid gap-4 lg:grid-cols-3">
        {escala.niveles.map((nivel, i) => {
          const ultimo = i === escala.niveles.length - 1;
          return (
            <article data-revelar
              key={nivel.etiqueta}
              className={`vidrio-interactivo flex flex-col gap-4 p-8 ${ultimo ? 'vidrio-marca' : 'vidrio'}`}
            >
              <p className="font-mono text-[10px] tracking-[0.14em] text-marca-2 uppercase">
                {nivel.etiqueta}
              </p>
              <h3 className="text-[22px] font-bold">{nivel.titulo}</h3>
              <ul className="mt-1 flex flex-col gap-2.5">
                {nivel.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-texto-2">
                    <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-14">
        <p className="rotulo !text-texto-3 text-center">{escala.integracionesTitulo}</p>
        <div className="mt-5">
          <Marquesina nombres={escala.integraciones} />
        </div>
      </div>
    </Seccion>
  );
}
