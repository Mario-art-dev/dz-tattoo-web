'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
        {
          clipPath: 'inset(0% 0 0 0)',
          scale: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: imageRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        contentRef.current?.querySelectorAll('.reveal-item') ?? [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-[#050505] overflow-hidden"
      aria-label="Sobre nosotros"
    >
      {/* Decorative red line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8B0000] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative aspect-[3/4] max-h-[640px] overflow-hidden rounded-none">
          <Image
            src="/images/about-studio.jpg"
            alt="Interior de D.Z Tattoo Studio"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
            }}
          />
          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#1a0000] to-[#050505]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 border border-[#8B0000]/30 rotate-45 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-black text-[#8B0000] -rotate-45">DZ</span>
              </div>
              <p className="text-[#B0A89E] text-xs tracking-[0.3em] uppercase">D.Z Tattoo Studio</p>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

          {/* Years badge */}
          <div className="absolute bottom-8 left-8 border border-[#8B0000]/30 bg-[#050505]/80 px-6 py-4">
            <p className="text-[#8B0000] text-3xl font-black">6+</p>
            <p className="text-[#B0A89E] text-[10px] tracking-widest uppercase">Años de arte</p>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="space-y-8">
          <div className="reveal-item">
            <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Sobre nosotros</span>
          </div>

          <div ref={lineRef} className="h-px bg-gradient-to-r from-[#8B0000] to-transparent max-w-[120px] reveal-item" />

          <h2 className="text-4xl sm:text-5xl font-black leading-tight uppercase reveal-item">
            Arte con alma,<br />
            <span className="text-gradient">precisión sin límites</span>
          </h2>

          <p className="text-[#B0A89E] leading-relaxed text-sm sm:text-base reveal-item">
            D.Z Tattoo Studio nació de la pasión por el arte y el compromiso con la excelencia.
            Somos un estudio premium ubicado en Silla, Valencia, donde cada tatuaje es una obra
            de arte personalizada que refleja tu esencia.
          </p>

          <p className="text-[#B0A89E] leading-relaxed text-sm sm:text-base reveal-item">
            Trabajamos con los mejores materiales del mercado, bajo los más estrictos protocolos
            de higiene y esterilización. Nuestro equipo de artistas especialistas te guiará desde
            el primer boceto hasta el resultado final, creando una experiencia única e irrepetible.
          </p>

          <div className="grid grid-cols-2 gap-6 reveal-item">
            {[
              { label: 'Higiene certificada', desc: 'Protocolos ISO de esterilización' },
              { label: 'Diseños exclusivos', desc: 'Arte 100% personalizado' },
              { label: 'Equipo premium', desc: 'Materiales de primera calidad' },
              { label: 'Atención personal', desc: 'Cada cliente, único' },
            ].map((item) => (
              <div key={item.label} className="border-l border-[#8B0000]/30 pl-4">
                <p className="text-[#E8E2D9] font-bold text-sm">{item.label}</p>
                <p className="text-[#B0A89E] text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal-item">
            <a
              href="https://www.instagram.com/d.z.tattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-3 px-6 py-3 text-xs font-medium tracking-[0.15em] uppercase"
            >
              Ver en Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
