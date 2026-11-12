'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logotipo } from '@/components/logo';
import { contacto, navegacion } from '@/content/landing';

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-fondo/80 backdrop-blur-xl">
      <div className="contenedor flex h-18 items-center justify-between gap-6">
        <Link href="/" aria-label="Valtus, volver al inicio" className="shrink-0">
          <Logotipo />
        </Link>

        {/* El menú va dentro de una pastilla de vidrio: flota sobre la página en
            vez de quedar pegado a una barra. */}
        <nav
          aria-label="Secciones"
          className="vidrio hidden items-center gap-1 !rounded-full px-2 py-1.5 xl:flex"
        >
          {navegacion.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-texto-2 transition-colors hover:bg-white/8 hover:text-white"
            >
              {item.etiqueta}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contacto"
            className="boton boton-primario degradado hidden !min-h-11 !px-6 !text-sm sm:inline-flex"
          >
            Diagnóstico gratis
          </Link>
          <button
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="nav-movil"
            className="boton boton-secundario !min-h-11 !px-5 font-mono !text-[11px] tracking-[0.1em] xl:hidden"
          >
            {abierto ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>
      </div>

      {abierto && (
        <nav
          id="nav-movil"
          aria-label="Secciones"
          className="max-h-[70vh] overflow-y-auto border-t border-white/6 bg-fondo-2 px-6 pb-6 xl:hidden"
        >
          {navegacion.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAbierto(false)}
              className="block border-b border-white/6 py-3.5 text-[15px] text-texto-2"
            >
              {item.etiqueta}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setAbierto(false)}
            className="boton boton-primario degradado mt-5 w-full"
          >
            Diagnóstico gratis
          </Link>
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
