'use client';

import { useState } from 'react';
import { Logotipo } from '@/components/logo';
import { contacto, navegacion } from '@/content/landing';

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-fondo/92 backdrop-blur-lg">
      <div className="contenedor flex h-16 items-center justify-between gap-6">
        <a href="#inicio" aria-label="Cayre Labs, volver al inicio" className="shrink-0">
          <Logotipo />
        </a>

        <nav aria-label="Secciones" className="hidden items-center gap-6 xl:flex">
          {navegacion.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-texto-2 transition-colors hover:text-white"
            >
              {item.etiqueta}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contacto"
            className="hidden min-h-11 items-center bg-marca px-5 text-sm font-semibold text-fondo transition-colors hover:bg-marca-2 sm:inline-flex"
          >
            Hablemos
          </a>
          <button
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="nav-movil"
            className="min-h-11 border border-linea-2 px-4 font-mono text-[11px] tracking-[0.1em] text-texto-2 xl:hidden"
          >
            {abierto ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>
      </div>

      {abierto && (
        <nav
          id="nav-movil"
          aria-label="Secciones"
          className="max-h-[70vh] overflow-y-auto border-t border-linea bg-fondo-2 px-6 pb-6 xl:hidden"
        >
          {navegacion.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setAbierto(false)}
              className="block border-b border-linea py-3.5 text-[15px] text-texto-2"
            >
              {item.etiqueta}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setAbierto(false)}
            className="mt-5 block bg-marca px-5 py-3.5 text-center font-semibold text-fondo"
          >
            Hablemos
          </a>
          <a
            href={`mailto:${contacto.email}`}
            className="mt-3 block text-center text-sm text-texto-3"
          >
            {contacto.email}
          </a>
        </nav>
      )}
    </header>
  );
}
