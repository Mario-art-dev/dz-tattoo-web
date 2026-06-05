'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { InstagramIcon } from '@/components/ui/InstagramIcon';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const artists = [
  {
    id: 'DNZ',
    name: 'Dani Zaragoza',
    role: 'Fundador & Tatuador',
    specialties: ['Realismo', 'Fine Line', 'Custom', 'Cover Up'],
    bio: 'Más de 6 años convirtiendo ideas en arte permanente. Especialista en realismo fotográfico y fine line. Su firma artística combina precisión técnica con sensibilidad única.',
    instagram: 'https://www.instagram.com/d.z.tattoo',
    image: '/images/artist-dani.jpg',
    years: '6+',
    works: '800+',
  },
  {
    id: 'SRY',
    name: 'Sara Rey',
    role: 'Artista & Estética',
    specialties: ['Microblading', 'Micropigmentación', 'Tooth Gems', 'Fine Line'],
    bio: 'Especialista en micropigmentación y técnicas de belleza semipermanente. Ojo clínico para resultados naturales, precisos y duraderos que realzan la belleza de cada cliente.',
    instagram: 'https://www.instagram.com/d.z.tattoo',
    image: '/images/artist-sara.jpg',
    years: '4+',
    works: '400+',
  },
];

export default function Artists() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.art-eyebrow', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('h2', { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.7, ease: 'power4.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.sec-desc', { opacity: 0, y: 14, filter: 'blur(6px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.sec-meta', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.artist-card', { opacity: 0, y: 50, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.4, stagger: 0.22, ease: 'power3.out',
        scrollTrigger: { trigger: '.artists-grid', start: 'top 82%', toggleActions: 'play none none reset' },
      });
      gsap.fromTo('.artist-img', { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut', stagger: 0.15,
        scrollTrigger: { trigger: '.artists-grid', start: 'top 80%', toggleActions: 'play none none reset' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="artists" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#050505] border-t border-[#0f0f0f]" aria-label="Artistas">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20 lg:mb-24 border-b border-[#111] pb-8">
          <div>
            <div className="art-eyebrow flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">03 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">El equipo</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Las manos que<br />
              <span className="text-gradient">hacen el arte</span>
            </h2>
          </div>
          <p className="sec-meta text-[#555] text-xs font-mono max-w-[200px] leading-relaxed">
            D.Z Studio — dos artistas,<br />un mismo estándar de excelencia.
          </p>
        </div>

        {/* Artists grid */}
        <div className="artists-grid grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#111]">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="artist-card opacity-0 bg-[#050505] group hover:bg-[#080000] transition-colors duration-500"
            >
              {/* Image zone */}
              <div className="artist-img relative aspect-[4/3] overflow-hidden border-b border-[#111]">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#0d0000]/40 to-[#050505] opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#333] text-[8rem] font-black select-none">{artist.id}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                {/* Code label */}
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] text-[#666] border border-[#8B0000]/20 px-2 py-1">
                  {artist.id}
                </div>
              </div>

              {/* Info zone */}
              <div className="p-8">
                {/* Name row */}
                <div className="flex items-start justify-between mb-5 pb-5 border-b border-[#111]">
                  <div>
                    <h3 className="text-[#E8E2D9] text-xl font-black uppercase tracking-wide">{artist.name}</h3>
                    <p className="text-[#8B0000] text-[10px] font-mono tracking-[0.3em] uppercase mt-1">{artist.role}</p>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-[#E8E2D9] text-2xl font-black">{artist.years}</p>
                    <p className="text-[#555] text-[10px] tracking-widest uppercase">años</p>
                  </div>
                </div>

                <p className="text-[#B0A89E] text-sm leading-relaxed mb-6">{artist.bio}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {artist.specialties.map((s) => (
                    <span key={s} className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#8B0000] border border-[#8B0000]/25 px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Stats + link */}
                <div className="flex items-center justify-between border-t border-[#111] pt-5">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[#E8E2D9] font-black text-lg">{artist.works}</p>
                      <p className="text-[#555] text-[10px] font-mono tracking-widest uppercase">Obras</p>
                    </div>
                  </div>
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#555] hover:text-[#E8E2D9] text-xs font-mono tracking-widest uppercase transition-colors"
                    aria-label={`Instagram de ${artist.name}`}
                  >
                    <InstagramIcon size={14} />
                    Ver trabajos
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
