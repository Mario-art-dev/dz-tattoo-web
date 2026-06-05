'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { X, Calendar, Clock, Loader2 } from 'lucide-react';

type StoredBooking = {
  id: string;
  nombre: string;
  servicio: string;
  fecha: string;
  hora: string;
  telefono: string;
  email: string;
  status: string;
};

const STATUS_MAP: Record<string, { label: string; dot: string; text: string }> = {
  pendiente:  { label: 'Pendiente de confirmación', dot: 'bg-amber-400',  text: 'text-amber-400' },
  confirmado: { label: 'Confirmada',                 dot: 'bg-emerald-400', text: 'text-emerald-400' },
  cancelado:  { label: 'Cancelada',                  dot: 'bg-zinc-600',   text: 'text-zinc-500' },
};

export default function BookingBanner() {
  const [booking, setBooking] = useState<StoredBooking | null>(null);
  const [status, setStatus] = useState('pendiente');
  const [cancelling, setCancelling] = useState(false);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dz_booking');
      if (!raw) return;
      const data = JSON.parse(raw) as StoredBooking;
      setBooking(data);
      setStatus(data.status || 'pendiente');
      setVisible(true);
      getDoc(doc(db, 'citas', data.id))
        .then(snap => { if (snap.exists()) setStatus(snap.data().status || 'pendiente'); })
        .catch(() => {});
    } catch {}
  }, []);

  const dismiss = () => {
    localStorage.removeItem('dz_booking');
    setVisible(false);
  };

  const cancel = async () => {
    if (!booking?.id || cancelling) return;
    setCancelling(true);
    try {
      await updateDoc(doc(db, 'citas', booking.id), { status: 'cancelado' });
      setStatus('cancelado');
      setDone(true);
      setTimeout(() => {
        localStorage.removeItem('dz_booking');
        setVisible(false);
      }, 2500);
    } catch {
      setCancelling(false);
    }
  };

  const formatDate = (s: string) => {
    if (!s) return '';
    try { const [y, m, d] = s.split('-'); return `${d}/${m}/${y}`; } catch { return s; }
  };

  if (!visible || !booking) return null;

  const cfg = STATUS_MAP[status] ?? STATUS_MAP.pendiente;
  const canCancel = !done && status !== 'cancelado';

  return (
    <div className="pt-[80px] sm:pt-[90px] bg-[#050505] px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative border border-[#1e1e1e] bg-[#090909]">

          {/* Dismiss X */}
          <button
            onClick={dismiss}
            className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center text-[#333] hover:text-[#E8E2D9] transition-colors"
            aria-label="Cerrar"
          >
            <X size={13} />
          </button>

          <div className="p-5 sm:p-6 pr-12">
            {/* Status row */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <span className="text-[#444] text-[9px] font-mono tracking-[0.3em] uppercase">
                Tu reserva en D.Z Tattoo Studio
              </span>
              <span className={`text-[9px] font-mono tracking-widest uppercase ${cfg.text}`}>
                · {cfg.label}
              </span>
            </div>

            {/* Booking info + cancel button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 flex flex-wrap gap-x-5 gap-y-1 min-w-0">
                <span className="text-[#E8E2D9] text-sm font-bold">{booking.nombre}</span>
                <span className="text-[#8B0000] text-sm font-mono">{booking.servicio}</span>
                {booking.fecha && (
                  <span className="text-[#B0A89E] text-xs font-mono flex items-center gap-1.5">
                    <Calendar size={10} /> {formatDate(booking.fecha)}
                  </span>
                )}
                {booking.hora && (
                  <span className="text-[#B0A89E] text-xs font-mono flex items-center gap-1.5">
                    <Clock size={10} /> {booking.hora}
                  </span>
                )}
                <span className="text-[#444] text-xs font-mono">{booking.telefono}</span>
              </div>

              {canCancel && (
                <button
                  onClick={cancel}
                  disabled={cancelling}
                  className="flex-shrink-0 flex items-center gap-2 border border-[#8B0000]/25 text-[#8B0000] hover:bg-[#8B0000]/8 px-4 py-2.5 text-[10px] font-mono tracking-[0.2em] uppercase transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {cancelling
                    ? <><Loader2 size={10} className="animate-spin" /> Cancelando...</>
                    : <><X size={10} /> Cancelar reserva</>}
                </button>
              )}

              {done && (
                <span className="flex-shrink-0 text-zinc-500 text-[10px] font-mono tracking-wider">
                  Reserva cancelada
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
