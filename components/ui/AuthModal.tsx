'use client';

import { useState, useEffect } from 'react';
import {
  signInWithPopup, signInWithRedirect, getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  updateProfile, sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { X, Mail, Loader2, Eye, EyeOff, CheckCircle } from 'lucide-react';

type Mode = 'options' | 'email' | 'reset';

const isMobile = () =>
  typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

export default function AuthModal() {
  const { authOpen, closeAuth } = useAuth();
  const [mode, setMode] = useState<Mode>('options');
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    getRedirectResult(auth).catch(() => {});
  }, []);

  if (!authOpen) return null;

  const reset = () => {
    setMode('options'); setEmail(''); setPassword(''); setName('');
    setError(''); setIsSignUp(false); setResetSent(false);
  };

  const friendlyError = (code: string) => {
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential'))
      return 'Correo o contraseña incorrectos.';
    if (code.includes('email-already-in-use')) return 'Este correo ya está registrado. Inicia sesión.';
    if (code.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.';
    if (code.includes('invalid-email')) return 'El correo no es válido.';
    if (code.includes('too-many-requests')) return 'Demasiados intentos. Espera unos minutos.';
    if (code.includes('network-request-failed')) return 'Sin conexión. Revisa tu internet.';
    if (code.includes('popup-closed-by-user')) return 'Ventana de Google cerrada. Inténtalo de nuevo.';
    if (code.includes('popup-blocked')) return '';
    return 'Error al autenticar. Inténtalo de nuevo.';
  };

  const signInGoogle = async () => {
    setBusy('google'); setError('');
    const provider = new GoogleAuthProvider();
    try {
      if (isMobile()) {
        await signInWithRedirect(auth, provider);
      } else {
        try {
          await signInWithPopup(auth, provider);
        } catch (err: unknown) {
          const code = (err as { code?: string }).code ?? '';
          if (code.includes('popup-blocked') || code.includes('popup-closed-by-user')) {
            await signInWithRedirect(auth, provider);
          } else {
            throw err;
          }
        }
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      const msg = friendlyError(code);
      if (msg) setError(msg);
    } finally {
      setBusy(null);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy('email'); setError('');
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setError(friendlyError(code) || 'Error al autenticar. Inténtalo de nuevo.');
    } finally { setBusy(null); }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy('reset'); setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setError(friendlyError(code) || 'No se pudo enviar el correo. Inténtalo de nuevo.');
    } finally { setBusy(null); }
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-5" role="dialog" aria-modal="true"
      style={{ animation: 'authFadeIn 0.18s ease-out' }}>
      <style>{`
        @keyframes authFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes authSlideUp { from { opacity: 0; transform: translateY(18px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes authBtnIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0) } }
        .auth-btn-1 { animation: authBtnIn 0.22s ease-out 0.08s both }
        .auth-btn-2 { animation: authBtnIn 0.22s ease-out 0.16s both }
      `}</style>
      <div className="absolute inset-0 bg-[#111111]/95 backdrop-blur-md" onClick={closeAuth} />

      <div className="relative w-full max-w-md z-10" style={{ animation: 'authSlideUp 0.22s ease-out' }}>
        {/* Close */}
        <button onClick={() => { reset(); closeAuth(); }}
          className="absolute -top-10 right-0 w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-[#E8E2D9] hover:border-[#555] transition-all duration-150">
          <X size={15} />
        </button>

        <div className="bg-[#141414] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-[#111]">
            <p className="text-[#8B0000] text-[9px] font-mono tracking-[0.5em] uppercase mb-3">D.Z Tattoo Studio</p>
            <h2 className="text-[#E8E2D9] text-2xl font-black uppercase tracking-wide">
              {mode === 'email' ? (isSignUp ? 'Crear cuenta' : 'Iniciar sesión') : mode === 'reset' ? 'Recuperar contraseña' : 'Tu cuenta'}
            </h2>
            <p className="text-[#444] text-xs mt-2">Gestiona tus reservas desde cualquier dispositivo</p>
          </div>

          <div className="px-8 py-7">
            {/* Options screen */}
            {mode === 'options' && (
              <div className="space-y-3">
                <button onClick={signInGoogle} disabled={!!busy}
                  className="auth-btn-1 w-full flex items-center justify-center gap-3 rounded-full bg-white hover:bg-[#f0f0f0] active:scale-[0.98] text-[#1a1a1a] px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-40 shadow-lg shadow-black/30">
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
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#151515]" /></div>
                  <div className="relative flex justify-center"><span className="bg-[#141414] px-4 text-[#2a2a2a] text-[10px] font-mono tracking-widest">O</span></div>
                </div>

                <button onClick={() => setMode('email')} disabled={!!busy}
                  className="auth-btn-2 w-full flex items-center justify-center gap-3 rounded-full border-2 border-[#8B0000] hover:bg-[#8B0000]/10 active:scale-[0.98] text-[#E8E2D9] px-6 py-4 text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-40">
                  <Mail size={18} className="text-[#8B0000] flex-shrink-0" />
                  Continuar con correo
                </button>

                {error && <p className="text-[#ff6060] text-[11px] text-center font-mono pt-1">{error}</p>}
              </div>
            )}

            {/* Email / sign-up screen */}
            {mode === 'email' && (
              <form onSubmit={handleEmail} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-[#888] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Nombre</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                      autoComplete="name" placeholder="Tu nombre"
                      className="input-pill text-sm rounded-xl" />
                  </div>
                )}
                <div>
                  <label className="block text-[#888] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Correo *</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    autoComplete="email" placeholder="tu@email.com"
                    className="input-pill text-sm rounded-xl" />
                </div>
                <div className="relative">
                  <label className="block text-[#888] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Contraseña *</label>
                  <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    placeholder="Mínimo 6 caracteres"
                    className="input-pill text-sm pr-11 rounded-xl" />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-4 bottom-[14px] text-[#888] hover:text-[#E8E2D9] transition-colors">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                {error && <p className="text-[#ff6060] text-[11px] font-mono">{error}</p>}

                <button type="submit" disabled={!!busy}
                  className="w-full rounded-full bg-[#C41E1E] hover:bg-[#D42020] active:scale-[0.98] text-white py-5 text-base font-bold tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-40 mt-2 transition-all duration-150 shadow-lg shadow-[#C41E1E]/25">
                  {busy === 'email' ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>

                <div className="flex flex-col gap-3 pt-2">
                  {!isSignUp && (
                    <button type="button" onClick={() => { setMode('reset'); setError(''); }}
                      className="w-full py-3 text-sm font-mono text-[#888] hover:text-[#E8E2D9] transition-colors text-center border border-[#2a2a2a] rounded-full hover:border-[#444]">
                      Olvidé mi contraseña
                    </button>
                  )}
                  <button type="button" onClick={() => { setIsSignUp(v => !v); setError(''); }}
                    className="w-full py-3 text-sm font-mono text-[#C41E1E] hover:text-[#E02020] transition-colors text-center border border-[#C41E1E]/30 rounded-full hover:border-[#C41E1E]/60">
                    {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿Nuevo aquí? Regístrate'}
                  </button>
                  <button type="button" onClick={() => { setMode('options'); setError(''); }}
                    className="text-[#666] text-xs font-mono hover:text-[#E8E2D9] transition-colors text-center py-2">
                    ← Volver a opciones
                  </button>
                </div>
              </form>
            )}

            {/* Password reset screen */}
            {mode === 'reset' && (
              <form onSubmit={handleReset} className="space-y-4">
                {resetSent ? (
                  <div className="flex flex-col items-center gap-4 py-4 text-center">
                    <CheckCircle size={40} className="text-emerald-500" />
                    <p className="text-[#E8E2D9] text-sm font-semibold">Correo enviado</p>
                    <p className="text-[#888] text-sm leading-relaxed">
                      Revisa tu bandeja de entrada (y spam).<br />Sigue el enlace para crear una nueva contraseña.
                    </p>
                    <button type="button" onClick={() => { setMode('email'); setResetSent(false); setError(''); }}
                      className="text-[#C41E1E] text-sm font-mono hover:text-[#E02020] transition-colors mt-2 border border-[#C41E1E]/30 rounded-full px-6 py-3">
                      Volver al inicio de sesión
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-[#888] text-sm leading-relaxed">
                      Introduce tu correo y te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                    <div>
                      <label className="block text-[#888] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Correo *</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        autoComplete="email" placeholder="tu@email.com"
                        className="input-pill text-sm rounded-xl" />
                    </div>

                    {error && <p className="text-[#ff6060] text-[11px] font-mono">{error}</p>}

                    <button type="submit" disabled={!!busy}
                      className="w-full rounded-full bg-[#C41E1E] hover:bg-[#D42020] active:scale-[0.98] text-white py-5 text-base font-bold tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-40 transition-all duration-150 shadow-lg shadow-[#C41E1E]/25">
                      {busy === 'reset' ? <Loader2 size={18} className="animate-spin" /> : null}
                      Enviar enlace
                    </button>

                    <button type="button" onClick={() => { setMode('email'); setError(''); }}
                      className="w-full py-3 text-sm font-mono text-[#666] hover:text-[#E8E2D9] transition-colors text-center border border-[#2a2a2a] rounded-full hover:border-[#444]">
                      ← Volver al inicio de sesión
                    </button>
                  </>
                )}
              </form>
            )}

            <p className="text-[#222] text-[9px] font-mono text-center mt-6 leading-relaxed">
              Al continuar aceptas nuestra{' '}
              <a href="/privacidad" className="hover:text-[#333] underline transition-colors">política de privacidad</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
