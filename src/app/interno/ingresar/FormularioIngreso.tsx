'use client';

import { useActionState } from 'react';
import { Aviso } from '@/interno/components/Estado';
import { ingresar } from './acciones';

export function FormularioIngreso() {
  const [estado, accion, enviando] = useActionState(ingresar, {});

  return (
    <form action={accion} className="flex flex-col gap-4">
      <Aviso texto={estado.error} />

      <div>
        <label htmlFor="email" className="etiqueta-campo">
          Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          defaultValue={estado.email}
          className="campo"
        />
      </div>

      <div>
        <label htmlFor="clave" className="etiqueta-campo">
          Contraseña
        </label>
        <input
          id="clave"
          name="clave"
          type="password"
          autoComplete="current-password"
          required
          className="campo"
        />
      </div>

      <button type="submit" disabled={enviando} className="ibtn ibtn-primario mt-1">
        {enviando ? 'Ingresando…' : 'Ingresar'}
      </button>
    </form>
  );
}
