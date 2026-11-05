import { escala } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

export function Escala() {
  return (
    <Seccion id="escala" tenue>
      <Encabezamiento etiqueta={escala.etiqueta} titulo={escala.titulo} texto={escala.texto} />

      <div className="grid gap-4 lg:grid-cols-3">
        {escala.niveles.map((nivel, i) => {
          const ultimo = i === escala.niveles.length - 1;
          return (
            <article
              key={nivel.etiqueta}
              className={`flex flex-col gap-4 border p-7 ${
                ultimo
                  ? 'border-marca/45 bg-gradient-to-b from-marca/12 to-transparent'
                  : 'border-linea-2 bg-superficie'
              }`}
            >
              <p className="font-mono text-[10px] tracking-[0.14em] text-marca-2 uppercase">
                {nivel.etiqueta}
              </p>
              <h3 className="text-[22px] font-extrabold">{nivel.titulo}</h3>
              <ul className="mt-1 flex flex-col gap-2.5">
                {nivel.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-texto-2">
                    <Icono nombre="check" className="mt-1 size-3.5 flex-none text-marca-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-11">
        <p className="rotulo text-texto-3">{escala.integracionesTitulo}</p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {escala.integraciones.map((nombre) => (
            <li key={nombre} className="font-display text-[15px] font-bold text-texto-3">
              {nombre}
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
