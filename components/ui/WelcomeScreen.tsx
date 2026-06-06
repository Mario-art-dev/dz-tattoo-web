'use client';

import { useState, useEffect } from 'react';
import {
  signInWithPopup, GoogleAuthProvider,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Loader2, Eye, EyeOff, ArrowLeft } from 'lucide-react';

type Screen = 'welcome' | 'choice' | 'email';

export default function WelcomeScreen() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [screen, setScreen] = useState<Screen>('welcome');
  const [isSignUp, setIsSignUp] = useState(false);

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only show if not dismissed this session and user not logged in
    const welcomed = sessionStorage.getItem('dz_welcomed');
    if (!welcomed) {
      setVisible(true);
    }
  }, []);

  // Close when user signs in
  useEffect(() => {
    if (user && visible) {
      sessionStorage.setItem('dz_welcomed', '1');
      setVisible(false);
    }
  }, [user, visible]);

  const dismiss = () => {
    sessionStorage.setItem('dz_welcomed', '1');
    setVisible(false);
  };

  const signInGoogle = async () => {
    setBusy('google');
    setError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      // user effect will close overlay
    } catch {
      setError('No se pudo iniciar sesión con Google. Inténtalo de nuevo.');
    } finally {
      setBusy(null);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy('email');
    setError('');
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // user effect will close overlay
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential'))
        setError('Correo o contraseña incorrectos.');
      else if (code.includes('email-already-in-use'))
        setError('Este correo ya está registrado. Inicia sesión.');
      else if (code.includes('weak-password'))
        setError('La contraseña debe tener al menos 6 caracteres.');
      else setError('Error al autenticar. Inténtalo de nuevo.');
    } finally {
      setBusy(null);
    }
  };

  if (!visible || user) return null;

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-center justify-center px-5"
      style={{ animation: 'wsFadeIn 0.25s ease-out' }}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenido a DZ Tattoo Studio"
    >
      <style>{`
        @keyframes wsFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes wsSlideUp { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#111111]/85 backdrop-blur-md" onClick={dismiss} />

      {/* Card */}
      <div
        className="relative w-full max-w-sm bg-[#151515] border border-[#1e1e1e] rounded-2xl overflow-hidden z-10"
        style={{ animation: 'wsSlideUp 0.28s ease-out' }}
      >

        {/* ── WELCOME SCREEN ── */}
        {screen === 'welcome' && (
          <div className="p-7 text-center">
            {/* Logo */}
            <div className="mb-7">
              <p className="text-[#E8E2D9] text-[64px] font-black leading-none tracking-[-4px] select-none">DZ</p>
              <p className="text-[#8B0000] text-[9px] font-mono tracking-[0.5em] uppercase mt-1">Tattoo Studio</p>
              <div className="h-px bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent my-4" />
              <p className="text-[#444] text-[10px] font-mono tracking-[0.25em] uppercase">Arte con alma · Silla, Valencia</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => { setIsSignUp(false); setScreen('choice'); }}
                className="flex-1 rounded-full border border-[#333] text-[#E8E2D9] py-3.5 text-xs font-bold tracking-widest uppercase hover:border-[#555] hover:bg-[#111] active:scale-[0.98] transition-all duration-150"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => { setIsSignUp(true); setScreen('choice'); }}
                className="flex-1 rounded-full bg-[#8B0000] hover:bg-[#A01010] text-white py-3.5 text-xs font-bold tracking-widest uppercase active:scale-[0.98] transition-all duration-150 shadow-lg shadow-[#8B0000]/20"
              >
                Registrarse
              </button>
            </div>

            {/* Dismiss link */}
            <button
              onClick={dismiss}
              className="text-[#333] text-[10px] font-mono hover:text-[#555] transition-colors tracking-wider"
            >
              Continuar sin cuenta →
            </button>
          </div>
        )}

        {/* ── CHOICE: Google / Email ── */}
        {screen === 'choice' && (
          <div className="p-7">
            {/* Back */}
            <button
              onClick={() => { setScreen('welcome'); setError(''); }}
              className="flex items-center gap-2 text-[#444] text-[11px] font-mono hover:text-[#E8E2D9] transition-colors mb-6"
            >
              <ArrowLeft size={13} /> Volver
            </button>

            <div className="text-center mb-7">
              <p className="text-[#8B0000] text-[9px] font-mono tracking-[0.5em] uppercase mb-2">D.Z Tattoo Studio</p>
              <h2 className="text-[#E8E2D9] text-2xl font-black uppercase tracking-wide">
                {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
              </h2>
              <p className="text-[#444] text-xs mt-2">Gestiona tus reservas desde cualquier dispositivo</p>
            </div>

            <div className="space-y-3">
              {/* Google */}
              <button
                onClick={signInGoogle}
                disabled={!!busy}
                className="w-full flex items-center justify-center gap-3 rounded-full bg-white hover:bg-[#f0f0f0] active:scale-[0.98] text-[#1a1a1a] px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-40 shadow-lg shadow-black/30"
              >
                {busy === 'google'
                  ? <Loader2 size={18} className="animate-spin" />
                  : (
                    <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                Continuar con Google
              </button>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#151515]" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#111111] px-4 text-[#2a2a2a] text-[10px] font-mono tracking-widest">O</span>
                </div>
              </div>

              {/* Email */}
              <button
                onClick={() => setScreen('email')}
                disabled={!!busy}
                className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-[#8B0000] hover:bg-[#8B0000]/10 active:scale-[0.98] text-[#E8E2D9] px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-40"
              >
                <Mail size={18} className="text-[#8B0000] flex-shrink-0" />
                Continuar con correo
              </button>

              {error && <p className="text-[#ff6060] text-[11px] text-center font-mono pt-1">{error}</p>}
            </div>
          </div>
        )}

        {/* ── EMAIL FORM ── */}
        {screen === 'email' && (
          <div className="p-7">
            {/* Back */}
            <button
              onClick={() => { setScreen('choice'); setError(''); }}
              className="flex items-center gap-2 text-[#444] text-[11px] font-mono hover:text-[#E8E2D9] transition-colors mb-6"
            >
              <ArrowLeft size={13} /> Volver
            </button>

            <div className="text-center mb-7">
              <p className="text-[#8B0000] text-[9px] font-mono tracking-[0.5em] uppercase mb-2">D.Z Tattoo Studio</p>
              <h2 className="text-[#E8E2D9] text-2xl font-black uppercase tracking-wide">
                {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
              </h2>
            </div>

            <form onSubmit={handleEmail} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[#555] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="input-pill text-sm rounded-xl"
                  />
                </div>
              )}
              <div>
                <label className="block text-[#555] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Correo *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="input-pill text-sm rounded-xl"
                />
              </div>
              <div className="relative">
                <label className="block text-[#555] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Contraseña *</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="input-pill text-sm pr-11 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 bottom-[14px] text-[#444] hover:text-[#E8E2D9] transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {error && <p className="text-[#ff6060] text-[11px] font-mono">{error}</p>}

              <button
                type="submit"
                disabled={!!busy}
                className="w-full rounded-full bg-[#8B0000] hover:bg-[#A01010] active:scale-[0.98] text-white py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-40 mt-2 transition-all duration-150 shadow-lg shadow-[#8B0000]/20"
              >
                {busy === 'email' ? <Loader2 size={16} className="animate-spin" /> : null}
                {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>

              <div className="flex items-center justify-center pt-1">
                <button
                  type="button"
                  onClick={() => { setIsSignUp(v => !v); setError(''); }}
                  className="text-[#8B0000] text-[10px] font-mono hover:text-[#C41E1E] transition-colors"
                >
                  {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo aquí? Regístrate'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Privacy note */}
        <p className="text-[#1e1e1e] text-[9px] font-mono text-center mt-5 pb-6 leading-relaxed">
          Al continuar aceptas nuestra{' '}
          <a href="/privacidad" className="hover:text-[#333] underline transition-colors">política de privacidad</a>
        </p>
      </div>
    </div>
  );
}
