'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

gsap.registerPlugin(ScrollTrigger);

const artists = [
  {
    name: 'Dani Zaragoza',
    role: 'Fundador & Tatuador principal',
    specialties: ['Realismo', 'Fine Line', 'Custom', 'Cover Ups'],
    bio: 'Más de 6 años de experiencia convirtiendo ideas en arte permanente. Especialista en realismo fotográfico y fine line con un estilo inconfundible que combina precisión técnica con sensibilidad artística.',
    instagram: 'https://www.instagram.com/d.z.tattoo',
    image: '/images/artist-dani.jpg',
    years: '6+',
  },
  {
    name: 'Sara Rey',
    role: 'Artista & Esteticista',
    specialties: ['Microblading', 'Micropigmentación', 'Joyería Dental', 'Fine Line'],
    bio: 'Especialista en micropigmentación y técnicas de belleza semipermanente. Combina su pasión por el arte con un ojo clínico para resultados naturales y duraderos.',
    instagram: 'https://www.instagram.com/d.z.tattoo',
    image: '/images/artist-sara.jpg',
    years: '4+',
  },
];

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.artist-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.artists-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="artists"
      ref={sectionRef}
      className="relative py-32 bg-[#080808] overflow-hidden"
      aria-label="Nuestros artistas"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[#0d0d0d] text-[20vw] font-black uppercase tracking-tighter">ARTISTS</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">El equipo</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            Las manos que<br />
            <span className="text-gradient">hacen el arte</span>
          </h2>
        </div>

        <div className="artists-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {artists.map((artist) => (
            <div
              key={artist.name}
              className="artist-card group relative overflow-hidden bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#8B0000]/40 transition-all duration-500 opacity-0"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#1a0000]/50 to-[#050505] flex items-end" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-8xl font-black text-[#8B0000]">{artist.name.charAt(0)}</span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[#E8E2D9] text-2xl font-black uppercase">{artist.name}</h3>
                    <p className="text-[#8B0000] text-xs tracking-[0.2em] uppercase mt-1">{artist.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#E8E2D9] text-3xl font-black">{artist.years}</p>
                    <p className="text-[#B0A89E] text-[10px] tracking-widest uppercase">años</p>
                  </div>
                </div>

                <p className="text-[#B0A89E] text-sm leading-relaxed mb-6">{artist.bio}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {artist.specialties.map((spec) => (
                    <span key={spec} className="text-[10px] tracking-widest uppercase border border-[#8B0000]/30 text-[#B0A89E] px-3 py-1">
                      {spec}
                    </span>
                  ))}
                </div>

                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#B0A89E] hover:text-[#E8E2D9] text-xs tracking-widest uppercase transition-colors group/ig"
                  aria-label={`Instagram de ${artist.name}`}
                >
                  <InstagramIcon size={14} className="group-hover/ig:text-[#8B0000] transition-colors" />
                  Ver trabajos
                </a>
              </div>

              {/* Red accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
