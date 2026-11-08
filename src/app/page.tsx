import { Circuito } from '@/components/Circuito';
import { Contacto } from '@/components/Contacto';
import { Diagnostico } from '@/components/Diagnostico';
import { Encabezado } from '@/components/Encabezado';
import { Escala } from '@/components/Escala';
import { Experiencia } from '@/components/Experiencia';
import { Funciones } from '@/components/Funciones';
import { Marketing } from '@/components/Marketing';
import { Metodo } from '@/components/Metodo';
import { Pie } from '@/components/Pie';
import { PorQue } from '@/components/PorQue';
import { Portada } from '@/components/Portada';
import { PuntoDePartida } from '@/components/PuntoDePartida';
import { Productos } from '@/components/Productos';
import { Revelador } from '@/components/Revelador';
import { Servicios } from '@/components/Servicios';

export default function Inicio() {
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
        <Servicios />
        <Productos />
        {/* El diagnóstico va justo después de los sistemas: el visitante acaba
            de ver seis y la pregunta que le queda es cuál necesita. */}
        <Diagnostico />
        <Funciones />
        <Escala />
        <Experiencia />
        <Marketing />
        <PorQue />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
