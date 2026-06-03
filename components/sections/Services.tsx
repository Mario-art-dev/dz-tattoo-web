'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'custom',
    number: '01',
    title: 'Custom Tattoos',
    subtitle: 'Diseño exclusivo',
    description:
      'Cada tatuaje nace de cero, diseñado específicamente para ti. Trabajamos contigo para capturar tu visión con la firma artística de nuestros tatuadores.',
    tags: ['Diseño original', 'Consulta personalizada', 'Arte único'],
    icon: '◈',
  },
  {
    id: 'realism',
    number: '02',
    title: 'Realismo',
    subtitle: 'Fotorrealismo en piel',
    description:
      'Retratos, naturaleza, animales y escenas que parecen fotografías. Técnica avanzada de sombreado y detalle que convierte tu piel en un lienzo de alta resolución.',
    tags: ['Retratos', 'Naturaleza', 'Blanco y negro', 'Color'],
    icon: '◉',
  },
  {
    id: 'fineline',
    number: '03',
    title: 'Fine Line',
    subtitle: 'Delicadeza infinita',
    description:
      'Líneas ultra finas, detalles minimalistas y composiciones elegantes. Tatuajes sutiles con un impacto visual extraordinario.',
    tags: ['Minimalista', 'Geométrico', 'Botánico', 'Lettering'],
    icon: '◻',
  },
  {
    id: 'coverup',
    number: '04',
    title: 'Cover Ups',
    subtitle: 'Nueva historia sobre la anterior',
    description:
      'Transformamos tatuajes que ya no te representan en nuevas obras de arte. Evaluamos cada caso para encontrar la solución perfecta.',
    tags: ['Evaluación gratuita', 'Transformación', 'Nueva vida'],
    icon: '◈',
  },
  {
    id: 'laser',
    number: '05',
    title: 'Eliminación Láser',
    subtitle: 'Borrón y cuenta nueva',
    description:
      'Tecnología láser de última generación para la eliminación segura y efectiva de tatuajes. Sesiones progresivas adaptadas a cada tipo de tinta y piel.',
    tags: ['Tecnología avanzada', 'Seguimiento personalizado', 'Sin cicatrices'],
    icon: '◎',
  },
  {
    id: 'gems',
    number: '06',
    title: 'Joyería Dental',
    subtitle: 'Tooth Gems',
    description:
      'Añade un toque de brillo a tu sonrisa con gemas dentales premium. Aplicación profesional sin daño al esmalte.',
    tags: ['Cristal Swarovski', 'Sin daño', 'Reversible'],
    icon: '◇',
  },
  {
    id: 'microblading',
    number: '07',
    title: 'Microblading',
    subtitle: 'Cejas perfectas',
    description:
      'Técnica de micropigmentación para cejas que imita el pelo natural pelo a pelo. Resultado natural y duradero hasta 2 años.',
    tags: ['Pelo a pelo', 'Natural', 'Larga duración'],
    icon: '◈',
  },
  {
    id: 'micropig',
    number: '08',
    title: 'Micropigmentación',
    subtitle: 'Maquillaje semipermanente',
    description:
      'Labios, eyeliner y cejas definidos permanentemente. Despiértate perfecta cada día con resultados naturales y duraderos.',
    tags: ['Labios', 'Eyeliner', 'Cejas', 'Semi-permanent'],
    icon: '◉',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services-list', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 bg-[#050505]"
      aria-label="Servicios"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Servicios</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase leading-tight">
              Todo lo que<br />
              <span className="text-gradient">tu piel merece</span>
            </h2>
            <p className="text-[#B0A89E] text-sm max-w-xs leading-relaxed">
              Ofrecemos una gama completa de servicios de arte corporal realizados con la más alta técnica y profesionalismo.
            </p>
          </div>
        </div>

        <div className="services-list border-t border-[#1a1a1a]">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-row group border-b border-[#1a1a1a] opacity-0"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <button
                className="w-full flex items-center gap-6 py-6 sm:py-8 text-left cursor-pointer"
                aria-label={`Ver servicio: ${service.title}`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <span className="text-[#8B0000]/40 text-sm font-mono w-8 flex-shrink-0 group-hover:text-[#8B0000] transition-colors">
                  {service.number}
                </span>

                <span className="text-[#E8E2D9]/20 text-2xl w-8 flex-shrink-0 group-hover:text-[#8B0000]/50 transition-colors">
                  {service.icon}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <h3 className="text-[#E8E2D9] text-xl sm:text-2xl font-black uppercase group-hover:text-gradient transition-all duration-300">
                      {service.title}
                    </h3>
                    <span className="text-[#8B0000] text-xs tracking-widest uppercase hidden sm:block">
                      {service.subtitle}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      activeService === service.id ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[#B0A89E] text-sm leading-relaxed">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-widest uppercase border border-[#8B0000]/30 text-[#8B0000] px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-[#8B0000]/0 group-hover:text-[#8B0000] transition-all duration-300 flex-shrink-0 translate-x-2 group-hover:translate-x-0"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase"
          >
            Consulta tu servicio
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
