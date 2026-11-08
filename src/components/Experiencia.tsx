'use client';

import { useState } from 'react';
import { experiencia } from '@/content/landing';
import { Icono } from './Icono';
import { ChipIcono, Encabezamiento, Seccion } from './Seccion';

/**
 * Las tres operaciones, de a una.
 *
 * Antes se mostraban las tres al mismo tiempo: tres columnas, doce renglones y
 * unas trescientas palabras arriba de la mesa. Nadie lee tres casos en paralelo
 * —elige uno o no lee ninguno—, así que ahora elige: se ven los tres nombres,
 * que es lo que más vende de la página, y el detalle del que toque.
 *
 * Arranca en el primero, así que el que no toca nada igual lee un caso entero.
 */
export function Experiencia() {
  const [activo, setActivo] = useState(0);
  const caso = experiencia.casos[activo];

  return (
    <Seccion id="experiencia">
      <Encabezamiento
        etiqueta={experiencia.etiqueta}
        titulo={experiencia.titulo}
        texto={experiencia.texto}
      />

      {/* Los nombres son las solapas. En el teléfono entran los tres igual
          porque son cortos. */}
      <div
        role="tablist"
        aria-label="Empresas"
        className="mx-auto flex max-w-fit flex-wrap justify-center gap-2 rounded-[28px] border border-white/8 bg-white/4 p-2"
        data-revelar
      >
        {experiencia.casos.map((c, i) => (
          <button
            key={c.cliente}
            role="tab"
            id={`solapa-${i}`}
            aria-selected={i === activo}
            aria-controls={`panel-${i}`}
            onClick={() => setActivo(i)}
            className={`flex items-center gap-2.5 rounded-full px-5 py-3 font-display text-[15px] font-bold transition ${
              i === activo
                ? 'degradado text-white shadow-[0_8px_26px_-12px_rgba(109,74,255,0.9)]'
                : 'text-texto-2 hover:bg-white/8 hover:text-white'
            }`}
          >
            <Icono nombre={c.icono} className="size-4" />
            {c.cliente}
          </button>
        ))}
      </div>

      <div
        key={caso.cliente}
        id={`panel-${activo}`}
        role="tabpanel"
        aria-labelledby={`solapa-${activo}`}
        className="vidrio-marca entrada-panel mt-6 grid gap-8 p-8 !rounded-[32px] lg:grid-cols-[0.9fr_1.1fr] lg:p-11"
      >
        <div>
          <ChipIcono nombre={caso.icono} destacado />
          <h3 className="mt-5 text-[clamp(1.8rem,3.6vw,2.5rem)] leading-tight font-bold">
            {caso.cliente}
          </h3>
          <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.14em] text-marca-2 uppercase">
            {caso.rubro}
          </p>
          <p className="mt-5 text-[17px] leading-snug text-texto-2">{caso.desafio}</p>
        </div>

        <ul className="flex flex-col gap-3 border-white/10 lg:border-l lg:pl-11">
          {caso.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] text-texto-2">
              <Icono nombre="check" className="mt-1 size-3.5 flex-none text-cian" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        data-revelar
        className="vidrio mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 px-8 py-7"
      >
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
