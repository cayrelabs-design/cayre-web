import { Circuito } from '@/components/Circuito';
import { Contacto } from '@/components/Contacto';
import { Diagnostico } from '@/components/Diagnostico';
import { Encabezado } from '@/components/Encabezado';
import { Experiencia } from '@/components/Experiencia';
import { Funciones } from '@/components/Funciones';
import { Metodo } from '@/components/Metodo';
import { Pie } from '@/components/Pie';
import { PorQue } from '@/components/PorQue';
import { Portada } from '@/components/Portada';
import { PuntoDePartida } from '@/components/PuntoDePartida';
import { Productos } from '@/components/Productos';
import { Proyectos } from '@/components/Proyectos';
import { Revelador } from '@/components/Revelador';
import { experiencia } from '@/content/landing';
import { logoPublicado } from '@/lib/logos';
import { aSlug } from '@/lib/slug';

export default function Inicio() {
  // Experiencia es un componente de cliente (tiene solapas) y desde el
  // navegador no se puede mirar si un archivo existe. Se resuelve aca, en el
  // servidor, y se le pasa la respuesta.
  const logosDeClientes = Object.fromEntries(
    experiencia.casos.map((c) => [c.cliente, logoPublicado('clientes', aSlug(c.cliente))]),
  );

  return (
    <>
      <Encabezado />
      {/* Un solo componente de cliente anima todo el sitio: las secciones
          siguen siendo de servidor. */}
      <Revelador />
      <main id="contenido">
        <Portada />
        <PuntoDePartida />
        {/* El problema recién contado, resuelto en un dibujo y sin un párrafo. */}
        <Circuito />
        <Metodo />
        <Productos />
        {/* ValtusCorp, la quinta línea, con sección propia: es la que dice de
            qué tamaño son los problemas que se toman. */}
        <Proyectos />
        {/* El diagnóstico va justo después: el visitante acaba de ver todo lo
            que se hace y la pregunta que le queda es por dónde empieza él. */}
        <Diagnostico />
        <Funciones />
        <Experiencia logos={logosDeClientes} />
        <PorQue />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
