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
import { Servicios } from '@/components/Servicios';

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main id="contenido">
        <Portada />
        <PuntoDePartida />
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
