'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot, doc, updateDoc, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LogOut, Phone, Calendar, Clock, MessageCircle, User, ChevronDown, ChevronUp, ChevronLeft, Search, X, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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

const STATUS_STYLES = {
  pendiente:  { bg: 'bg-amber-500/15',  text: 'text-amber-300',  border: 'border-amber-500/30',  dot: 'bg-amber-400',  icon: AlertCircle },
  confirmado: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/30', dot: 'bg-emerald-400', icon: CheckCircle },
  cancelado:  { bg: 'bg-zinc-700/30',   text: 'text-zinc-400',   border: 'border-zinc-600/40',   dot: 'bg-zinc-500',  icon: XCircle },
};

const STATUS_LABELS = { pendiente: 'Pendiente', confirmado: 'Confirmado', cancelado: 'Cancelado' };

export default function PanelPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [fbError, setFbError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [selectedCalBookingId, setSelectedCalBookingId] = useState<string | null>(null);
  const calTouchStart = useRef(0);

  const selectedCalBooking = selectedCalBookingId
    ? bookings.find(b => b.id === selectedCalBookingId) ?? null
    : null;

  const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAYS_ES = ['LU','MA','MI','JU','VI','SA','DO'];

  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    bookings.forEach(b => {
      if (!b.fecha || b.status === 'cancelado') return;
      if (!map[b.fecha]) map[b.fecha] = [];
      map[b.fecha].push(b);
    });
    return map;
  }, [bookings]);

  const calDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const offset = (firstDay + 6) % 7;
    const dim = new Date(calYear, calMonth + 1, 0).getDate();
    const prev = new Date(calYear, calMonth, 0).getDate();
    const days: { date: number; type: 'prev'|'cur'|'next'; key: string }[] = [];
    for (let i = offset - 1; i >= 0; i--) {
      const d = prev - i;
      const m = calMonth === 0 ? 12 : calMonth;
      const y = calMonth === 0 ? calYear - 1 : calYear;
      days.push({ date: d, type: 'prev', key: `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
    }
    for (let d = 1; d <= dim; d++) {
      const key = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      days.push({ date: d, type: 'cur', key });
    }
    const rem = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= rem; d++) {
      const m = calMonth === 11 ? 1 : calMonth + 2;
      const y = calMonth === 11 ? calYear + 1 : calYear;
      days.push({ date: d, type: 'next', key: `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}` });
    }
    return days;
  }, [calYear, calMonth]);

  const changeMonth = (dir: -1 | 1) => {
    setCalMonth(m => {
      const next = m + dir;
      if (next < 0) { setCalYear(y => y - 1); return 11; }
      if (next > 11) { setCalYear(y => y + 1); return 0; }
      return next;
    });
  };

  const onCalTouchStart = (e: React.TouchEvent) => { calTouchStart.current = e.touches[0].clientX; };
  const onCalTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - calTouchStart.current;
    if (Math.abs(delta) > 50) changeMonth(delta < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('dz_panel_auth') === 'true') setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;

    const sort = (docs: Booking[]) =>
      [...docs].sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));

    const q = query(collection(db, 'citas'));

    const timeout = setTimeout(() => setLoading(false), 4000);

    const unsub = onSnapshot(q, (snap) => {
      clearTimeout(timeout);
      setBookings(sort(snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking))));
      setLoading(false);
    }, (err) => {
      clearTimeout(timeout);
      console.error(err);
      setFbError('No se pudieron cargar las citas. Comprueba la conexión.');
      setLoading(false);
    });

    return () => { unsub(); clearTimeout(timeout); };
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
    sessionStorage.removeItem('dz_panel_auth');
    router.push('/');
  };

  const updateStatus = async (id: string, status: string) => {
    try { await updateDoc(doc(db, 'citas', id), { status }); }
    catch (e) { console.error(e); }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try { const [y, m, d] = dateStr.split('-'); return `${d}/${m}/${y}`; }
    catch { return dateStr; }
  };

  const formatCreated = (ts: { seconds: number } | null) => {
    if (!ts) return '—';
    return new Date(ts.seconds * 1000).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
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
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
        <div className="w-full max-w-xs">
          <div className="flex justify-center mb-12">
            <div className="w-14 h-14 border border-[#C41E1E]/50 rotate-45 flex items-center justify-center">
              <span className="text-[#C41E1E] font-black text-lg -rotate-45">DZ</span>
            </div>
          </div>

          <h1 className="text-center text-[#E8E2D9] text-lg font-black uppercase tracking-[0.35em] mb-2">Panel de Control</h1>
          <p className="text-center text-[#888] text-xs font-mono tracking-[0.35em] uppercase mb-10">D.Z Tattoo Studio</p>

          <form onSubmit={handlePin} className="space-y-3">
            <input
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false); }}
              placeholder="Contraseña"
              autoFocus
              className={`w-full bg-[#1a1a1a] border ${pinError ? 'border-[#C41E1E]/70' : 'border-[#333]'} focus:border-[#C41E1E]/50 text-[#E8E2D9] text-center text-base tracking-[0.4em] px-6 py-4 outline-none transition-colors duration-200 placeholder:text-[#555] placeholder:tracking-normal`}
            />
            {pinError && (
              <p className="text-[#ff6060] text-sm text-center font-mono tracking-wider">Contraseña incorrecta</p>
            )}
            <button type="submit"
              className="w-full bg-[#C41E1E] hover:bg-[#D42020] text-white py-4 text-sm font-bold tracking-[0.35em] uppercase transition-colors duration-200">
              Acceder
            </button>
          </form>

          <p className="text-center text-[#555] text-xs font-mono mt-10 tracking-[0.3em] uppercase">Uso exclusivo del estudio</p>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#111111] text-[#E8E2D9]">

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#C41E1E] font-black text-sm tracking-[0.2em] uppercase">DZ</span>
            <span className="text-[#444]">|</span>
            <span className="text-[#E8E2D9] text-sm font-bold tracking-wider uppercase">Panel de Control</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono tracking-[0.3em] uppercase hidden sm:block">En vivo</span>
            </div>
            <button onClick={logout}
              className="flex items-center gap-1.5 text-[#aaa] hover:text-[#E8E2D9] text-xs font-mono tracking-[0.2em] uppercase transition-colors border border-[#2a2a2a] hover:border-[#555] px-3 py-1.5">
              <LogOut size={12} /> Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total reservas', value: counts.total, color: 'text-[#E8E2D9]', sub: 'Todas las reservas' },
            { label: 'Pendientes', value: counts.pendiente, color: 'text-amber-300', sub: 'Esperan confirmación' },
            { label: 'Confirmadas', value: counts.confirmado, color: 'text-emerald-300', sub: 'Listas para sesión' },
            { label: 'Canceladas', value: counts.cancelado, color: 'text-zinc-400', sub: 'No realizadas' },
          ].map(s => (
            <div key={s.label} className="bg-[#1e1e1e] border border-[#2a2a2a] p-5 rounded-xl">
              <p className="text-[#888] text-xs font-mono tracking-[0.2em] uppercase mb-3">{s.label}</p>
              <p className={`text-4xl font-black mb-1 tabular-nums ${s.color}`}>{s.value}</p>
              <p className="text-[#666] text-xs font-mono">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['list','calendar'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2.5 text-xs font-mono tracking-[0.2em] uppercase border transition-all duration-150 rounded-lg ${
                activeTab === t
                  ? 'bg-[#E8E2D9] text-[#111111] border-[#E8E2D9] font-bold'
                  : 'border-[#2a2a2a] text-[#999] hover:border-[#555] hover:text-[#E8E2D9]'
              }`}>
              {t === 'list' ? 'Reservas' : 'Calendario'}
            </button>
          ))}
        </div>

        {/* ── CALENDAR VIEW ── */}
        {activeTab === 'calendar' && (
          selectedCalBooking ? (
            /* ── BOOKING DETAIL (from calendar tap) ── */
            <div>
              <button
                onClick={() => setSelectedCalBookingId(null)}
                className="flex items-center gap-2 text-[#aaa] hover:text-[#E8E2D9] text-xs font-mono tracking-[0.2em] uppercase mb-6 transition-colors"
              >
                <ChevronLeft size={14} /> Volver al calendario
              </button>

              {/* Header card */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 border border-[#C41E1E]/30 flex items-center justify-center flex-shrink-0 bg-[#C41E1E]/10 rounded-xl">
                    <span className="text-[#C41E1E] font-black text-lg">{selectedCalBooking.nombre?.charAt(0)?.toUpperCase() ?? '?'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#E8E2D9] font-black text-xl leading-tight">{selectedCalBooking.nombre}</p>
                    <p className="text-[#888] text-xs font-mono mt-0.5">{selectedCalBooking.servicio}</p>
                  </div>
                  {(() => {
                    const sc = STATUS_STYLES[selectedCalBooking.status] ?? STATUS_STYLES.pendiente;
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wider border rounded-full flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {STATUS_LABELS[selectedCalBooking.status]}
                      </span>
                    );
                  })()}
                </div>
                <div className="flex gap-5 text-sm">
                  <span className="flex items-center gap-1.5 text-[#aaa] font-mono">
                    <Calendar size={12} className="text-[#C41E1E]" /> {formatDate(selectedCalBooking.fecha)}
                  </span>
                  {selectedCalBooking.hora && (
                    <span className="flex items-center gap-1.5 text-[#aaa] font-mono">
                      <Clock size={12} className="text-[#C41E1E]" /> {selectedCalBooking.hora}
                    </span>
                  )}
                </div>
              </div>

              {/* Status change */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 mb-4">
                <p className="text-[#999] text-xs font-mono tracking-[0.25em] uppercase mb-3">Cambiar estado</p>
                <div className="flex gap-2 flex-wrap">
                  {(['pendiente', 'confirmado', 'cancelado'] as const).map(s => (
                    <button key={s} onClick={() => updateStatus(selectedCalBooking.id, s)}
                      className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase border transition-all duration-150 rounded-lg ${
                        selectedCalBooking.status === s
                          ? `${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].text} ${STATUS_STYLES[s].border} font-bold`
                          : 'border-[#2a2a2a] text-[#999] hover:border-[#555] hover:text-[#E8E2D9]'
                      }`}>
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail fields */}
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Teléfono', value: selectedCalBooking.telefono },
                    { label: 'Email', value: selectedCalBooking.email },
                    { label: 'Zona corporal', value: selectedCalBooking.zonaCorporal || '—' },
                    { label: 'Tamaño', value: selectedCalBooking.tamano || '—' },
                    { label: 'Recibida', value: formatCreated(selectedCalBooking.createdAt) },
                  ].map(d => (
                    <div key={d.label} className="bg-[#1e1e1e] rounded-lg p-3 border border-[#2a2a2a]">
                      <p className="text-[#888] text-[10px] font-mono uppercase tracking-widest mb-1.5">{d.label}</p>
                      <p className="text-[#E8E2D9] text-sm font-mono break-all">{d.value || '—'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCalBooking.idea && (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 mb-4">
                  <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">Idea del cliente</p>
                  <p className="text-[#E8E2D9] text-sm leading-relaxed">{selectedCalBooking.idea}</p>
                </div>
              )}
              {selectedCalBooking.comentarios && (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5 mb-4">
                  <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">Comentarios adicionales</p>
                  <p className="text-[#E8E2D9] text-sm leading-relaxed">{selectedCalBooking.comentarios}</p>
                </div>
              )}

              {/* Quick contact */}
              <div className="flex gap-3 mt-2">
                <a href={`tel:${selectedCalBooking.telefono}`}
                  className="flex-1 flex items-center justify-center gap-2 border border-[#2a2a2a] hover:border-[#555] text-[#aaa] hover:text-[#E8E2D9] text-xs font-mono tracking-widest uppercase py-3.5 transition-all duration-150 rounded-lg">
                  <Phone size={13} /> Llamar
                </a>
                <a href={`https://wa.me/${selectedCalBooking.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(selectedCalBooking.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-600/60 text-emerald-400 text-xs font-mono tracking-widest uppercase py-3.5 transition-all duration-150 rounded-lg">
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            </div>
          ) : (
            /* ── CALENDAR GRID ── */
            <div
              className="select-none touch-pan-y"
              onTouchStart={onCalTouchStart}
              onTouchEnd={onCalTouchEnd}
            >
              {/* Month header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#E8E2D9] text-lg font-black uppercase tracking-widest">
                  {MONTHS_ES[calMonth]} <span className="text-[#888]">{calYear}</span>
                </h2>
                <span className="text-[#777] text-xs font-mono tracking-[0.2em]">← desliza →</span>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-px mb-px">
                {DAYS_ES.map(d => (
                  <div key={d} className="bg-[#1e1e1e] py-2.5 text-center text-xs font-mono tracking-widest text-[#999] uppercase font-bold">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px bg-[#2a2a2a]">
                {calDays.map(({ date, type, key }) => {
                  const isToday = key === new Date().toISOString().split('T')[0];
                  const dayBookings = bookingsByDate[key] ?? [];
                  const isCur = type === 'cur';
                  return (
                    <div key={key} className={`min-h-[80px] sm:min-h-[100px] p-1.5 sm:p-2 flex flex-col ${
                      isCur ? 'bg-[#1a1a1a]' : 'bg-[#141414]'
                    } ${isToday ? 'ring-1 ring-inset ring-[#C41E1E]/50' : ''}`}>
                      {/* Day number */}
                      <span className={`text-[11px] font-mono mb-1 self-start leading-none px-1 py-0.5 ${
                        isToday
                          ? 'bg-[#C41E1E] text-white font-black'
                          : isCur ? 'text-[#ccc]' : 'text-[#444]'
                      }`}>{date}</span>

                      {/* Bookings */}
                      <div className="flex-1 space-y-0.5 overflow-hidden">
                        {dayBookings.slice(0, 3).map(b => (
                          <button
                            key={b.id}
                            onClick={() => setSelectedCalBookingId(b.id)}
                            className={`w-full text-left px-1 py-0.5 border-l-2 transition-opacity hover:opacity-70 active:opacity-50 ${
                              b.status === 'confirmado' ? 'border-emerald-500/80 bg-emerald-950/30' :
                              b.status === 'pendiente' ? 'border-amber-500/70 bg-amber-950/30' : 'border-zinc-600 bg-zinc-900/30'
                            }`}
                          >
                            <p className="text-[#E8E2D9] text-[9px] font-bold leading-tight truncate">{b.hora ? `${b.hora} ` : ''}{b.nombre}</p>
                            <p className="text-[#888] text-[8px] leading-tight truncate">{b.telefono}</p>
                          </button>
                        ))}
                        {dayBookings.length > 3 && (
                          <p className="text-[#C41E1E] text-[8px] font-mono px-1">+{dayBookings.length - 3} más</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-6 mt-4 px-1">
                {[
                  { color: 'border-l-amber-500/70 bg-amber-950/30', label: 'Pendiente' },
                  { color: 'border-l-emerald-500/70 bg-emerald-950/30', label: 'Confirmada' },
                ].map(l => (
                  <div key={l.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 border-l-2 ${l.color}`} />
                    <span className="text-[#aaa] text-xs font-mono">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* ── LIST VIEW ── */}
        {activeTab === 'list' && (<>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm flex items-center bg-[#1e1e1e] border border-[#2a2a2a] focus-within:border-[#555] rounded-lg transition-colors">
            <Search size={15} className="ml-4 flex-shrink-0 text-[#888] pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre, servicio o teléfono..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent pl-4 pr-9 py-3 text-[#E8E2D9] text-sm placeholder-[#666] outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#E8E2D9] transition-colors">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['todos', 'pendiente', 'confirmado', 'cancelado'] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-4 py-2.5 text-xs font-mono tracking-[0.15em] uppercase border transition-all duration-150 rounded-lg ${
                  filterStatus === s
                    ? 'bg-[#E8E2D9] text-[#111111] border-[#E8E2D9] font-bold'
                    : 'border-[#2a2a2a] text-[#999] hover:border-[#555] hover:text-[#E8E2D9]'
                }`}>
                {s === 'todos' ? 'Todas' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {fbError && (
          <div className="border border-[#C41E1E]/40 p-5 mb-6 bg-[#1a0808] rounded-xl">
            <p className="text-[#ff8080] text-sm font-mono">{fbError}</p>
          </div>
        )}

        {/* Loading */}
        {loading && !fbError && (
          <div className="text-center py-20">
            <div className="w-6 h-6 border-2 border-[#333] border-t-[#C41E1E] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#888] text-sm font-mono tracking-widest">Cargando citas...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !fbError && filtered.length === 0 && (
          <div className="text-center py-20 border border-[#2a2a2a] rounded-xl">
            <p className="text-[#555] text-5xl mb-4">—</p>
            <p className="text-[#888] text-sm font-mono tracking-widest">
              {search || filterStatus !== 'todos' ? 'Sin resultados para los filtros aplicados' : 'No hay citas todavía'}
            </p>
          </div>
        )}

        {/* Booking list */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-2">
            {filtered.map((b) => {
              const sc = STATUS_STYLES[b.status] ?? STATUS_STYLES.pendiente;
              const isOpen = expanded === b.id;
              return (
                <div key={b.id} className="border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors duration-150 bg-[#1a1a1a] rounded-xl overflow-hidden">

                  {/* Row summary */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Avatar initial */}
                      <div className="w-10 h-10 border border-[#C41E1E]/30 flex items-center justify-center flex-shrink-0 bg-[#C41E1E]/10 rounded-lg">
                        <span className="text-[#C41E1E] font-black text-sm">{b.nombre?.charAt(0)?.toUpperCase() ?? '?'}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[#E8E2D9] font-bold text-base">{b.nombre}</span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono tracking-wider border rounded-full ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {STATUS_LABELS[b.status]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#aaa] font-mono">
                          <span className="flex items-center gap-1.5"><User size={10} /> {b.servicio || '—'}</span>
                          <span className="flex items-center gap-1.5"><Calendar size={10} /> {formatDate(b.fecha)}{b.hora ? ` · ${b.hora}` : ''}</span>
                          <span className="flex items-center gap-1.5"><Phone size={10} />
                            <a href={`tel:${b.telefono}`} className="hover:text-[#E8E2D9] transition-colors">{b.telefono}</a>
                          </span>
                          <span className="hidden sm:flex items-center gap-1.5 text-[#777]"><Clock size={10} /> {formatCreated(b.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={`https://wa.me/${b.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(b.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                        target="_blank" rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 border border-emerald-800/50 hover:border-emerald-600/60 px-3 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-150 rounded-lg">
                        <MessageCircle size={12} /> WA
                      </a>
                      <button onClick={() => setExpanded(isOpen ? null : b.id)}
                        className="text-[#888] hover:text-[#E8E2D9] border border-[#2a2a2a] hover:border-[#555] p-2.5 transition-all duration-150 rounded-lg">
                        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t border-[#2a2a2a] bg-[#161616] p-5 space-y-5">

                      {/* Status change */}
                      <div>
                        <p className="text-[#999] text-xs font-mono tracking-[0.25em] uppercase mb-3">Cambiar estado</p>
                        <div className="flex gap-2 flex-wrap">
                          {(['pendiente', 'confirmado', 'cancelado'] as const).map(s => (
                            <button key={s} onClick={() => updateStatus(b.id, s)}
                              className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase border transition-all duration-150 rounded-lg ${
                                b.status === s
                                  ? `${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].text} ${STATUS_STYLES[s].border} font-bold`
                                  : 'border-[#2a2a2a] text-[#999] hover:border-[#555] hover:text-[#E8E2D9]'
                              }`}>
                              {STATUS_LABELS[s]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Detail fields */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: 'Email', value: b.email },
                          { label: 'Zona corporal', value: b.zonaCorporal || '—' },
                          { label: 'Tamaño', value: b.tamano || '—' },
                          { label: 'Recibida', value: formatCreated(b.createdAt) },
                        ].map(d => (
                          <div key={d.label} className="bg-[#1e1e1e] rounded-lg p-3 border border-[#2a2a2a]">
                            <p className="text-[#888] text-[10px] font-mono uppercase tracking-widest mb-1.5">{d.label}</p>
                            <p className="text-[#E8E2D9] text-sm font-mono break-all">{d.value || '—'}</p>
                          </div>
                        ))}
                      </div>

                      {b.idea && (
                        <div>
                          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">Idea del cliente</p>
                          <p className="text-[#E8E2D9] text-sm leading-relaxed bg-[#1e1e1e] border border-[#2a2a2a] p-4 rounded-lg">{b.idea}</p>
                        </div>
                      )}
                      {b.comentarios && (
                        <div>
                          <p className="text-[#999] text-xs font-mono uppercase tracking-widest mb-2">Comentarios adicionales</p>
                          <p className="text-[#E8E2D9] text-sm leading-relaxed bg-[#1e1e1e] border border-[#2a2a2a] p-4 rounded-lg">{b.comentarios}</p>
                        </div>
                      )}

                      {/* Quick contact */}
                      <div className="flex gap-3 pt-3 border-t border-[#2a2a2a]">
                        <a href={`tel:${b.telefono}`}
                          className="flex-1 flex items-center justify-center gap-2 border border-[#2a2a2a] hover:border-[#555] text-[#aaa] hover:text-[#E8E2D9] text-xs font-mono tracking-widest uppercase py-3 transition-all duration-150 rounded-lg">
                          <Phone size={13} /> Llamar
                        </a>
                        <a href={`https://wa.me/${b.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(b.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-950/40 border border-emerald-800/40 hover:border-emerald-600/60 text-emerald-400 text-xs font-mono tracking-widest uppercase py-3 transition-all duration-150 rounded-lg">
                          <MessageCircle size={13} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        </>)}

        <p className="text-center text-[#555] text-xs font-mono mt-12 tracking-[0.3em] uppercase">
          D.Z Tattoo Studio · Panel Interno · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
