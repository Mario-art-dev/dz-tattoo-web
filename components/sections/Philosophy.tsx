'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: '01',
    title: 'Arte personalizado',
    description:
      'Cada diseño nace de una conversación profunda. No hacemos copias. Creamos piezas únicas que cuentan tu historia con la firma visual de nuestros artistas.',
  },
  {
    number: '02',
    title: 'Excelencia técnica',
    description:
      'Más de 6 años perfeccionando técnicas de realismo, fine line y micropigmentación. La precisión no es opcional, es nuestra obsesión.',
  },
  {
    number: '03',
    title: 'Higiene absoluta',
    description:
      'Material desechable, esterilización certificada, protocolos estrictos. Tu seguridad es innegociable en cada sesión.',
  },
  {
    number: '04',
    title: 'Transformación duradera',
    description:
      'Un tatuaje premium es para siempre. Usamos tintas de la más alta calidad para garantizar colores vivos y líneas nítidas durante décadas.',
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.philosophy-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.philosophy-grid',
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.philosophy-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Horizontal text scroll
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 bg-[#080808] overflow-hidden"
      aria-label="Filosofía del estudio"
    >
      {/* Marquee */}
      <div className="overflow-hidden mb-20 border-y border-[#1a1a1a] py-4">
        <div className="marquee-inner flex gap-8 whitespace-nowrap" style={{ width: '200%' }}>
          {[...Array(4)].map((_, i) =>
            ['Arte con alma', 'Realismo', 'Precisión', 'Fine Line', 'Transformación', 'Premium', 'Hygiene', 'Creatividad'].map(
              (word) => (
                <span key={`${i}-${word}`} className="text-[#1a1a1a] text-6xl sm:text-8xl font-black uppercase tracking-tight mr-8 select-none">
                  {word}
                </span>
              )
            )
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="philosophy-header text-center mb-20 opacity-0">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Nuestra filosofía</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            No hacemos tatuajes.<br />
            <span className="text-gradient">Hacemos arte.</span>
          </h2>
          <p className="text-[#B0A89E] max-w-xl mx-auto mt-6 text-sm leading-relaxed">
            Cada visita a D.Z Tattoo Studio es el comienzo de una transformación. Creemos que
            el arte corporal es la expresión más íntima del ser humano.
          </p>
        </div>

        <div className="philosophy-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111]">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="philosophy-card bg-[#080808] p-8 group hover:bg-[#0d0000] transition-colors duration-500 opacity-0"
            >
              <span className="text-[#8B0000]/40 text-5xl font-black block mb-6 group-hover:text-[#8B0000]/60 transition-colors">
                {pillar.number}
              </span>
              <h3 className="text-[#E8E2D9] font-bold text-lg mb-4 uppercase tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-[#B0A89E] text-sm leading-relaxed">{pillar.description}</p>
              <div className="h-px bg-[#8B0000]/0 group-hover:bg-[#8B0000]/50 transition-all duration-500 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
