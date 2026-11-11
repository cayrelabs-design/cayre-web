'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Aviso } from '@/interno/components/Estado';
import { crearClienteDeNavegador } from '@/interno/lib/supabase/navegador';

/**
 * El segundo factor: el código de seis dígitos de la app del celular.
 *
 * Tiene dos caminos, y elige solo:
 *
 *  · Primera vez  -> muestra un código QR para escanear con la app de
 *                    autenticación (Google Authenticator, Authy, 1Password…)
 *                    y pide el primer código para confirmar que quedó bien.
 *  · Las demás    -> pide el código y listo.
 *
 * Hasta que este paso no se completa, la sesión no puede leer ningún dato: lo
 * exige la base, no esta pantalla.
 */

type Paso =
  | { tipo: 'cargando' }
  | { tipo: 'configurar'; factorId: string; qr: string; secreto: string }
  | { tipo: 'pedir'; factorId: string };

export function Verificador() {
  const router = useRouter();
  const [paso, setPaso] = useState<Paso>({ tipo: 'cargando' });
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState<string>();
  const [verificando, setVerificando] = useState(false);
  const iniciado = useRef(false);

  useEffect(() => {
    // En desarrollo React monta dos veces: sin esta marca se crearían dos
    // factores a medio configurar.
    if (iniciado.current) return;
    iniciado.current = true;

    (async () => {
      const supabase = crearClienteDeNavegador();
      const { data, error: fallo } = await supabase.auth.mfa.listFactors();
      if (fallo) {
        setError('No pudimos consultar tu segundo factor. Recargá la página.');
        return;
      }

      const confirmado = data.totp.find((f) => f.status === 'verified');
      if (confirmado) {
        setPaso({ tipo: 'pedir', factorId: confirmado.id });
        return;
      }

      // Si quedó un intento anterior a medio hacer, se descarta y se empieza
      // de cero: un QR viejo ya no sirve.
      for (const viejo of data.all.filter((f) => f.status === 'unverified')) {
        await supabase.auth.mfa.unenroll({ factorId: viejo.id });
      }

      const alta = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `Celular ${new Date().toISOString().slice(0, 10)}`,
      });
      if (alta.error) {
        setError('No pudimos iniciar la configuración. Recargá la página.');
        return;
      }
      setPaso({
        tipo: 'configurar',
        factorId: alta.data.id,
        qr: alta.data.totp.qr_code,
        secreto: alta.data.totp.secret,
      });
    })();
  }, []);

  async function verificar(e: React.FormEvent) {
    e.preventDefault();
    if (paso.tipo === 'cargando') return;
    setVerificando(true);
    setError(undefined);

    const supabase = crearClienteDeNavegador();
    const { error: fallo } = await supabase.auth.mfa.challengeAndVerify({
      factorId: paso.factorId,
      code: codigo.trim(),
    });

    if (fallo) {
      setError('El código no es correcto o ya venció. Esperá a que cambie y probá con el nuevo.');
      setCodigo('');
      setVerificando(false);
      return;
    }

    router.replace('/interno');
    router.refresh();
  }

  if (paso.tipo === 'cargando') {
    return (
      <>
        <Aviso texto={error} />
        {!error && <p className="text-[15px] text-texto-2">Preparando…</p>}
      </>
    );
  }

  return (
    <form onSubmit={verificar} className="flex flex-col gap-5">
      <Aviso texto={error} />

      {paso.tipo === 'configurar' && (
        <div className="flex flex-col gap-4">
          <ol className="flex flex-col gap-2 text-[14.5px] text-texto-2">
            <li>
              <strong className="text-texto">1.</strong> Abrí tu app de autenticación en el celular
              (Google Authenticator, Authy, 1Password…).
            </li>
            <li>
              <strong className="text-texto">2.</strong> Escaneá este código.
            </li>
            <li>
              <strong className="text-texto">3.</strong> Escribí abajo los seis dígitos que te muestra.
            </li>
          </ol>

          <div className="flex justify-center rounded-2xl border border-linea bg-white p-4">
            {/* El QR viene ya dibujado desde el servicio de sesiones. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={paso.qr} alt="Código QR para la app de autenticación" width={184} height={184} />
          </div>

          <details className="text-[13px] text-texto-3">
            <summary className="cursor-pointer">¿No podés escanear? Cargá la clave a mano</summary>
            <code className="mt-2 block rounded-lg bg-fondo px-3 py-2 font-mono text-[12.5px] break-all text-texto">
              {paso.secreto}
            </code>
          </details>
        </div>
      )}

      <div>
        <label htmlFor="codigo" className="etiqueta-campo">
          Código de seis dígitos
        </label>
        <input
          id="codigo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          required
          pattern="[0-9]{6}"
          placeholder="000000"
          className="campo text-center font-mono text-xl tracking-[0.4em]"
        />
      </div>

      <button
        type="submit"
        disabled={verificando || codigo.length !== 6}
        className="ibtn ibtn-primario"
      >
        {verificando ? 'Verificando…' : 'Entrar'}
      </button>
    </form>
  );
}
