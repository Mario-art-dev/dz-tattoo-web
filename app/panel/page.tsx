'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot, doc, updateDoc, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LogOut, Phone, Calendar, Clock, MessageCircle, User, ChevronDown, ChevronUp, Search, X, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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
  pendiente:  { bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20',  dot: 'bg-amber-400',  icon: AlertCircle },
  confirmado: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400', icon: CheckCircle },
  cancelado:  { bg: 'bg-zinc-800/60',   text: 'text-zinc-500',   border: 'border-zinc-700/40',   dot: 'bg-zinc-600',  icon: XCircle },
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
  const calTouchStart = useRef(0);

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

    // Safety timeout — never block the panel more than 4 seconds
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
          {/* Monogram */}
          <div className="flex justify-center mb-12">
            <div className="w-14 h-14 border border-[#8B0000]/40 rotate-45 flex items-center justify-center">
              <span className="text-[#8B0000] font-black text-lg -rotate-45">DZ</span>
            </div>
          </div>

          <h1 className="text-center text-[#E8E2D9] text-lg font-black uppercase tracking-[0.35em] mb-1">Panel de Control</h1>
          <p className="text-center text-[#2a2a2a] text-[10px] font-mono tracking-[0.35em] uppercase mb-10">D.Z Tattoo Studio</p>

          <form onSubmit={handlePin} className="space-y-3">
            <input
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false); }}
              placeholder="Contraseña"
              autoFocus
              className={`w-full bg-[#0a0a0a] border ${pinError ? 'border-[#8B0000]/60' : 'border-[#1a1a1a]'} focus:border-[#8B0000]/40 text-[#E8E2D9] text-center text-base tracking-[0.4em] px-6 py-4 outline-none transition-colors duration-200 placeholder:text-[#1f1f1f] placeholder:tracking-normal`}
            />
            {pinError && (
              <p className="text-[#ff6060] text-[11px] text-center font-mono tracking-wider">Contraseña incorrecta</p>
            )}
            <button type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#a01010] text-[#E8E2D9] py-4 text-[11px] font-bold tracking-[0.35em] uppercase transition-colors duration-200">
              Acceder
            </button>
          </form>

          <p className="text-center text-[#161616] text-[9px] font-mono mt-10 tracking-[0.3em] uppercase">Uso exclusivo del estudio</p>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──
  return (
    <div className="min-h-screen bg-[#111111] text-[#E8E2D9]">

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#141414] border-b border-[#111]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#8B0000] font-black text-sm tracking-[0.2em] uppercase">DZ</span>
            <span className="text-[#1a1a1a]">|</span>
            <span className="text-[#E8E2D9] text-sm font-bold tracking-wider uppercase">Panel de Control</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 text-[9px] font-mono tracking-[0.3em] uppercase hidden sm:block">En vivo</span>
            </div>
            <button onClick={logout}
              className="flex items-center gap-1.5 text-[#444] hover:text-[#E8E2D9] text-[9px] font-mono tracking-[0.2em] uppercase transition-colors border border-[#1a1a1a] hover:border-[#333] px-3 py-1.5">
              <LogOut size={11} /> Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total', value: counts.total, color: 'text-[#E8E2D9]', sub: 'Todas las reservas' },
            { label: 'Pendientes', value: counts.pendiente, color: 'text-amber-400', sub: 'Esperan confirmación' },
            { label: 'Confirmadas', value: counts.confirmado, color: 'text-emerald-400', sub: 'Listas para sesión' },
            { label: 'Canceladas', value: counts.cancelado, color: 'text-zinc-500', sub: 'No realizadas' },
          ].map(s => (
            <div key={s.label} className="bg-[#141414] border border-[#111] p-5">
              <p className="text-[#333] text-[9px] font-mono tracking-[0.25em] uppercase mb-3">{s.label}</p>
              <p className={`text-4xl font-black mb-1 tabular-nums ${s.color}`}>{s.value}</p>
              <p className="text-[#2a2a2a] text-[9px] font-mono">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          {(['list','calendar'] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-[9px] font-mono tracking-[0.2em] uppercase border transition-all duration-150 ${
                activeTab === t ? 'bg-[#E8E2D9] text-[#111111] border-[#E8E2D9]' : 'border-[#1a1a1a] text-[#444] hover:border-[#333] hover:text-[#E8E2D9]'
              }`}>
              {t === 'list' ? 'Reservas' : 'Calendario'}
            </button>
          ))}
        </div>

        {/* ── CALENDAR VIEW ── */}
        {activeTab === 'calendar' && (
          <div
            className="select-none touch-pan-y"
            onTouchStart={onCalTouchStart}
            onTouchEnd={onCalTouchEnd}
          >
            {/* Month header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#E8E2D9] text-base font-black uppercase tracking-widest">
                {MONTHS_ES[calMonth]} <span className="text-[#333]">{calYear}</span>
              </h2>
              <span className="text-[#2a2a2a] text-[9px] font-mono tracking-[0.2em]">← desliza →</span>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-px mb-px">
              {DAYS_ES.map(d => (
                <div key={d} className="bg-[#141414] py-2 text-center text-[9px] font-mono tracking-widest text-[#333] uppercase">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-px bg-[#1b1b1b]">
              {calDays.map(({ date, type, key }) => {
                const isToday = key === new Date().toISOString().split('T')[0];
                const dayBookings = bookingsByDate[key] ?? [];
                const isCur = type === 'cur';
                return (
                  <div key={key} className={`min-h-[80px] sm:min-h-[100px] p-1.5 sm:p-2 flex flex-col ${
                    isCur ? 'bg-[#141414]' : 'bg-[#111111]'
                  } ${isToday ? 'ring-1 ring-inset ring-[#8B0000]/40' : ''}`}>
                    {/* Day number */}
                    <span className={`text-[10px] font-mono mb-1 self-start leading-none px-1 py-0.5 ${
                      isToday
                        ? 'bg-[#8B0000] text-[#E8E2D9] font-black'
                        : isCur ? 'text-[#555]' : 'text-[#1e1e1e]'
                    }`}>{date}</span>

                    {/* Bookings */}
                    <div className="flex-1 space-y-0.5 overflow-hidden">
                      {dayBookings.slice(0, 3).map(b => {
                        const sc = STATUS_STYLES[b.status] ?? STATUS_STYLES.pendiente;
                        return (
                          <div key={b.id} className={`px-1 py-0.5 border-l-2 ${
                            b.status === 'confirmado' ? 'border-emerald-500/70 bg-emerald-950/20' :
                            b.status === 'pendiente' ? 'border-amber-500/60 bg-amber-950/20' : 'border-zinc-700 bg-zinc-900/20'
                          }`}>
                            <p className="text-[#E8E2D9] text-[8px] font-bold leading-tight truncate">{b.hora ? `${b.hora} ` : ''}{b.nombre}</p>
                            <p className="text-[#555] text-[7px] leading-tight truncate">{b.telefono}</p>
                          </div>
                        );
                      })}
                      {dayBookings.length > 3 && (
                        <p className="text-[#8B0000] text-[7px] font-mono px-1">+{dayBookings.length - 3} más</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-4 px-1">
              {[
                { color: 'border-l-amber-500/70 bg-amber-950/20', label: 'Pendiente' },
                { color: 'border-l-emerald-500/70 bg-emerald-950/20', label: 'Confirmada' },
              ].map(l => (
                <div key={l.label} className={`flex items-center gap-1.5`}>
                  <span className={`w-3 h-3 border-l-2 ${l.color}`} />
                  <span className="text-[#444] text-[9px] font-mono">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {activeTab === 'list' && (<>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#333]" />
            <input
              type="text"
              placeholder="Buscar por nombre, servicio o teléfono..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#141414] border border-[#111] focus:border-[#222] pl-9 pr-9 py-2.5 text-[#E8E2D9] text-sm placeholder-[#2a2a2a] outline-none transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333] hover:text-[#E8E2D9] transition-colors">
                <X size={12} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {(['todos', 'pendiente', 'confirmado', 'cancelado'] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 text-[9px] font-mono tracking-[0.15em] uppercase border transition-all duration-150 ${
                  filterStatus === s
                    ? 'bg-[#E8E2D9] text-[#111111] border-[#E8E2D9]'
                    : 'border-[#1a1a1a] text-[#444] hover:border-[#2a2a2a] hover:text-[#E8E2D9]'
                }`}>
                {s === 'todos' ? 'Todas' : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {fbError && (
          <div className="border border-[#8B0000]/30 p-5 mb-6 bg-[#0d0000]">
            <p className="text-[#ff6060] text-sm font-mono">{fbError}</p>
          </div>
        )}

        {/* Loading */}
        {loading && !fbError && (
          <div className="text-center py-20">
            <div className="w-6 h-6 border border-[#1a1a1a] border-t-[#8B0000] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#333] text-xs font-mono tracking-widest">Cargando citas...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !fbError && filtered.length === 0 && (
          <div className="text-center py-20 border border-[#1b1b1b]">
            <p className="text-[#1a1a1a] text-5xl mb-4">—</p>
            <p className="text-[#333] text-xs font-mono tracking-widest">
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
                <div key={b.id} className="border border-[#111] hover:border-[#1a1a1a] transition-colors duration-150 bg-[#141414]">

                  {/* Row summary */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Avatar initial */}
                      <div className="w-9 h-9 border border-[#8B0000]/15 flex items-center justify-center flex-shrink-0 bg-[#160c0c]">
                        <span className="text-[#8B0000] font-black text-xs">{b.nombre?.charAt(0)?.toUpperCase() ?? '?'}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[#E8E2D9] font-bold text-sm">{b.nombre}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono tracking-wider border ${sc.bg} ${sc.text} ${sc.border}`}>
                            <span className={`w-1 h-1 rounded-full ${sc.dot}`} />
                            {STATUS_LABELS[b.status]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px] text-[#444] font-mono">
                          <span className="flex items-center gap-1"><User size={9} /> {b.servicio || '—'}</span>
                          <span className="flex items-center gap-1"><Calendar size={9} /> {formatDate(b.fecha)}{b.hora ? ` · ${b.hora}` : ''}</span>
                          <span className="flex items-center gap-1"><Phone size={9} />
                            <a href={`tel:${b.telefono}`} className="hover:text-[#E8E2D9] transition-colors">{b.telefono}</a>
                          </span>
                          <span className="hidden sm:flex items-center gap-1 text-[#222]"><Clock size={9} /> {formatCreated(b.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={`https://wa.me/${b.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(b.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                        target="_blank" rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-1.5 text-emerald-600 hover:text-emerald-400 border border-emerald-900/40 hover:border-emerald-700/40 px-3 py-1.5 text-[9px] font-mono tracking-wider uppercase transition-all duration-150">
                        <MessageCircle size={11} /> WA
                      </a>
                      <button onClick={() => setExpanded(isOpen ? null : b.id)}
                        className="text-[#333] hover:text-[#E8E2D9] border border-[#1a1a1a] hover:border-[#333] p-2 transition-all duration-150">
                        {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t border-[#1b1b1b] bg-[#111111] p-5 space-y-5">

                      {/* Status change */}
                      <div>
                        <p className="text-[#2a2a2a] text-[9px] font-mono tracking-[0.25em] uppercase mb-2.5">Cambiar estado</p>
                        <div className="flex gap-2 flex-wrap">
                          {(['pendiente', 'confirmado', 'cancelado'] as const).map(s => (
                            <button key={s} onClick={() => updateStatus(b.id, s)}
                              className={`px-4 py-2 text-[9px] font-mono tracking-wider uppercase border transition-all duration-150 ${
                                b.status === s
                                  ? `${STATUS_STYLES[s].bg} ${STATUS_STYLES[s].text} ${STATUS_STYLES[s].border}`
                                  : 'border-[#1a1a1a] text-[#333] hover:border-[#333] hover:text-[#E8E2D9]'
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
                          <div key={d.label}>
                            <p className="text-[#222] text-[9px] font-mono uppercase tracking-widest mb-1">{d.label}</p>
                            <p className="text-[#888] text-xs font-mono">{d.value || '—'}</p>
                          </div>
                        ))}
                      </div>

                      {b.idea && (
                        <div>
                          <p className="text-[#222] text-[9px] font-mono uppercase tracking-widest mb-2">Idea del cliente</p>
                          <p className="text-[#888] text-xs leading-relaxed bg-[#141414] border border-[#111] p-4">{b.idea}</p>
                        </div>
                      )}
                      {b.comentarios && (
                        <div>
                          <p className="text-[#222] text-[9px] font-mono uppercase tracking-widest mb-2">Comentarios adicionales</p>
                          <p className="text-[#888] text-xs leading-relaxed bg-[#141414] border border-[#111] p-4">{b.comentarios}</p>
                        </div>
                      )}

                      {/* Quick contact */}
                      <div className="flex gap-3 pt-3 border-t border-[#1b1b1b]">
                        <a href={`tel:${b.telefono}`}
                          className="flex-1 flex items-center justify-center gap-2 border border-[#1a1a1a] hover:border-[#333] text-[#444] hover:text-[#E8E2D9] text-[9px] font-mono tracking-widest uppercase py-3 transition-all duration-150">
                          <Phone size={11} /> Llamar
                        </a>
                        <a href={`https://wa.me/${b.telefono?.replace(/\D/g, '')}?text=Hola%20${encodeURIComponent(b.nombre)}%2C%20te%20contactamos%20desde%20D.Z%20Tattoo%20Studio`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-950/30 border border-emerald-900/30 hover:border-emerald-700/50 text-emerald-500 text-[9px] font-mono tracking-widest uppercase py-3 transition-all duration-150">
                          <MessageCircle size={11} /> WhatsApp
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

        <p className="text-center text-[#111] text-[9px] font-mono mt-12 tracking-[0.3em] uppercase">
          D.Z Tattoo Studio · Panel Interno · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
