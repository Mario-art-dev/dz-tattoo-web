'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ParticlesScene = dynamic(() => import('@/components/three/ParticlesScene'), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Stagger headline words
      const words = headlineRef.current?.querySelectorAll('.word') ?? [];
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 }
      )
        .fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          '-=0.2'
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        )
        .fromTo(
          ctaRef.current?.children ?? [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.07 },
          '-=0.2'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 },
          '-=0.1'
        );

      // Parallax
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
      aria-label="Sección principal"
    >
      {/* Three.js bg */}
      <div className="absolute inset-0 z-0">
        <ParticlesScene />
      </div>

      {/* Background gradient blobs */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B0000]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#8B0000]/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B0000]/4 rounded-full blur-[150px]" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,226,217,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div ref={eyebrowRef} className="flex items-center justify-center gap-4 mb-8 opacity-0">
          <div className="h-px w-12 bg-[#8B0000]" />
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase font-medium">
            Silla · Valencia · Desde 2018
          </span>
          <div className="h-px w-12 bg-[#8B0000]" />
        </div>

        <h1
          ref={headlineRef}
          className="text-[clamp(4rem,16vw,13rem)] font-black leading-[0.88] tracking-tight mb-6 uppercase w-full overflow-hidden"
          aria-label="DZ Tattoo Studio — Tatuajes con alma"
        >
          <span className="block overflow-hidden">
            <span className="word inline-block">DZ</span>
          </span>
          <span className="block overflow-hidden">
            <span className="word inline-block text-gradient">Tattoo</span>
          </span>
        </h1>

        <p className="overflow-hidden mb-8">
          <span className="word inline-block text-[#B0A89E] text-base sm:text-xl tracking-[0.55em] uppercase font-light">Tatuajes con alma</span>
        </p>

        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-[#8B0000] to-transparent mb-8 max-w-md mx-auto"
        />

        <p
          ref={subtitleRef}
          className="text-[#B0A89E] text-sm sm:text-base tracking-[0.2em] uppercase max-w-2xl mx-auto mb-12 leading-relaxed opacity-0"
        >
          Arte con alma · Realismo · Fine Line · Microblading
          <br className="hidden sm:block" />
          Micropigmentación · Láser · Joyería Dental
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => handleScroll('#booking-form')}
            className="btn-primary group flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase rounded-none w-full sm:w-auto justify-center"
            aria-label="Reservar cita"
          >
            Reservar cita
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => handleScroll('#gallery')}
            className="btn-outline flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase w-full sm:w-auto justify-center"
            aria-label="Ver trabajos"
          >
            Ver trabajos
          </button>

          <a
            href="https://wa.me/34722201072?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20un%20tatuaje"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#B0A89E] hover:text-[#E8E2D9] text-sm tracking-wider transition-colors px-4 py-4 border border-transparent hover:border-[#8B0000]/30"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-[#1a1a1a] pt-8">
          {[
            { value: '6+', label: 'Años de experiencia' },
            { value: '1K+', label: 'Tatuajes realizados' },
            { value: '5★', label: 'Valoración media' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[#E8E2D9] text-2xl sm:text-3xl font-black text-gradient">{stat.value}</p>
              <p className="text-[#B0A89E] text-[10px] tracking-widest uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[#B0A89E] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#8B0000] to-transparent animate-pulse" />
        <ChevronDown size={14} className="text-[#8B0000] animate-bounce" />
      </div>
    </section>
  );
}
