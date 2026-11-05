import { porQue } from '@/content/landing';
import { Icono } from './Icono';
import { Encabezamiento, Seccion } from './Seccion';

export function PorQue() {
  return (
    <Seccion id="por-que" tenue>
      <Encabezamiento etiqueta={porQue.etiqueta} titulo={porQue.titulo} texto={porQue.texto} />

      <ul className="grid gap-px bg-linea sm:grid-cols-2">
        {porQue.compromisos.map((c, i) => (
          <li key={c.titulo} className="bg-fondo-2 p-7">
            <p className="font-mono text-[11px] tracking-[0.14em] text-marca-2">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-[17px] font-bold">{c.titulo}</h3>
            <p className="mt-2 text-[14.5px] text-texto-2">{c.texto}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 border border-linea-2 bg-superficie p-7">
        <p className="rotulo text-texto-3">{porQue.abonoTitulo}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {porQue.abono.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[15px] text-texto-2">
              <Icono nombre="check" className="mt-1 size-3.5 flex-none text-marca-2" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Seccion>
  );
}
