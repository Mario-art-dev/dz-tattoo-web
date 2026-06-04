'use client';

import { useState, useRef, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Loader2, ArrowRight, Star, MessageCircle, CalendarDays, Sparkles, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  nombre: string; telefono: string; email: string;
  servicio: string; idea: string; zonaCorporal: string;
  tamano: string; fecha: string; hora: string;
  comentarios: string; privacidad: boolean;
};

const INITIAL: FormData = {
  nombre: '', telefono: '', email: '', servicio: '', idea: '',
  zonaCorporal: '', tamano: '', fecha: '', hora: '', comentarios: '', privacidad: false,
};

const SERVICIOS = ['Custom Tattoo', 'Realismo', 'Fine Line', 'Cover Up', 'Eliminación Láser', 'Joyería Dental (Tooth Gems)', 'Microblading', 'Micropigmentación', 'Consulta general'];
const TALLAS = ['XS — menos de 5cm', 'S — 5 a 10cm', 'M — 10 a 20cm', 'L — 20 a 30cm', 'XL — más de 30cm', 'Proyecto completo / Sleeve'];
const HORAS = ['10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00'];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');

  const update = (f: keyof FormData, v: string | boolean) => setForm(p => ({ ...p, [f]: v }));

  const handleDateChange = (v: string) => {
    if (!v) { update('fecha', ''); setDateError(''); return; }
    const d = new Date(v + 'T12:00:00');
    if (d.getDay() === 0) {
      setDateError('Los domingos el estudio está cerrado. Elige otro día.');
      update('fecha', '');
    } else {
      setDateError('');
      update('fecha', v);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bk-line', { yPercent: 110 }, {
        yPercent: 0, duration: 1.1, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.fromTo('.bk-sub', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      });
      gsap.fromTo('.bk-badge', { opacity: 0, scale: 0.92 }, {
        opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
      gsap.fromTo('.bk-trust', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.bk-trust-row', start: 'top 85%' },
      });
      gsap.fromTo('.bk-card', { opacity: 0, y: 35 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.bk-card-row', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacidad) { setError('Acepta la política de privacidad para continuar.'); return; }
    if (dateError) { setError(dateError); return; }
    setLoading(true); setError('');
    try {
      await addDoc(collection(db, 'citas'), { ...form, status: 'pendiente', createdAt: serverTimestamp() });
      setSuccess(true); setForm(INITIAL); setStep(1);
    } catch (err) {
      console.error(err);
      setError('Error al enviar. Contáctanos por WhatsApp y lo gestionamos enseguida.');
    } finally {
      setLoading(false);
    }
  };

  const labelClass = 'block text-[#777] text-[11px] tracking-[0.18em] uppercase mb-3 font-medium';

  if (success) {
    return (
      <section id="booking" className="relative py-20 sm:py-32 lg:py-44 bg-[#050505]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#0a2010] border border-[#1a5a30]/40 flex items-center justify-center mx-auto mb-10">
            <CheckCircle size={36} className="text-[#3a9a5a]" />
          </div>
          <h2 className="font-editorial text-5xl sm:text-6xl italic font-light mb-5 leading-tight">
            Solicitud enviada
          </h2>
          <p className="text-[#B0A89E] leading-relaxed mb-12 text-lg max-w-md mx-auto">
            Hemos recibido tu solicitud. Te contactamos en menos de 24 horas para confirmar todos los detalles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setSuccess(false)} className="btn-outline-round px-8 py-4 text-sm font-bold tracking-widest uppercase">
              Nueva reserva
            </button>
            <a href="https://wa.me/34722201072" target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-8 py-4 text-sm font-bold tracking-widest uppercase">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" ref={sectionRef} className="relative py-20 sm:py-32 lg:py-44 bg-[#050505] overflow-hidden" aria-label="Reservar cita">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#8B0000]/6 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B0000]/4 rounded-full blur-[100px] pointer-events-none translate-x-1/3" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 sm:mb-24 lg:mb-32">
          <div className="bk-badge mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2.5 bg-[#8B0000]/10 border border-[#8B0000]/20 text-[#E8E2D9] text-[10px] font-bold tracking-[0.35em] uppercase px-5 py-2.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3aaa5a] animate-pulse flex-shrink-0" />
              Agenda abierta · Últimas plazas esta semana
            </span>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="overflow-hidden mb-1">
              <h2 className="bk-line font-editorial text-[clamp(3.5rem,12vw,9rem)] italic font-light leading-[0.88] tracking-tight text-[#E8E2D9]">
                Tu obra maestra
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2 className="bk-line font-editorial text-[clamp(3.5rem,12vw,9rem)] italic font-light leading-[0.88] tracking-tight text-gradient">
                empieza aquí.
              </h2>
            </div>
          </div>

          <p className="bk-sub text-[#B0A89E] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Primera consulta completamente gratuita. Sin compromiso.{' '}
            <span className="text-[#E8E2D9]">Solo tu idea y nuestras manos.</span>
          </p>
        </div>

        {/* ── TRUST STRIP ── */}
        <div className="bk-trust-row grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
          {[
            { icon: Star, label: '5.0 Google', sub: '+50 opiniones reales' },
            { icon: CheckCircle, label: 'Consulta gratis', sub: 'Sin coste ni compromiso' },
            { icon: CalendarDays, label: 'Respuesta 24h', sub: 'Te confirmamos rápido' },
            { icon: Sparkles, label: 'Diseño exclusivo', sub: 'Arte 100% personalizado' },
          ].map((t) => (
            <div key={t.label} className="bk-trust flex items-center gap-3 border border-[#1a1a1a] rounded-2xl p-4 sm:p-5 hover:border-[#2a2a2a] transition-colors duration-300">
              <div className="w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center flex-shrink-0">
                <t.icon size={15} className="text-[#E8E2D9]" />
              </div>
              <div className="min-w-0">
                <p className="text-[#E8E2D9] text-xs font-bold leading-tight truncate">{t.label}</p>
                <p className="text-[#444] text-[10px] mt-0.5 hidden sm:block truncate">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="bk-card-row grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">

          {/* LEFT: Form */}
          <div className="bk-card lg:col-span-3">
            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-10 sm:mb-12">
              {[{ n: 1, label: 'Tus datos' }, { n: 2, label: 'Tu idea' }, { n: 3, label: 'Fecha' }].map((s, i) => (
                <div key={s.n} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2.5">
                    <div className={cn(
                      'w-8 h-8 rounded-full text-[11px] font-black flex items-center justify-center transition-all duration-400 flex-shrink-0',
                      step === s.n ? 'bg-[#E8E2D9] text-[#050505]' :
                      step > s.n ? 'bg-[#2a2a2a] text-[#E8E2D9]' : 'border border-[#222] text-[#333]'
                    )}>
                      {step > s.n ? '✓' : s.n}
                    </div>
                    <span className={cn(
                      'text-[10px] tracking-[0.18em] uppercase font-medium hidden sm:block transition-colors duration-300',
                      step === s.n ? 'text-[#E8E2D9]' : 'text-[#333]'
                    )}>{s.label}</span>
                  </div>
                  {i < 2 && (
                    <div className={cn('h-px flex-1 mx-3 transition-colors duration-500', step > s.n + 0 ? 'bg-[#2a2a2a]' : 'bg-[#151515]')} />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={submit} className="space-y-6">
              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
                      <input id="nombre" type="text" required value={form.nombre}
                        onChange={e => update('nombre', e.target.value)}
                        placeholder="Tu nombre completo"
                        className="input-pill" />
                    </div>
                    <div>
                      <label htmlFor="telefono" className={labelClass}>Teléfono *</label>
                      <input id="telefono" type="tel" required value={form.telefono}
                        onChange={e => update('telefono', e.target.value)}
                        placeholder="+34 600 000 000"
                        className="input-pill" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" type="email" required value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="input-pill" />
                  </div>
                  <button type="button" onClick={() => setStep(2)}
                    disabled={!form.nombre || !form.telefono || !form.email}
                    className="btn-primary-round w-full py-5 text-sm font-bold tracking-[0.15em] uppercase disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    Siguiente paso <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="servicio" className={labelClass}>¿Qué servicio buscas? *</label>
                    <select id="servicio" required value={form.servicio}
                      onChange={e => update('servicio', e.target.value)}
                      className="input-box cursor-pointer [color-scheme:dark]">
                      <option value="">Selecciona un servicio</option>
                      {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="idea" className={labelClass}>Cuéntanos tu idea *</label>
                    <textarea id="idea" required value={form.idea}
                      onChange={e => update('idea', e.target.value)}
                      placeholder="Describe tu idea: qué quieres, dónde, qué te inspira, referencias..."
                      rows={5}
                      className="input-box" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="zona" className={labelClass}>Zona corporal</label>
                      <input id="zona" type="text" value={form.zonaCorporal}
                        onChange={e => update('zonaCorporal', e.target.value)}
                        placeholder="Brazo, espalda, pierna..."
                        className="input-pill" />
                    </div>
                    <div>
                      <label htmlFor="tamano" className={labelClass}>Tamaño aprox.</label>
                      <select id="tamano" value={form.tamano}
                        onChange={e => update('tamano', e.target.value)}
                        className="input-box cursor-pointer [color-scheme:dark]">
                        <option value="">Selecciona tamaño</option>
                        {TALLAS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setStep(1)}
                      className="btn-outline-round flex-1 py-4 text-sm font-bold tracking-wider uppercase">
                      Atrás
                    </button>
                    <button type="button" onClick={() => setStep(3)}
                      disabled={!form.servicio || !form.idea}
                      className="btn-primary-round flex-[2] py-4 text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 disabled:opacity-30">
                      Siguiente <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fecha" className={labelClass}>Fecha preferida</label>
                      <input id="fecha" type="date" value={form.fecha}
                        onChange={e => handleDateChange(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="input-pill [color-scheme:dark]" />
                      {dateError && (
                        <p className="mt-2.5 text-[11px] text-[#ff7070] flex items-center gap-1.5">
                          <span>⚠</span> {dateError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="hora" className={labelClass}>Hora preferida</label>
                      <select id="hora" value={form.hora}
                        onChange={e => update('hora', e.target.value)}
                        className="input-box cursor-pointer [color-scheme:dark]">
                        <option value="">Selecciona hora</option>
                        {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comentarios" className={labelClass}>Algo más que añadir</label>
                    <textarea id="comentarios" value={form.comentarios}
                      onChange={e => update('comentarios', e.target.value)}
                      placeholder="Referencias, alergias, preguntas..."
                      rows={3}
                      className="input-box" />
                  </div>

                  <label className="flex items-start gap-3.5 cursor-pointer group">
                    <input type="checkbox" checked={form.privacidad}
                      onChange={e => update('privacidad', e.target.checked)}
                      className="mt-0.5 w-4 h-4 cursor-pointer accent-[#C41E1E] flex-shrink-0" required />
                    <span className="text-[#555] text-xs leading-relaxed group-hover:text-[#777] transition-colors">
                      Acepto la{' '}
                      <a href="/privacidad" className="text-[#B0A89E] hover:text-[#E8E2D9] underline underline-offset-2">Política de Privacidad</a>{' '}
                      y consiento el tratamiento de mis datos. *
                    </span>
                  </label>

                  {error && (
                    <div className="border border-[#C41E1E]/25 rounded-2xl px-5 py-4 bg-[#1a0000]/60">
                      <p className="text-[#FF6060] text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={() => setStep(2)}
                      className="btn-outline-round flex-1 py-4 text-sm font-bold tracking-wider uppercase">
                      Atrás
                    </button>
                    <button type="submit"
                      disabled={loading || !form.privacidad || !!dateError}
                      className="btn-cta flex-[2] py-5 disabled:opacity-30 disabled:cursor-not-allowed">
                      {loading
                        ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                        : <>Solicitar mi cita <ArrowRight size={16} /></>}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="bk-card lg:col-span-2 space-y-5">
            {/* WhatsApp card */}
            <div className="relative overflow-hidden rounded-3xl border border-[#1a3a20]/50 bg-gradient-to-br from-[#071410] to-[#050505] p-7 sm:p-8">
              <div className="absolute top-4 right-4 text-[#1a5a30]/12 text-[5rem] font-black select-none leading-none">WA</div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#1a5a30]/20 flex items-center justify-center mb-5">
                  <MessageCircle size={24} className="text-[#3aaa5a]" />
                </div>
                <p className="text-[#3aaa5a] text-[10px] font-mono tracking-[0.3em] uppercase mb-1">Respuesta en &lt; 2h</p>
                <h3 className="text-[#E8E2D9] text-xl font-black uppercase mb-2 leading-tight">
                  ¿Prefieres WhatsApp?
                </h3>
                <p className="text-[#B0A89E] text-sm leading-relaxed mb-6">
                  Escríbenos directamente. Es la forma más rápida de empezar.
                </p>
                <a href="https://wa.me/34722201072?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20un%20tatuaje"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-whatsapp w-full py-4 text-sm font-bold tracking-[0.12em] uppercase justify-center">
                  <MessageCircle size={16} /> +34 722 20 10 72
                </a>
              </div>
            </div>

            {/* Review snippet */}
            <div className="rounded-3xl border border-[#1a1a1a] bg-[#080808] p-7">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#8B0000] text-[#8B0000]" />
                ))}
              </div>
              <p className="text-[#B0A89E] text-sm italic leading-relaxed mb-5">
                &ldquo;Dani entendió exactamente lo que quería. El resultado superó todas mis expectativas. El proceso completo fue impecable.&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-[#111] pt-4">
                <div className="w-7 h-7 rounded-full border border-[#8B0000]/25 flex items-center justify-center">
                  <span className="text-[#8B0000] text-[10px] font-black">M</span>
                </div>
                <div>
                  <p className="text-[#E8E2D9] text-xs font-bold">María G.</p>
                  <p className="text-[#444] text-[10px] font-mono">Realismo · 2024</p>
                </div>
              </div>
            </div>

            {/* Trust micro */}
            <div className="rounded-2xl border border-[#111] px-5 py-4 flex items-center gap-3">
              <Shield size={14} className="text-[#555] flex-shrink-0" />
              <p className="text-[#444] text-[10px] leading-relaxed">
                Tus datos están protegidos. Solo se usan para gestionar tu cita.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
