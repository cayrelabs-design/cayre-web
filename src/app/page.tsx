import { Contacto } from '@/components/Contacto';
import { Encabezado } from '@/components/Encabezado';
import { Escala } from '@/components/Escala';
import { Experiencia } from '@/components/Experiencia';
import { Funciones } from '@/components/Funciones';
import { Marketing } from '@/components/Marketing';
import { Metodo } from '@/components/Metodo';
import { Pie } from '@/components/Pie';
import { PorQue } from '@/components/PorQue';
import { Portada } from '@/components/Portada';
import { Servicios } from '@/components/Servicios';

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main id="contenido">
        <Portada />
        <Metodo />
        <Servicios />
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
