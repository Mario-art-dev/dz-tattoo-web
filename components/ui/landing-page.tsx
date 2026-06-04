'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const SERVICES_QUICK = ['Custom Tattoo', 'Realismo', 'Fine Line', 'Cover Up', 'Microblading', 'Micropigmentación', 'Tooth Gems', 'Láser'];

const DZ_LETTERS = ['D', 'Z'];
const TATTOO_LETTERS = ['T', 'a', 't', 't', 'o', 'o'];

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state before first paint
      gsap.set('.h-char', { yPercent: 115 });
      gsap.set(['.h-badge', '.h-sub-line', '.h-sub'], { opacity: 0 });
      gsap.set('.h-cta', { opacity: 0, y: 15 });

      const tl = gsap.timeline({ delay: 1.95 });
      tl.to('.h-badge', { opacity: 1, duration: 0.5, ease: 'power3.out' })
        .to('.h-char', { yPercent: 0, duration: 0.85, stagger: 0.055, ease: 'power4.out' }, '-=0.2')
        .to('.h-sub-line', { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.45')
        .to('.h-sub', { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        .to('.h-cta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col bg-[#050505] overflow-hidden"
      aria-label="D.Z Tattoo Studio"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#8B0000]/14 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] bg-[#8B0000]/8 rounded-full blur-[100px]" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 text-[#8B0000]/[0.03] text-[18rem] sm:text-[26rem] font-black select-none leading-none">
          DZ
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-24 pb-10 sm:pt-32 sm:pb-16">

        {/* Badge */}
        <div className="h-badge mb-7 sm:mb-9">
          <span className="inline-flex items-center gap-2.5 bg-[#8B0000]/10 border border-[#8B0000]/20 text-[#E8E2D9] text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase px-4 sm:px-5 py-2.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C41E1E] animate-pulse flex-shrink-0" />
            Estudio Premium · Silla, Valencia
          </span>
        </div>

        {/* Headline — per character */}
        <h1 className="mb-3 sm:mb-4">
          <div className="overflow-hidden leading-[0.88]">
            {DZ_LETTERS.map((char, i) => (
              <span
                key={i}
                className="h-char text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.88] tracking-tight text-[#E8E2D9] inline-block"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="overflow-hidden leading-[0.88]">
            {TATTOO_LETTERS.map((char, i) => (
              <span
                key={i}
                className="h-char text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.88] tracking-tight text-gradient inline-block"
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <p className="h-sub-line overflow-hidden mb-6 sm:mb-8">
          <span className="block text-[#B0A89E] text-sm sm:text-lg tracking-[0.5em] uppercase font-light">
            Tatuajes con alma
          </span>
        </p>

        {/* Description */}
        <p className="h-sub text-[#B0A89E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-8 sm:mb-10">
          Realismo, Fine Line, Microblading y más. Arte personalizado en Silla, Valencia.{' '}
          <span className="text-[#E8E2D9]">Primera consulta totalmente gratuita.</span>
        </p>

        {/* CTA */}
        <div className="mb-10 sm:mb-14">
          <a
            href="#booking-form"
            onClick={e => { e.preventDefault(); document.querySelector('#booking-form')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="h-cta btn-cta w-full sm:w-auto px-8 py-5 text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-center justify-center"
          >
            Reservar cita gratis <ArrowRight size={16} className="flex-shrink-0" />
          </a>
        </div>
      </div>

      {/* Services scrollable strip */}
      <div className="relative z-10 border-t border-[#0f0f0f] py-3.5">
        <div className="flex gap-2.5 px-5 sm:px-8 overflow-x-auto scrollbar-hide pb-0.5">
          {SERVICES_QUICK.map(s => (
            <span
              key={s}
              className="flex-shrink-0 text-[10px] font-mono tracking-[0.18em] text-[#555] uppercase border border-[#1a1a1a] px-3 py-1.5 whitespace-nowrap hover:text-[#E8E2D9] hover:border-[#8B0000]/30 transition-colors cursor-default"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
