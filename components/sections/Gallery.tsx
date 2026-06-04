'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const cats = ['Todos', 'Realismo', 'Fine Line', 'Custom', 'Microblading', 'Micropigmentación'];

const items = [
  { id: 1, src: '/images/gallery/tattoo-1.jpg', cat: 'Realismo', alt: 'Realismo retrato', size: 'tall' },
  { id: 2, src: '/images/gallery/tattoo-2.jpg', cat: 'Fine Line', alt: 'Fine line floral', size: 'square' },
  { id: 3, src: '/images/gallery/tattoo-3.jpg', cat: 'Custom', alt: 'Custom design', size: 'square' },
  { id: 4, src: '/images/gallery/tattoo-4.jpg', cat: 'Realismo', alt: 'Realismo animal', size: 'tall' },
  { id: 5, src: '/images/gallery/tattoo-5.jpg', cat: 'Fine Line', alt: 'Fine line minimalista', size: 'square' },
  { id: 6, src: '/images/gallery/tattoo-6.jpg', cat: 'Microblading', alt: 'Microblading cejas', size: 'wide' },
  { id: 7, src: '/images/gallery/tattoo-7.jpg', cat: 'Custom', alt: 'Custom geométrico', size: 'square' },
  { id: 8, src: '/images/gallery/tattoo-8.jpg', cat: 'Realismo', alt: 'Realismo color', size: 'tall' },
  { id: 9, src: '/images/gallery/tattoo-9.jpg', cat: 'Micropigmentación', alt: 'Micropigmentación labios', size: 'square' },
  { id: 10, src: '/images/gallery/tattoo-10.jpg', cat: 'Fine Line', alt: 'Fine line geométrico', size: 'square' },
  { id: 11, src: '/images/gallery/tattoo-11.jpg', cat: 'Realismo', alt: 'Realismo B&N', size: 'tall' },
  { id: 12, src: '/images/gallery/tattoo-12.jpg', cat: 'Custom', alt: 'Custom personalizado', size: 'square' },
];

const gradients = ['from-[#150000] to-[#050505]', 'from-[#0a0a0a] to-[#150000]', 'from-[#111] to-[#0d0000]', 'from-[#0d0000] to-[#0a0a0a]'];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cat, setCat] = useState('Todos');
  const [lb, setLb] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);
  const lbRef = useRef<HTMLDivElement>(null);

  const filtered = cat === 'Todos' ? items : items.filter(i => i.cat === cat);

  const openLb = (i: number) => { setLbIdx(i); setLb(true); document.body.style.overflow = 'hidden'; };
  const closeLb = () => { setLb(false); document.body.style.overflow = ''; };
  const lbNext = () => setLbIdx(i => (i + 1) % filtered.length);
  const lbPrev = () => setLbIdx(i => (i - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (!lb) return; if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowRight') lbNext(); if (e.key === 'ArrowLeft') lbPrev(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [lb, filtered.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gal-item', { opacity: 0, scale: 0.96 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: { trigger: '.gal-grid', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [cat]);

  useEffect(() => {
    if (lb && lbRef.current) gsap.fromTo(lbRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
  }, [lb]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-14 sm:py-24 lg:py-32 bg-[#050505] border-t border-[#0f0f0f]" aria-label="Galería">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 border-b border-[#111] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#666] text-xs font-mono tracking-[0.3em]">06 /</span>
              <span className="text-[#8B0000] text-xs font-mono tracking-[0.4em] uppercase">Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
              Cada pieza,<br />
              <span className="text-gradient">una obra de arte</span>
            </h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  'px-3 py-1.5 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-200 border',
                  cat === c ? 'bg-[#8B0000] border-[#8B0000] text-[#E8E2D9]' : 'border-[#1a1a1a] text-[#555] hover:border-[#8B0000]/40 hover:text-[#E8E2D9]'
                )}
                aria-pressed={cat === c}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Masonry */}
        <div className="gal-grid masonry-grid">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="gal-item masonry-item group relative overflow-hidden cursor-pointer opacity-0 border border-[#111] hover:border-[#8B0000]/30 transition-colors duration-300"
              onClick={() => openLb(i)}
              role="button"
              tabIndex={0}
              aria-label={item.alt}
              onKeyDown={e => e.key === 'Enter' && openLb(i)}
            >
              <div className={`relative w-full bg-gradient-to-br ${gradients[i % 4]}`}
                style={{ paddingBottom: item.size === 'tall' ? '135%' : item.size === 'wide' ? '70%' : '100%' }}>
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/35 transition-all duration-400 flex items-center justify-center">
                  <ZoomIn size={24} className="text-[#E8E2D9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] font-mono tracking-widest uppercase bg-[#8B0000]/80 text-[#E8E2D9] px-2 py-0.5">{item.cat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-[#111] pt-8">
          <p className="text-[#555] text-xs font-mono">{filtered.length} obras · Instagram: @d.z.tattoo</p>
          <a href="https://www.instagram.com/d.z.tattoo" target="_blank" rel="noopener noreferrer"
            className="btn-outline-round inline-flex items-center gap-2 px-6 py-3 text-xs tracking-wider uppercase">
            Ver más trabajos
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div ref={lbRef} className="fixed inset-0 z-50 bg-[#050505]/96 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLb} role="dialog" aria-modal="true">
          <button className="absolute top-6 right-6 text-[#555] hover:text-[#E8E2D9] transition-colors z-10 border border-[#1a1a1a] p-2" onClick={closeLb} aria-label="Cerrar"><X size={20} /></button>
          <button className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#E8E2D9] border border-[#1a1a1a] p-3 z-10 transition-colors" onClick={e => { e.stopPropagation(); lbPrev(); }} aria-label="Anterior"><ChevronLeft size={22} /></button>
          <div className="relative max-w-3xl max-h-[85vh] w-full" onClick={e => e.stopPropagation()}>
            <div className={`relative w-full aspect-square bg-gradient-to-br ${gradients[lbIdx % 4]} border border-[#111]`}>
              <Image src={filtered[lbIdx]?.src ?? ''} alt={filtered[lbIdx]?.alt ?? ''} fill className="object-contain" sizes="80vw" priority
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div className="border border-[#111] border-t-0 bg-[#080808] px-6 py-3 flex items-center justify-between">
              <span className="text-[#555] text-[10px] font-mono tracking-widest uppercase">{filtered[lbIdx]?.cat}</span>
              <span className="text-[#555] text-[10px] font-mono">{lbIdx + 1} / {filtered.length}</span>
            </div>
          </div>
          <button className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#E8E2D9] border border-[#1a1a1a] p-3 z-10 transition-colors" onClick={e => { e.stopPropagation(); lbNext(); }} aria-label="Siguiente"><ChevronRight size={22} /></button>
        </div>
      )}
    </section>
  );
}
