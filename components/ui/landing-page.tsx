'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, MessageCircle, Star, MapPin, Phone } from 'lucide-react';

const SERVICES_QUICK = ['Custom Tattoo', 'Realismo', 'Fine Line', 'Cover Up', 'Microblading', 'Micropigmentación', 'Tooth Gems', 'Láser'];

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo('.h-badge', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
        .fromTo('.h-line', { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, '-=0.25')
        .fromTo('.h-sub', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo('.h-cta', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.35')
        .fromTo('.h-trust', { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.2');
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

        {/* Headline */}
        <h1 className="mb-3 sm:mb-4">
          <span className="block overflow-hidden">
            <span className="h-line block text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.88] tracking-tight text-[#E8E2D9]">
              DZ
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="h-line block text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.88] tracking-tight text-gradient">
              Tattoo
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="h-line overflow-hidden mb-6 sm:mb-8">
          <span className="block text-[#B0A89E] text-sm sm:text-lg tracking-[0.5em] uppercase font-light">
            Tatuajes con alma
          </span>
        </p>

        {/* Description */}
        <p className="h-sub text-[#B0A89E] text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-8 sm:mb-10">
          Realismo, Fine Line, Microblading y más. Arte personalizado en Silla, Valencia.{' '}
          <span className="text-[#E8E2D9]">Primera consulta totalmente gratuita.</span>
        </p>

        {/* CTAs — full width on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-14">
          <a
            href="#booking-form"
            onClick={e => { e.preventDefault(); document.querySelector('#booking-form')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="h-cta btn-cta w-full sm:w-auto px-8 py-5 text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-center justify-center"
          >
            Reservar cita gratis <ArrowRight size={16} className="flex-shrink-0" />
          </a>
          <a
            href="https://wa.me/34722201072"
            target="_blank"
            rel="noopener noreferrer"
            className="h-cta btn-whatsapp w-full sm:w-auto px-8 py-5 text-sm sm:text-base font-bold tracking-[0.12em] uppercase justify-center"
          >
            <MessageCircle size={18} className="flex-shrink-0" />
            WhatsApp ahora
          </a>
        </div>

        {/* Trust strip */}
        <div className="h-trust flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6 border-t border-[#111] pt-5">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className="fill-[#8B0000] text-[#8B0000]" />
            ))}
            <span className="text-[#E8E2D9] text-xs font-black ml-1.5">5.0</span>
            <span className="text-[#555] text-xs ml-0.5">Google</span>
          </div>
          <span className="text-[#222] hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-[#8B0000] flex-shrink-0" />
            <span className="text-[#B0A89E] text-xs font-mono">Av. Luis Vives 12, Silla</span>
          </div>
          <span className="text-[#222] hidden sm:inline">·</span>
          <a href="tel:+34722201072" className="flex items-center gap-1.5 text-[#B0A89E] text-xs font-mono hover:text-[#E8E2D9] transition-colors">
            <Phone size={11} className="text-[#8B0000] flex-shrink-0" />
            +34 722 20 10 72
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
