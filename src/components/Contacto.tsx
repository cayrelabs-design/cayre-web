import { contacto, contactoSeccion, experiencia } from '@/content/landing';
import { FormularioConsulta } from './FormularioConsulta';
import { Icono } from './Icono';

export function Contacto() {
  return (
    <section id="contacto" className="relative overflow-hidden py-24 md:py-28">
      <div className="aura -top-20 right-1/4 size-[28rem] bg-marca/16" />

      <div className="contenedor relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 className="text-[clamp(1.95rem,4.4vw,3.1rem)] leading-[1.08] font-bold">
            {contactoSeccion.titulo}
          </h2>
          <p className="mt-4 max-w-[42ch] text-[17px] text-texto-2">{contactoSeccion.texto}</p>

          <dl className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-8">
            <div>
              <dt className="rotulo !text-texto-3">Mail</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contacto.email}`}
                  className="text-[17px] text-texto hover:text-marca-2"
                >
                  {contacto.email}
                </a>
              </dd>
            </div>
            {contacto.whatsappVisible && contacto.whatsappLink && (
              <div>
                <dt className="rotulo !text-texto-3">WhatsApp</dt>
                <dd className="mt-1">
                  <a
                    href={contacto.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[17px] text-texto hover:text-marca-2"
                  >
                    <Icono nombre="chat" className="size-4" />
                    {contacto.whatsappVisible}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="rotulo !text-texto-3">Dónde estamos</dt>
              <dd className="mt-1 text-[17px] text-texto-2">{contacto.ubicacion}</dd>
            </div>
          </dl>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/8 pt-8">
            {experiencia.casos.map((c) => (
              <li key={c.cliente} className="font-display text-[15px] font-bold text-texto-3">
                {c.cliente}
              </li>
            ))}
          </ul>
        </div>

        <div data-revelar className="vidrio p-7 !rounded-[32px] md:p-10">
          <h3 className="text-[22px] font-bold">{contactoSeccion.formularioTitulo}</h3>
          <p className="mt-1.5 mb-6 text-[15px] text-texto-2">{contactoSeccion.formularioTexto}</p>
          <FormularioConsulta />
        </div>
      </div>
    </section>
  );
}
