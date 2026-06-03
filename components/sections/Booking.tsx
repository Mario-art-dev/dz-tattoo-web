'use client';

import { useState, useRef, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  idea: string;
  zonaCorporal: string;
  tamano: string;
  fecha: string;
  hora: string;
  comentarios: string;
  privacidad: boolean;
};

const initialForm: FormData = {
  nombre: '',
  telefono: '',
  email: '',
  servicio: '',
  idea: '',
  zonaCorporal: '',
  tamano: '',
  fecha: '',
  hora: '',
  comentarios: '',
  privacidad: false,
};

const servicios = [
  'Custom Tattoo',
  'Realismo',
  'Fine Line',
  'Cover Up',
  'Eliminación Láser',
  'Joyería Dental (Tooth Gems)',
  'Microblading',
  'Micropigmentación',
  'Consulta general',
];

const tallas = ['XS (menos de 5cm)', 'S (5-10cm)', 'M (10-20cm)', 'L (20-30cm)', 'XL (30cm+)', 'Full sleeve / proyecto'];

const horas = ['10:00', '11:00', '12:00', '13:00', '16:00', '17:00', '18:00', '19:00'];

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacidad) {
      setError('Debes aceptar la política de privacidad para continuar.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'citas'), {
        nombre: form.nombre,
        telefono: form.telefono,
        email: form.email,
        servicio: form.servicio,
        idea: form.idea,
        zonaCorporal: form.zonaCorporal,
        tamano: form.tamano,
        fecha: form.fecha,
        hora: form.hora,
        comentarios: form.comentarios,
        status: 'pendiente',
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setForm(initialForm);
      setStep(1);
    } catch (err) {
      console.error(err);
      setError('Error al enviar la solicitud. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-[#0d0d0d] border border-[#2a2a2a] focus:border-[#8B0000] text-[#E8E2D9] placeholder-[#555] px-4 py-3 text-sm transition-colors duration-200 outline-none';

  const labelClass = 'block text-[#B0A89E] text-xs tracking-[0.15em] uppercase mb-2';

  if (success) {
    return (
      <section id="booking" className="relative py-32 bg-[#080808]" aria-label="Reserva exitosa">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-[#8B0000]" />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4 text-[#E8E2D9]">¡Solicitud enviada!</h2>
          <p className="text-[#B0A89E] leading-relaxed mb-8">
            Hemos recibido tu solicitud de cita. Te contactaremos en menos de 24 horas para confirmar todos los detalles.
            También puedes contactarnos directamente por WhatsApp si tienes alguna urgencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSuccess(false)}
              className="btn-outline px-8 py-3 text-sm tracking-wider uppercase"
            >
              Nueva reserva
            </button>
            <a
              href="https://wa.me/34722201072"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3 text-sm tracking-wider uppercase"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-32 bg-[#080808] overflow-hidden"
      aria-label="Reservar cita"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 booking-reveal">
          <span className="text-[#8B0000] text-xs tracking-[0.4em] uppercase">Reservas</span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase mt-4 leading-tight">
            Reserva tu<br />
            <span className="text-gradient">experiencia</span>
          </h2>
          <p className="text-[#B0A89E] max-w-md mx-auto mt-4 text-sm leading-relaxed">
            Rellena el formulario y nos pondremos en contacto contigo en menos de 24 horas para confirmar todos los detalles.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-12 booking-reveal">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 border text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                step === s ? 'border-[#8B0000] bg-[#8B0000] text-white' :
                step > s ? 'border-[#8B0000] bg-[#8B0000]/20 text-[#8B0000]' :
                'border-[#2a2a2a] text-[#555]'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`h-px w-8 transition-colors duration-300 ${step > s ? 'bg-[#8B0000]' : 'bg-[#2a2a2a]'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="booking-reveal">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-8">Tus datos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className={labelClass}>Nombre completo *</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className={labelClass}>Teléfono *</label>
                  <input
                    id="telefono"
                    type="tel"
                    required
                    value={form.telefono}
                    onChange={(e) => update('telefono', e.target.value)}
                    placeholder="+34 600 000 000"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!form.nombre || !form.telefono || !form.email}
                  className="btn-primary px-8 py-3 text-sm tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-8">Tu proyecto</h3>
              <div>
                <label htmlFor="servicio" className={labelClass}>Servicio *</label>
                <select
                  id="servicio"
                  required
                  value={form.servicio}
                  onChange={(e) => update('servicio', e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="idea" className={labelClass}>Cuéntanos tu idea *</label>
                <textarea
                  id="idea"
                  required
                  value={form.idea}
                  onChange={(e) => update('idea', e.target.value)}
                  placeholder="Describe tu idea, inspiración, referencias que tengas..."
                  rows={4}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="zonaCorporal" className={labelClass}>Zona corporal</label>
                  <input
                    id="zonaCorporal"
                    type="text"
                    value={form.zonaCorporal}
                    onChange={(e) => update('zonaCorporal', e.target.value)}
                    placeholder="Brazo, espalda, pierna..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="tamano" className={labelClass}>Tamaño aproximado</label>
                  <select
                    id="tamano"
                    value={form.tamano}
                    onChange={(e) => update('tamano', e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Selecciona tamaño</option>
                    {tallas.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(1)} className="btn-outline px-6 py-3 text-sm tracking-wider uppercase">
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!form.servicio || !form.idea}
                  className="btn-primary px-8 py-3 text-sm tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-[#E8E2D9] font-bold uppercase tracking-wider mb-8">Fecha y confirmación</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fecha" className={labelClass}>Fecha preferida</label>
                  <input
                    id="fecha"
                    type="date"
                    value={form.fecha}
                    onChange={(e) => update('fecha', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
                <div>
                  <label htmlFor="hora" className={labelClass}>Hora preferida</label>
                  <select
                    id="hora"
                    value={form.hora}
                    onChange={(e) => update('hora', e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Selecciona hora</option>
                    {horas.map((h) => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="comentarios" className={labelClass}>Comentarios adicionales</label>
                <textarea
                  id="comentarios"
                  value={form.comentarios}
                  onChange={(e) => update('comentarios', e.target.value)}
                  placeholder="¿Algo más que quieras contarnos?"
                  rows={3}
                  className={inputClass}
                />
              </div>

              {/* Privacy */}
              <div className="flex items-start gap-3 pt-4">
                <input
                  id="privacidad"
                  type="checkbox"
                  checked={form.privacidad}
                  onChange={(e) => update('privacidad', e.target.checked)}
                  className="mt-1 cursor-pointer accent-[#8B0000]"
                  required
                />
                <label htmlFor="privacidad" className="text-[#B0A89E] text-xs leading-relaxed cursor-pointer">
                  Acepto la{' '}
                  <a href="/privacidad" className="text-[#8B0000] hover:underline">
                    Política de Privacidad
                  </a>{' '}
                  y consiento el tratamiento de mis datos personales para gestionar mi solicitud de cita. *
                </label>
              </div>

              {error && (
                <p className="text-[#C41E1E] text-sm border border-[#C41E1E]/30 bg-[#C41E1E]/10 px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex justify-between mt-8">
                <button type="button" onClick={() => setStep(2)} className="btn-outline px-6 py-3 text-sm tracking-wider uppercase">
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={loading || !form.privacidad}
                  className="btn-primary flex items-center gap-3 px-8 py-3 text-sm tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Solicitar cita'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* WhatsApp alternative */}
        <div className="mt-16 text-center border-t border-[#1a1a1a] pt-12 booking-reveal">
          <p className="text-[#B0A89E] text-sm mb-4">¿Prefieres contactarnos directamente?</p>
          <a
            href="https://wa.me/34722201072?text=Hola,%20me%20gustaría%20pedir%20información%20sobre%20un%20tatuaje"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3 px-6 py-3 text-sm tracking-wider uppercase"
          >
            WhatsApp: +34 722 20 10 72
          </a>
        </div>
      </div>
    </section>
  );
}
