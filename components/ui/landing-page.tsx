'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Calendar, Clock, X, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

const SERVICES_QUICK = ['Custom Tattoo', 'Realismo', 'Fine Line', 'Cover Up', 'Microblading', 'Micropigmentación', 'Tooth Gems', 'Láser'];

const DZ_LETTERS = ['D', 'Z'];
const TATTOO_LETTERS = ['T', 'a', 't', 't', 'o', 'o'];

const STATUS_MAP: Record<string, { label: string; dot: string; text: string }> = {
  pendiente:  { label: 'Pendiente de confirmación', dot: 'bg-amber-400',  text: 'text-amber-400' },
  confirmado: { label: 'Confirmada',                 dot: 'bg-emerald-400', text: 'text-emerald-400' },
  cancelado:  { label: 'Cancelada',                  dot: 'bg-zinc-600',   text: 'text-zinc-500' },
};

type ActiveBooking = {
  id: string; nombre: string; servicio: string;
  fecha: string; hora: string; telefono: string; email: string; status: string;
  idea?: string; zonaCorporal?: string; tamano?: string; comentarios?: string;
};

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ActiveBooking[]>([]);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelledIds, setCancelledIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.h-char', { yPercent: 115 });
      gsap.set(['.h-badge', '.h-sub-line', '.h-sub'], { opacity: 0 });
      gsap.set('.h-cta', { opacity: 0, y: 15 });

      const tl = gsap.timeline({ delay: 1.8 });
      tl.to('.h-badge', { opacity: 1, duration: 0.75, ease: 'power2.out' })
        .to('.h-char', { yPercent: 0, duration: 0.9, stagger: 0.075, ease: 'power4.out' }, '-=0.45')
        .to('.h-sub-line', { opacity: 1, duration: 0.75, ease: 'power2.out' }, '-=0.53')
        .to('.h-sub', { opacity: 1, duration: 0.68, ease: 'power2.out' }, '-=0.45')
        .to('.h-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.38');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Mouse parallax — desktop only
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.innerWidth < 768) return;

    const orb1      = hero.querySelector<HTMLElement>('.h-orb-1');
    const orb2      = hero.querySelector<HTMLElement>('.h-orb-2');
    const headline  = hero.querySelector<HTMLElement>('.h-headline');
    const watermark = hero.querySelector<HTMLElement>('.h-watermark');

    if (!orb1 || !orb2 || !headline) return;

    const xOrb1 = gsap.quickTo(orb1,     'x', { duration: 2.2, ease: 'power3.out' });
    const yOrb1 = gsap.quickTo(orb1,     'y', { duration: 2.2, ease: 'power3.out' });
    const xOrb2 = gsap.quickTo(orb2,     'x', { duration: 2.8, ease: 'power3.out' });
    const yOrb2 = gsap.quickTo(orb2,     'y', { duration: 2.8, ease: 'power3.out' });
    const xHead = gsap.quickTo(headline, 'x', { duration: 1.1, ease: 'power3.out' });
    const yHead = gsap.quickTo(headline, 'y', { duration: 1.1, ease: 'power3.out' });
    const xWm   = watermark ? gsap.quickTo(watermark, 'x', { duration: 3.2, ease: 'power3.out' }) : null;
    const yWm   = watermark ? gsap.quickTo(watermark, 'y', { duration: 3.2, ease: 'power3.out' }) : null;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth  - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      xOrb1(x *  45);  yOrb1(y *  30);
      xOrb2(x * -28);  yOrb2(y * -20);
      xHead(x *  14);  yHead(y *   8);
      xWm?.(x * -20);  yWm?.(y *  14);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Magnetic CTA button
  const onCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ctaRef.current) return;
    const r = ctaRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.22;
    const y = (e.clientY - r.top  - r.height / 2) * 0.22;
    gsap.to(ctaRef.current, { x, y, duration: 0.35, ease: 'power2.out' });
  };
  const onCtaLeave = () => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.5)' });
  };

  // Bookings
  useEffect(() => {
    if (!user) { setBookings([]); return; }
    getDocs(query(collection(db, 'citas'), where('userId', '==', user.uid)))
      .then(snap => {
        const active = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as ActiveBooking))
          .filter(b => b.status !== 'cancelado');
        setBookings(active);
        setCancelledIds(new Set());
      })
      .catch(() => {});
  }, [user]);

  const cancelBooking = async (b: ActiveBooking) => {
    if (cancellingId) return;
    setCancellingId(b.id);
    try {
      await updateDoc(doc(db, 'citas', b.id), { status: 'cancelado' });
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: b.email, type: 'cancel', data: b }),
      }).catch(() => {});
      setCancelledIds(prev => new Set([...prev, b.id]));
      setTimeout(() => setBookings(prev => prev.filter(x => x.id !== b.id)), 2000);
    } catch { /* empty */ } finally { setCancellingId(null); }
  };

  const formatDate = (s: string) => {
    if (!s) return '';
    try { const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; } catch { return s; }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col bg-[#111111] overflow-hidden"
      aria-label="D.Z Tattoo Studio"
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="h-orb-1 absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#8B0000]/14 rounded-full blur-[120px]" />
        <div className="h-orb-2 absolute bottom-0 -left-20 w-[350px] h-[350px] bg-[#8B0000]/8 rounded-full blur-[100px]" />
        <span className="h-watermark absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 text-[#8B0000]/[0.03] text-[18rem] sm:text-[26rem] font-black select-none leading-none">
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

        {/* Headline — parallax layer */}
        <h1 className="h-headline mb-3 sm:mb-4">
          <div className="overflow-hidden leading-[0.88]">
            {DZ_LETTERS.map((char, i) => (
              <span key={i} className="h-char text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.88] tracking-tight text-[#E8E2D9] inline-block">
                {char}
              </span>
            ))}
          </div>
          <div className="overflow-hidden leading-[0.88]">
            {TATTOO_LETTERS.map((char, i) => (
              <span key={i} className="h-char text-[clamp(4rem,16vw,10rem)] font-black uppercase leading-[0.88] tracking-tight text-gradient inline-block">
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

        {/* CTA — magnetic */}
        <div className="h-cta mb-10 sm:mb-14 w-full sm:max-w-md">
          <a
            ref={ctaRef}
            href="#booking-form"
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
            onClick={e => { e.preventDefault(); document.querySelector('#booking-form')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-cta w-full px-8 py-5 text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-center justify-center flex items-center gap-2"
          >
            Reservar cita gratis <ArrowRight size={16} className="flex-shrink-0" />
          </a>

          {/* Active bookings */}
          {bookings.length > 0 && (
            <div className="mt-10 space-y-3">
              <p className="text-[#444] text-[9px] font-mono tracking-[0.3em] uppercase mb-3">
                {bookings.length === 1 ? 'Tu reserva activa' : `Tus ${bookings.length} reservas activas`}
              </p>

              {bookings.map(b => {
                const cfg = STATUS_MAP[b.status] ?? STATUS_MAP.pendiente;
                const isExpanded = expandedId === b.id;
                const isCancelled = cancelledIds.has(b.id);
                const isCancelling = cancellingId === b.id;

                const detailRows = [
                  { label: 'Nombre',       value: b.nombre },
                  { label: 'Servicio',     value: b.servicio },
                  { label: 'Fecha',        value: formatDate(b.fecha) },
                  { label: 'Hora',         value: b.hora },
                  { label: 'Teléfono',     value: b.telefono },
                  { label: 'Email',        value: b.email },
                  b.zonaCorporal ? { label: 'Zona corporal', value: b.zonaCorporal } : null,
                  b.tamano       ? { label: 'Tamaño',        value: b.tamano }       : null,
                  b.idea         ? { label: 'Idea',          value: b.idea }         : null,
                  b.comentarios  ? { label: 'Comentarios',   value: b.comentarios }  : null,
                ].filter(Boolean) as { label: string; value: string }[];

                return (
                  <div key={b.id} className="border border-[#1e1e1e] bg-[#151515] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : b.id)}
                      className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-[#1a1a1a] transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#E8E2D9] text-sm font-bold truncate">{b.servicio}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          {b.fecha && (
                            <span className="text-[#555] text-[10px] font-mono flex items-center gap-1">
                              <Calendar size={9} /> {formatDate(b.fecha)}
                            </span>
                          )}
                          {b.hora && (
                            <span className="text-[#555] text-[10px] font-mono flex items-center gap-1">
                              <Clock size={9} /> {b.hora}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`text-[9px] font-mono tracking-widest uppercase ${cfg.text} flex-shrink-0 hidden sm:block`}>
                        {cfg.label}
                      </span>
                      {isExpanded
                        ? <ChevronUp size={14} className="text-[#555] flex-shrink-0" />
                        : <ChevronDown size={14} className="text-[#555] flex-shrink-0" />
                      }
                    </button>

                    {isExpanded && (
                      <div className="border-t border-[#1e1e1e] px-5 pb-4">
                        <div className="pt-3 space-y-2.5">
                          {detailRows.map(({ label, value }) => (
                            <div key={label} className="flex justify-between gap-4">
                              <span className="text-[#444] text-[10px] font-mono tracking-[0.15em] uppercase flex-shrink-0">{label}</span>
                              <span className="text-[#B0A89E] text-[10px] text-right break-words max-w-[65%]">{value || '—'}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#1e1e1e]">
                          {isCancelled ? (
                            <p className="text-zinc-500 text-[10px] font-mono tracking-wider">Reserva cancelada</p>
                          ) : (
                            <button
                              onClick={() => cancelBooking(b)}
                              disabled={!!cancellingId}
                              className="flex items-center gap-1.5 text-[#8B0000] hover:text-[#C41E1E] text-[10px] font-mono tracking-[0.2em] uppercase transition-colors disabled:opacity-50"
                            >
                              {isCancelling ? <Loader2 size={10} className="animate-spin" /> : <X size={10} />}
                              {isCancelling ? 'Cancelando...' : 'Cancelar reserva'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Services strip */}
      <div className="relative z-10 border-t border-[#1b1b1b] py-3.5">
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
