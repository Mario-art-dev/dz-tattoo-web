'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LogOut, Phone, Calendar, Clock, MessageCircle, User, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import Image from 'next/image';

const PIN = 'dztattoo';

type Booking = {
  id: string;
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
  status: 'pendiente' | 'confirmado' | 'cancelado';
  createdAt: { seconds: number } | null;
};

const STATUS_COLORS = {
  pendiente:  { bg: 'bg-[#2a1a00]', text: 'text-[#ffaa33]', border: 'border-[#5a3a00]', dot: 'bg-[#ffaa33]' },
  confirmado: { bg: 'bg-[#001a08]', text: 'text-[#3aaa5a]', border: 'border-[#0a4020]', dot: 'bg-[#3aaa5a]' },
  cancelado:  { bg: 'bg-[#0f0f0f]', text: 'text-[#555]',    border: 'border-[#222]',    dot: 'bg-[#555]' },
};

const STATUS_LABELS = { pendiente: 'Pendiente', confirmado: 'Confirmado', cancelado: 'Cancelado' };

export default function PanelPage() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [fbError, setFbError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('dz_panel_auth');
      if (saved === 'true') setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    let unsub: () => void;
    try {
      const q = query(collection(db, 'citas'), orderBy('createdAt', 'desc'));
      unsub = onSnapshot(q, (snap) => {
        setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking)));
        setLoading(false);
      }, (err) => {
        console.error(err);
        setFbError('No se pudieron cargar las citas. Verifica la configuración de Firebase.');
        setLoading(false);
      });
    } catch {
      setFbError('Error al conectar con la base de datos.');
      setLoading(false);
    }
    return () => unsub?.();
  }, [authed]);

  const handlePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.toLowerCase() === PIN) {
      setAuthed(true);
      sessionStorage.setItem('dz_panel_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
  };

  const logout = () => {
    setAuthed(false);
    sessionStorage.removeItem('dz_panel_auth');
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'citas', id), { status });
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try {
      const [y, m, d] = dateStr.split('-');
      return `${d}/${m}/${y}`;
    } catch { return dateStr; }
  };

  const formatCreated = (ts: { seconds: number } | null) => {
    if (!ts) return '—';
    const d = new Date(ts.seconds * 1000);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const filtered = bookings.filter(b => {
    const matchStatus = filterStatus === 'todos' || b.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || b.nombre?.toLowerCase().includes(q) || b.servicio?.toLowerCase().includes(q) || b.telefono?.includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    total: bookings.length,
    pendiente: bookings.filter(b => b.status === 'pendiente').length,
    confirmado: bookings.filter(b => b.status === 'confirmado').length,
    cancelado: bookings.filter(b => b.status === 'cancelado').length,
  };

  // ── PIN GATE ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-10">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#1a1a1a]">
              <Image src="/images/logo.png" alt="D.Z Tattoo" fill className="object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
          </div>
          <h1 className="text-center text-[#E8E2D9] text-2xl font-black uppercase tracking-widest mb-2">Panel de Control</h1>
          <p className="text-center text-[#444] text-xs font-mono tracking-widest mb-10">D.Z Tattoo Studio</p>
          <form onSubmit={handlePin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false); }}
              placeholder="Contraseña"
              autoFocus
              className={`w-full bg-[#0a0a0a] border ${pinError ? 'border-[#C41E1E]/60' : 'border-[#1a1a1a]'} rounded-2xl text-[#E8E2D9] text-center text-lg tracking-[0.3em] px-6 py-4 outline-none focus:border-[#333] transition-colors duration-200 placeholder:text-[#2a2a2a] placeholder:tracking-normal`}
            />
            {pinError && <p className="text-[#ff6060] text-xs text-center">Contraseña incorrecta</p>}
            <button type="submit" className="btn-primary-round w-full py-4 text-sm font-bold tracking-[0.2em] uppercase">
              Acceder
            </button>
          </form>
          <p className="text-center text-[#222] text-[10px] font-mono mt-8 tracking-widest">USO EXCLUSIVO DEL ESTUDIO</p>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-[#111]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#1a1a1a] flex-shrink-0">
              <Image src="/images/logo.png" alt="DZ" fill className="object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div>
              <p className="text-[#E8E2D9] text-sm font-bold tracking-wider uppercase leading-none">Panel de Control</p>
              <p className="text-[#444] text-[10px] font-mono tracking-widest mt-0.5">D.Z Tattoo Studio</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3aaa5a] animate-pulse" />
              <span className="text-[#3aaa5a] text-[10px] font-mono tracking-widest hidden sm:block">EN VIVO</span>
            </div>
            <button onClick={logout} className="flex items-center gap-1.5 text-[#444] hover:text-[#E8E2D9] text-[10px] font-mono tracking-widest uppercase transition-colors border border-[#1a1a1a] hover:border-[#333] px-3 py-2 rounded-xl">
              <LogOut size={12} /> Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {[
            { label: 'Total citas', value: counts.total, color: 'text-[#E8E2D9]', desc: 'Todas las solicitudes' },
            { label: 'Pendientes', value: counts.pendiente, color: 'text-[#ffaa33]', desc: 'Esperan confirmación' },
            { label: 'Confirmadas', value: counts.confirmado, color: 'text-[#3aaa5a]', desc: 'Listas para la sesión' },
            { label: 'Canceladas', value: counts.cancelado, color: 'text-[#555]', desc: 'No realizadas' },
          ].map(s => (
            <div key={s.label} className="bg-[#080808] border border-[#111] rounded-2xl p-5 sm:p-6">
              <p className="text-[#444] text-[10px] font-mono tracking-[0.2em] uppercase mb-3">{s.label}</p>
              <p className={`text-4xl sm:text-5xl font-black mb-1 ${s.color}`}>{s.value}</p>
              <p className="text-[#333] text-[10px]">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              placeholder="Buscar por nombre, servicio o teléfono..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#080808] border border-[#111] rounded-xl pl-10 pr-4 py-3 text-[#E8E2D9] text-sm placeholder-[#333] outline-none focus:border-[#333] transition-colors"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#E8E2D9]"><X size={13} /></button>}
          </div>
          <div className="flex gap-2">
            {(['todos', 'pendiente', 'confirmado', 'cancelado'] as const).map(s => (
              <button key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 sm:px-4 py-2.5 text-[10px] font-mono tracking-[0.15em] uppercase border rounded-xl transition-all duration-200 ${
                  filterStatus === s
                    ? 'bg-[#E8E2D9] text-[#050505] border-[#E8E2D9]'
                    : 'border-[#1a1a1a] text-[#444] hover:border-[#333] hover:text-[#E8E2D9]'
                }`}>
                {s === 'todos' ? 'Todas' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Error state */}
        {fbError && (
          <div className="border border-[#C41E1E]/30 rounded-2xl p-6 mb-6 bg-[#0d0000]">
            <p className="text-[#ff6060] text-sm">{fbError}</p>
          </div>
        )}

        {/* Loading */}
        {loading && !fbError && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-[#E8E2D9] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#444] text-sm font-mono">Cargando citas...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !fbError && filtered.length === 0 && (
          <div className="text-center py-20 border border-[#111] rounded-2xl">
            <p className="text-[#333] text-4xl mb-4">📭</p>
            <p className="text-[#444] text-sm font-mono">
              {search || filterStatus !== 'todos' ? 'No hay citas que coincidan con los filtros' : 'No hay citas todavía'}
            </p>
          </div>
        )}

        {/* Bookings list */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((b) => {
              const sc = STATUS_COLORS[b.status] ?? STATUS_COLORS.pendiente;
              const isOpen = expanded === b.id;
              return (
                <div key={b.id} className="border border-[#111] rounded-2xl overflow-hidden hover:border-[#1a1a1a] transition-colors duration-200">
                  {/* Row */}
                  <div className="p-4 sm:p-6 flex items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full border border-[#8B0000]/20 flex items-center justify-center flex-shrink-0 bg-[#0a0000]">
                        <span className="text-[#8B0000] font-black text-sm">{b.nombre?.charAt(0) ?? '?'}</span>
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[#E8E2D9] font-bold text-sm truncate">{b.nombre}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {STATUS_LABELS[b.status]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#555] font-mono">
                          <span className="flex items-center gap-1"><User size={10} /> {b.servicio || '—'}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> {formatDate(b.fecha)}{b.hora ? ` · ${b.hora}` : ''}</span>
                          <span className="flex items-center gap-1"><Phone size={10} />
                            <a href={`tel:${b.telefono}`} className="hover:text-[#E8E2D9] transition-colors">{b.telefono}</a>
                          </span>
                          <span className="hidden sm:inline text-[#2a2a2a]"><Clock size={10} className="inline" /> {formatCreated(b.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={`https://wa.me/${b.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(b.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                        target="_blank" rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-1.5 text-[#1a8a3a] hover:text-[#3aaa5a] border border-[#1a3a20] hover:border-[#1a8a3a] px-3 py-2 rounded-xl text-[10px] font-mono transition-all duration-200">
                        <MessageCircle size={12} /> WA
                      </a>
                      <button onClick={() => setExpanded(isOpen ? null : b.id)}
                        className="text-[#444] hover:text-[#E8E2D9] border border-[#1a1a1a] hover:border-[#333] p-2.5 rounded-xl transition-all duration-200">
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="border-t border-[#111] bg-[#080808] p-5 sm:p-6 space-y-5">
                      {/* Status buttons */}
                      <div>
                        <p className="text-[#444] text-[10px] font-mono tracking-[0.2em] uppercase mb-3">Cambiar estado</p>
                        <div className="flex gap-2 flex-wrap">
                          {(['pendiente', 'confirmado', 'cancelado'] as const).map(s => (
                            <button key={s} onClick={() => updateStatus(b.id, s)}
                              className={`px-4 py-2 text-[10px] font-mono tracking-wider uppercase rounded-xl border transition-all duration-200 ${
                                b.status === s
                                  ? `${STATUS_COLORS[s].bg} ${STATUS_COLORS[s].text} ${STATUS_COLORS[s].border}`
                                  : 'border-[#1a1a1a] text-[#444] hover:border-[#333] hover:text-[#E8E2D9]'
                              }`}>
                              {STATUS_LABELS[s]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Email', value: b.email },
                          { label: 'Zona corporal', value: b.zonaCorporal || '—' },
                          { label: 'Tamaño', value: b.tamano || '—' },
                          { label: 'Recibida', value: formatCreated(b.createdAt) },
                        ].map(d => (
                          <div key={d.label}>
                            <p className="text-[#333] text-[10px] font-mono uppercase tracking-widest mb-1">{d.label}</p>
                            <p className="text-[#B0A89E] text-sm">{d.value || '—'}</p>
                          </div>
                        ))}
                      </div>

                      {b.idea && (
                        <div>
                          <p className="text-[#333] text-[10px] font-mono uppercase tracking-widest mb-1.5">Idea del cliente</p>
                          <p className="text-[#B0A89E] text-sm leading-relaxed bg-[#0a0a0a] border border-[#111] rounded-xl p-4">{b.idea}</p>
                        </div>
                      )}
                      {b.comentarios && (
                        <div>
                          <p className="text-[#333] text-[10px] font-mono uppercase tracking-widest mb-1.5">Comentarios adicionales</p>
                          <p className="text-[#B0A89E] text-sm leading-relaxed bg-[#0a0a0a] border border-[#111] rounded-xl p-4">{b.comentarios}</p>
                        </div>
                      )}

                      {/* Quick contact */}
                      <div className="flex gap-3 pt-2 border-t border-[#111]">
                        <a href={`tel:${b.telefono}`}
                          className="flex-1 flex items-center justify-center gap-2 border border-[#1a1a1a] hover:border-[#333] text-[#555] hover:text-[#E8E2D9] text-[10px] font-mono tracking-widest uppercase py-3 rounded-xl transition-all duration-200">
                          <Phone size={12} /> Llamar
                        </a>
                        <a href={`https://wa.me/${b.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(b.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-[#0a1a0e] border border-[#1a3a20] hover:border-[#1a8a3a] text-[#3aaa5a] text-[10px] font-mono tracking-widest uppercase py-3 rounded-xl transition-all duration-200">
                          <MessageCircle size={12} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="text-center text-[#1a1a1a] text-[10px] font-mono mt-12 tracking-widest">
          D.Z TATTOO STUDIO · PANEL INTERNO · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
