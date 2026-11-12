import { ImageResponse } from 'next/og';
import { V_EXTERIOR, V_INTERIOR } from '@/components/logo';
import { pie, portada } from '@/content/landing';

/**
 * La imagen que aparece cuando alguien comparte el link por WhatsApp,
 * LinkedIn o Instagram.
 *
 * Sin esto el link se ve como una tarjeta de texto pelado. Y el que nos
 * recomienda por WhatsApp está haciendo trabajo comercial gratis: lo mínimo es
 * que el link se vea bien.
 *
 * Se dibuja con código al construir el sitio, así que usa el titular real de
 * la portada: si mañana cambia el titular, la imagen cambia sola.
 */

export const alt = 'Valtus — E-commerce, sistemas de gestión y marketing digital';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Imagen() {
  const corte = portada.titulo.lastIndexOf('.', portada.titulo.length - 2);
  const principio = corte > 0 ? portada.titulo.slice(0, corte + 1) : portada.titulo;
  const remate = corte > 0 ? portada.titulo.slice(corte + 1).trim() : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#060a18',
          backgroundImage:
            'radial-gradient(circle at 12% 0%, rgba(16,137,198,0.55), transparent 55%), radial-gradient(circle at 95% 100%, rgba(63,200,228,0.28), transparent 50%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* La doble V del logo, con los mismos puntos que src/components/logo.tsx. */}
          <svg width="86" height="64" viewBox="0 0 120 89.25">
            <polygon points={V_EXTERIOR} fill="#4fb4ee" />
            <polygon points={V_INTERIOR} fill="#4fb4ee" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: 3 }}>VALTUS</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2.5 }}>
            {principio}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2.5,
              color: '#4fb4ee',
            }}
          >
            {remate}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#a8aece' }}>{pie.bajada}</div>
      </div>
    ),
    size,
  );
}
