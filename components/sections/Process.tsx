'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Consulta inicial',
    description:
      'Cuéntanos tu idea, qué emoción quieres llevar en la piel, dónde y cómo. Primera consulta gratuita presencial o por WhatsApp.',
    duration: '30 min — Gratuita',
  },
  {
    number: '02',
    title: 'Diseño personalizado',
    description:
      'Nuestros artistas crean un boceto exclusivo para ti. Revisamos juntos hasta que el diseño capture exactamente tu visión.',
    duration: '24-48h',
  },
  {
    number: '03',
    title: 'Preparación',
    description:
      'Te enviamos toda la información para prepararte antes de la sesión: hidratación, alimentación, ropa recomendada.',
    duration: 'Antes de la cita',
  },
  {
    number: '04',
    title: 'La sesión',
    description:
      'Trabajamos en un entorno impecable, con música y ambiente que hagan de la experiencia algo único. Tu comodidad, nuestra prioridad.',
    duration: 'Variable según diseño',
  },
  {
    number: '05',
    title: 'Cuidado post-tatuaje',
    description:
      'Te damos instrucciones detalladas de cuidado y realizamos un seguimiento de la cicatrización para garantizar los mejores resultados.',
    duration: 'Seguimiento 4 semanas',
  },
  {
    number: '06',
    title: 'Revisión gratuita',
    description:
      'Una vez cicatrizado, revisamos el resultado juntos. Si algo necesita retoque, lo hacemos sin coste adicional.',
    duration: 'A las 6-8 semanas',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = sectionRef.current?.querySelectorAll('.process-step') ?? [];
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: step, start: 'top 85%' },
          }
        );
      });

      // Animate the vertical line
      gsap.fromTo(
        '.process-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.process-container',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 bg-[#080808] overflow-hidden"
      aria-label="Proceso de trabajo"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Proceso</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            Tu experiencia,<br />
            <span className="text-gradient">paso a paso</span>
          </h2>
          <p className="text-[#B0A89E] max-w-xl mx-auto mt-6 text-sm leading-relaxed">
            Cada tatuaje es un viaje compartido. Te acompañamos desde la primera idea hasta el resultado final con total transparencia y dedicación.
          </p>
        </div>

        <div className="process-container relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#1a1a1a] hidden sm:block">
            <div className="process-line absolute inset-0 bg-gradient-to-b from-[#8B0000] to-transparent" />
          </div>

          <div className="flex flex-col gap-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="process-step opacity-0 flex gap-8 sm:gap-16 items-start relative"
              >
                {/* Number bubble */}
                <div className="relative flex-shrink-0 z-10">
                  <div className="w-16 h-16 border border-[#8B0000]/40 bg-[#080808] flex items-center justify-center group-hover:border-[#8B0000] transition-colors">
                    <span className="text-[#8B0000] font-black text-sm font-mono">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-16 w-px h-16 bg-gradient-to-b from-[#8B0000]/20 to-transparent sm:hidden" />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-16 flex-1 ${index === steps.length - 1 ? 'pb-0' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-[#E8E2D9] font-black text-xl uppercase">{step.title}</h3>
                    <span className="text-[#8B0000] text-[10px] tracking-widest uppercase border border-[#8B0000]/30 px-3 py-1 flex-shrink-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-[#B0A89E] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase"
          >
            Comenzar el proceso
          </a>
        </div>
      </div>
    </section>
  );
}
