'use client';

import { useState, useRef, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Loader2, ArrowRight, Star, MessageCircle, Phone, CalendarDays, Sparkles } from 'lucide-react';
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

const TRUST_ITEMS = [
  { icon: Star, label: '5.0 Google Reviews', sub: '+50 opiniones verificadas' },
  { icon: CheckCircle, label: 'Consulta gratuita', sub: 'Sin compromiso ni coste' },
  { icon: CalendarDays, label: 'Respuesta en 24h', sub: 'Te contactamos rápido' },
  { icon: Sparkles, label: 'Diseño exclusivo', sub: 'Arte 100% personalizado' },
];

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
      setDateError('Los domingos el estudio está cerrado. Por favor elige otro día.');
      update('fecha', '');
    } else {
      setDateError('');
      update('fecha', v);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bk-reveal', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.to('.booking-glow', {
        boxShadow: '0 0 80px rgba(196,30,30,0.5), 0 0 160px rgba(139,0,0,0.25)',
        repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut',
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

  const inputClass = 'w-full bg-[#080808] border border-[#1e1e1e] focus:border-[#555] text-[#E8E2D9] placeholder-[#3a3a3a] px-5 py-4 text-sm transition-all duration-200 outline-none rounded-2xl';
  const labelClass = 'block text-[#B0A89E] text-xs tracking-[0.15em] uppercase mb-2.5 font-semibold';

  if (success) {
    return (
      <section id="booking" className="relative py-20 sm:py-32 lg:py-44 bg-[#050505]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-24 h-24 rounded-full bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} className="text-[#B0A89E]" />
          </div>
          <h2 className="text-4xl font-black uppercase mb-4">¡Solicitud enviada!</h2>
          <p className="text-[#B0A89E] leading-relaxed mb-10 text-lg">
            Hemos recibido tu solicitud. Te contactaremos en menos de 24 horas para confirmar los detalles y darte fecha definitiva.
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
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8B0000]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B0000]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{ backgroundImage: 'linear-gradient(rgba(232,226,217,1) 1px,transparent 1px),linear-gradient(90deg,rgba(232,226,217,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-18 bk-reveal">
          <span className="inline-flex items-center gap-2 bg-[#8B0000]/12 border border-[#8B0000]/25 text-[#E8E2D9] text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase px-5 py-2.5 rounded-full mb-6 sm:mb-8">
            <Sparkles size={11} className="flex-shrink-0" />
            Primera consulta 100% gratuita
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.88] tracking-tight mb-5 sm:mb-6">
            Tu arte te<br />
            <span className="text-gradient">está esperando</span>
          </h2>
          <p className="text-[#B0A89E] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Cuéntanos tu idea. Nuestros artistas crearán algo único que llevarás con orgullo para siempre.
          </p>
        </div>

        {/* Trust badges — horizontal on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12 bk-reveal">
          {TRUST_ITEMS.map((t) => (
            <div key={t.label} className="bg-[#080808] border border-[#1a1a1a] rounded-2xl p-3.5 sm:p-5 flex items-center gap-2.5 sm:gap-3 hover:border-[#333] transition-colors duration-300">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                <t.icon size={14} className="text-[#E8E2D9]" />
              </div>
              <div className="min-w-0">
                <p className="text-[#E8E2D9] text-[10px] sm:text-xs font-bold leading-tight">{t.label}</p>
                <p className="text-[#555] text-[9px] sm:text-[10px] mt-0.5 hidden sm:block truncate">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          {/* LEFT: Form card */}
          <div className="lg:col-span-3 bk-reveal">
            <div className="bg-[#080808] border border-[#1a1a1a] rounded-3xl p-6 sm:p-8">
              {/* Step indicator */}
              <div className="flex items-center gap-2 sm:gap-3 mb-8">
                {[
                  { n: 1, label: 'Tus datos' },
                  { n: 2, label: 'Tu proyecto' },
                  { n: 3, label: 'Fecha' },
                ].map((s, i) => (
                  <div key={s.n} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-black flex items-center justify-center transition-all duration-300 flex-shrink-0',
                        step === s.n ? 'bg-white text-[#0a0a0a]' :
                        step > s.n ? 'bg-[#2a2a2a] text-[#E8E2D9]' :
                        'bg-[#141414] text-[#444] border border-[#222]'
                      )}>
                        {step > s.n ? '✓' : s.n}
                      </div>
                      <span className={cn(
                        'text-[10px] font-mono tracking-wider uppercase hidden sm:block transition-colors duration-300',
                        step === s.n ? 'text-[#E8E2D9]' : 'text-[#444]'
                      )}>{s.label}</span>
                    </div>
                    {i < 2 && <div className={cn('h-px flex-1 min-w-[16px] max-w-[32px] transition-colors duration-500', step > s.n ? 'bg-[#333]' : 'bg-[#1a1a1a]')} />}
                  </div>
                ))}
              </div>

            <form onSubmit={submit} className="space-y-5">
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
                      <input id="nombre" type="text" required value={form.nombre} onChange={e => update('nombre', e.target.value)} placeholder="Tu nombre" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="telefono" className={labelClass}>Teléfono *</label>
                      <input id="telefono" type="tel" required value={form.telefono} onChange={e => update('telefono', e.target.value)} placeholder="+34 600 000 000" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="tu@email.com" className={inputClass} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!form.nombre || !form.telefono || !form.email}
                    className="btn-primary-round w-full py-4 text-sm font-bold tracking-[0.15em] uppercase disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuar <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="servicio" className={labelClass}>¿Qué servicio buscas? *</label>
                    <select id="servicio" required value={form.servicio} onChange={e => update('servicio', e.target.value)} className={`${inputClass} cursor-pointer`}>
                      <option value="">Selecciona un servicio</option>
                      {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="idea" className={labelClass}>Cuéntanos tu idea *</label>
                    <textarea id="idea" required value={form.idea} onChange={e => update('idea', e.target.value)} placeholder="Describe tu idea: qué quieres, dónde, qué te inspira..." rows={4} className={`${inputClass} resize-none`} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="zona" className={labelClass}>Zona corporal</label>
                      <input id="zona" type="text" value={form.zonaCorporal} onChange={e => update('zonaCorporal', e.target.value)} placeholder="Brazo, espalda, pierna..." className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="tamano" className={labelClass}>Tamaño aprox.</label>
                      <select id="tamano" value={form.tamano} onChange={e => update('tamano', e.target.value)} className={`${inputClass} cursor-pointer`}>
                        <option value="">Selecciona tamaño</option>
                        {TALLAS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline-round flex-1 py-4 text-sm font-bold tracking-wider uppercase">Atrás</button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!form.servicio || !form.idea}
                      className="btn-primary-round flex-[2] py-4 text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fecha" className={labelClass}>Fecha preferida</label>
                      <input id="fecha" type="date" value={form.fecha} onChange={e => handleDateChange(e.target.value)} min={new Date().toISOString().split('T')[0]} className={`${inputClass} [color-scheme:dark]`} />
                      {dateError && (
                        <p className="mt-2 text-[11px] text-[#ff8080] font-medium flex items-center gap-1.5">
                          <span>⚠</span> {dateError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="hora" className={labelClass}>Hora preferida</label>
                      <select id="hora" value={form.hora} onChange={e => update('hora', e.target.value)} className={`${inputClass} cursor-pointer`}>
                        <option value="">Selecciona hora</option>
                        {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comentarios" className={labelClass}>¿Algo más que quieras añadir?</label>
                    <textarea id="comentarios" value={form.comentarios} onChange={e => update('comentarios', e.target.value)} placeholder="Referencias, alergias, preguntas..." rows={3} className={`${inputClass} resize-none`} />
                  </div>

                  {/* Privacy */}
                  <div className="flex items-start gap-3 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4">
                    <input id="privacidad" type="checkbox" checked={form.privacidad} onChange={e => update('privacidad', e.target.checked)} className="mt-1 cursor-pointer accent-[#C41E1E] w-4 h-4" required />
                    <label htmlFor="privacidad" className="text-[#B0A89E] text-xs leading-relaxed cursor-pointer">
                      Acepto la{' '}
                      <a href="/privacidad" className="text-[#E8E2D9] hover:underline font-medium">Política de Privacidad</a>{' '}
                      y consiento el tratamiento de mis datos para gestionar mi solicitud. *
                    </label>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 bg-[#1a0000] border border-[#C41E1E]/30 rounded-2xl px-5 py-4">
                      <p className="text-[#FF6060] text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)} className="btn-outline-round flex-1">Atrás</button>
                    <button
                      type="submit"
                      disabled={loading || !form.privacidad || !!dateError}
                      className="btn-cta flex-[2] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : <>Solicitar mi cita <ArrowRight size={16} /></>}
                    </button>
                  </div>
                </div>
              )}
            </form>
            </div>{/* end card */}
          </div>

          {/* RIGHT: Sidebar persuasion */}
          <div className="lg:col-span-2 space-y-6 bk-reveal">
            {/* Big CTA highlight */}
            <div className="booking-glow relative rounded-3xl overflow-hidden border border-[#8B0000]/30 bg-gradient-to-br from-[#0d0000] via-[#0a0000] to-[#050505] p-8 text-center">
              <div className="absolute inset-0 bg-[#8B0000]/5 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[#B0A89E] text-xs font-mono tracking-[0.4em] uppercase mb-3">¿Tienes prisa?</p>
                <h3 className="text-[#E8E2D9] text-2xl font-black uppercase mb-3 leading-tight">
                  Escríbenos ahora por WhatsApp
                </h3>
                <p className="text-[#B0A89E] text-sm mb-6">Respuesta garantizada en menos de 2 horas</p>
                <a
                  href="https://wa.me/34722201072?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20un%20tatuaje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full py-4 text-sm font-bold tracking-[0.15em] uppercase"
                >
                  <MessageCircle size={18} />
                  Abrir WhatsApp
                </a>
                <a href="tel:+34722201072" className="flex items-center justify-center gap-2 mt-4 text-[#555] text-xs font-mono hover:text-[#E8E2D9] transition-colors">
                  <Phone size={12} />
                  +34 722 20 10 72
                </a>
              </div>
            </div>

            {/* Social proof */}
            <div className="border border-[#111] rounded-2xl bg-[#080808] p-6">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#8B0000] text-[#B0A89E]" />)}
                <span className="text-[#E8E2D9] font-black ml-1">5.0</span>
              </div>
              <blockquote className="text-[#B0A89E] text-sm italic leading-relaxed mb-4">
                &ldquo;El mejor estudio de Valencia. Profesionalismo absoluto, trato personal increíble y resultados de otro nivel.&rdquo;
              </blockquote>
              <p className="text-[#555] text-xs font-mono">— Carlos M. · Custom Tattoo · 2024</p>
            </div>

            {/* Guarantee box */}
            <div className="border border-[#111] rounded-2xl bg-[#080808] p-6 space-y-4">
              <p className="text-[#E8E2D9] font-bold text-sm uppercase tracking-wide">Nuestra garantía</p>
              {[
                '✓ Consulta inicial 100% gratuita',
                '✓ Diseño exclusivo incluido',
                '✓ Revisión gratuita a las 6-8 semanas',
                '✓ Material nuevo en cada sesión',
                '✓ Sin sorpresas en el precio',
              ].map(item => (
                <p key={item} className="text-[#B0A89E] text-xs leading-relaxed">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
