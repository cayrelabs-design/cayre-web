import { ImageResponse } from 'next/og';
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

export const alt = 'Cayre Labs — E-commerce, sistemas de gestión y marketing digital';
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
            'radial-gradient(circle at 12% 0%, rgba(109,74,255,0.55), transparent 55%), radial-gradient(circle at 95% 100%, rgba(63,200,228,0.28), transparent 50%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path
              d="M46.14 17.86 A20 20 0 1 0 46.14 46.14"
              stroke="#8f76ff"
              strokeWidth="9"
              fill="none"
            />
            <rect x="42" y="27" width="10" height="10" rx="2" fill="#8f76ff" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>Cayre Labs</div>
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
              color: '#8f76ff',
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
