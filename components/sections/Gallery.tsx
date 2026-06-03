'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Todos', 'Realismo', 'Fine Line', 'Custom', 'Microblading', 'Micropigmentación'];

const galleryItems = [
  { id: 1, src: '/images/gallery/tattoo-1.jpg', category: 'Realismo', alt: 'Tatuaje realismo retrato' },
  { id: 2, src: '/images/gallery/tattoo-2.jpg', category: 'Fine Line', alt: 'Tatuaje fine line floral' },
  { id: 3, src: '/images/gallery/tattoo-3.jpg', category: 'Custom', alt: 'Tatuaje custom diseño exclusivo' },
  { id: 4, src: '/images/gallery/tattoo-4.jpg', category: 'Realismo', alt: 'Tatuaje realismo animal' },
  { id: 5, src: '/images/gallery/tattoo-5.jpg', category: 'Fine Line', alt: 'Tatuaje fine line minimalista' },
  { id: 6, src: '/images/gallery/tattoo-6.jpg', category: 'Microblading', alt: 'Microblading cejas naturales' },
  { id: 7, src: '/images/gallery/tattoo-7.jpg', category: 'Custom', alt: 'Custom tattoo geométrico' },
  { id: 8, src: '/images/gallery/tattoo-8.jpg', category: 'Realismo', alt: 'Realismo en color' },
  { id: 9, src: '/images/gallery/tattoo-9.jpg', category: 'Micropigmentación', alt: 'Micropigmentación labios' },
  { id: 10, src: '/images/gallery/tattoo-10.jpg', category: 'Fine Line', alt: 'Fine line geométrico' },
  { id: 11, src: '/images/gallery/tattoo-11.jpg', category: 'Realismo', alt: 'Realismo blanco y negro' },
  { id: 12, src: '/images/gallery/tattoo-12.jpg', category: 'Custom', alt: 'Diseño personalizado' },
];

// Gradient fallbacks for gallery items
const gradients = [
  'from-[#1a0000] to-[#050505]',
  'from-[#0a0a0a] to-[#1a0000]',
  'from-[#111] to-[#0d0000]',
  'from-[#1a0000] to-[#0a0a0a]',
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'Todos'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => setLightboxIndex((i) => (i + 1) % filtered.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, filtered.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.masonry-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);

  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      gsap.fromTo(lightboxRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    }
  }, [lightboxOpen]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-32 bg-[#050505]"
      aria-label="Galería de trabajos"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Portfolio</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            Cada pieza,<br />
            <span className="text-gradient">una obra de arte</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#8B0000] border-[#8B0000] text-[#E8E2D9]'
                  : 'border-[#2a2a2a] text-[#B0A89E] hover:border-[#8B0000]/50 hover:text-[#E8E2D9]'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className="gallery-item masonry-item group relative overflow-hidden cursor-pointer opacity-0"
              onClick={() => openLightbox(index)}
              role="button"
              aria-label={`Ver ${item.alt}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >
              <div className={`relative w-full bg-gradient-to-br ${gradients[index % gradients.length]}`}
                style={{ paddingBottom: index % 3 === 0 ? '140%' : index % 3 === 1 ? '100%' : '120%' }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#050505]/0 group-hover:bg-[#050505]/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn size={32} className="text-[#E8E2D9]" />
                  </div>
                </div>
                {/* Category tag */}
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] tracking-widest uppercase bg-[#8B0000]/80 text-[#E8E2D9] px-2 py-1">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/d.z.tattoo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase"
          >
            Ver más en Instagram
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Visor de imagen"
          aria-modal="true"
        >
          <button
            className="absolute top-6 right-6 text-[#E8E2D9] hover:text-[#8B0000] transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#E8E2D9] hover:text-[#8B0000] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className="relative max-w-3xl max-h-[80vh] w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative w-full aspect-square bg-gradient-to-br ${gradients[lightboxIndex % gradients.length]}`}>
              <Image
                src={filtered[lightboxIndex]?.src ?? ''}
                alt={filtered[lightboxIndex]?.alt ?? ''}
                fill
                className="object-contain"
                sizes="80vw"
                priority
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-[#B0A89E] text-xs tracking-widest uppercase">
                {filtered[lightboxIndex]?.category} · {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#E8E2D9] hover:text-[#8B0000] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
