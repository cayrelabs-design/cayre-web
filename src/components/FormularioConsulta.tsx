'use client';

import { useActionState, useEffect, useRef } from 'react';
import { enviarConsulta } from '@/app/acciones';
import { contacto } from '@/content/landing';
import { type CampoConsulta, estadoInicial } from '@/lib/consulta';
import { Icono } from './Icono';

const estiloCampo =
  'w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3.5 text-texto placeholder:text-texto-3 focus:border-marca focus:bg-white/6 focus:ring-2 focus:ring-marca/25 focus:outline-none aria-invalid:border-error';

export function FormularioConsulta() {
  const [estado, accion, enviando] = useActionState(enviarConsulta, estadoInicial);
  const inicio = useRef<HTMLInputElement>(null);

  // Marca cuándo se abrió el formulario: un envío instantáneo es de un robot.
  useEffect(() => {
    if (inicio.current) inicio.current.value = String(Date.now());
  }, []);

  if (estado.estado === 'ok') {
    return (
      <div role="status" className="flex flex-col gap-4 py-6">
        <p className="text-2xl font-bold">¡Gracias! Ya tenemos tu consulta.</p>
        <p className="text-texto-2">Te respondemos en menos de 4 horas hábiles.</p>
        <a
          href={`mailto:${contacto.email}`}
          className="boton boton-secundario self-start"
        >
          O escribinos a {contacto.email}
        </a>
      </div>
    );
  }

  const error = (campo: CampoConsulta) => estado.errores?.[campo];
  const valor = (campo: CampoConsulta) => estado.valores?.[campo] ?? '';

  return (
    <form action={accion} noValidate className="flex flex-col gap-4">
      <Campo etiqueta="Nombre" nombre="nombre" error={error('nombre')}>
        <input
          id="nombre"
          name="nombre"
          autoComplete="name"
          required
          defaultValue={valor('nombre')}
          {...aria('nombre', error('nombre'))}
          className={estiloCampo}
        />
      </Campo>

      <Campo etiqueta="Empresa" nombre="empresa" opcional error={error('empresa')}>
        <input
          id="empresa"
          name="empresa"
          autoComplete="organization"
          defaultValue={valor('empresa')}
          {...aria('empresa', error('empresa'))}
          className={estiloCampo}
        />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo etiqueta="WhatsApp" nombre="telefono" error={error('telefono')}>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="11 1234-5678"
            defaultValue={valor('telefono')}
            {...aria('telefono', error('telefono'))}
            className={estiloCampo}
          />
        </Campo>
        <Campo etiqueta="Email" nombre="email" error={error('email')}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={valor('email')}
            {...aria('email', error('email'))}
            className={estiloCampo}
          />
        </Campo>
      </div>

      <Campo etiqueta="¿Qué te está costando hoy?" nombre="mensaje" error={error('mensaje')}>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          required
          placeholder="Por ejemplo: tengo tienda online pero el stock no cuadra con el del local."
          defaultValue={valor('mensaje')}
          {...aria('mensaje', error('mensaje'))}
          className={`${estiloCampo} resize-y`}
        />
      </Campo>

      {/* Trampa para robots: oculta para las personas y para los lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          No completar
          <input name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={inicio} type="hidden" name="inicio" defaultValue="" />

      {estado.estado === 'error' && estado.mensaje && (
        <p role="alert" className="rounded-2xl border border-error/40 bg-error/10 px-4 py-3 text-sm font-semibold text-error">
          {estado.mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="boton boton-primario degradado disabled:opacity-60"
      >
        {enviando ? 'Enviando…' : 'Enviar consulta'}
        {!enviando && <Icono nombre="flecha" className="size-4" />}
      </button>

      <p className="text-xs text-texto-3">Usamos tus datos solo para responderte.</p>
    </form>
  );
}

function aria(campo: CampoConsulta, error?: string) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${campo}-error` : undefined,
  };
}

function Campo({
  etiqueta,
  nombre,
  opcional,
  error,
  children,
}: {
  etiqueta: string;
  nombre: CampoConsulta;
  opcional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={nombre} className="text-sm font-semibold text-texto">
        {etiqueta} {opcional && <span className="font-normal text-texto-3">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${nombre}-error`} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
