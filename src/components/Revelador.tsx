'use client';

import { useEffect } from 'react';

/**
 * Hace aparecer los bloques a medida que entran en pantalla.
 *
 * Es un solo componente de cliente para todo el sitio: cualquier elemento que
 * lleve `data-revelar` entra en la animación, así que las secciones siguen
 * siendo componentes de servidor y no se descarga más JavaScript por agregar
 * animaciones a una sección nueva.
 *
 * Dos salvaguardas, porque una animación no puede esconder información:
 *  · si el visitante pidió menos movimiento en su sistema, todo se muestra ya;
 *  · si el navegador no tiene observador de scroll, también.
 * (Y si no corre el JavaScript, lo resuelve el <noscript> del layout.)
 */
export function Revelador() {
  useEffect(() => {
    const objetivos = Array.from(document.querySelectorAll<HTMLElement>('[data-revelar]'));
    if (objetivos.length === 0) return;

    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (menosMovimiento || !('IntersectionObserver' in window)) {
      for (const el of objetivos) el.dataset.visible = 'true';
      return;
    }

    // Escalonado: dentro de una misma grilla, cada tarjeta entra 40 ms después
    // de la anterior. Se corta a los siete para que la última no llegue tarde.
    for (const el of objetivos) {
      const hermanos = el.parentElement ? Array.from(el.parentElement.children) : [];
      const posicion = Math.min(Math.max(hermanos.indexOf(el), 0), 6);
      el.style.transitionDelay = `${posicion * 40}ms`;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.visible = 'true';
          observador.unobserve(entrada.target);
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.04 },
    );

    for (const el of objetivos) observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return null;
}
