'use client';

import { useState } from 'react';
import {
  signInWithPopup, GoogleAuthProvider, OAuthProvider,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { X, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

type Mode = 'options' | 'email';

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

  if (!authOpen) return null;

  const reset = () => { setMode('options'); setEmail(''); setPassword(''); setName(''); setError(''); setIsSignUp(false); };

  const signInGoogle = async () => {
    setBusy('google'); setError('');
    try { await signInWithPopup(auth, new GoogleAuthProvider()); }
    catch { setError('No se pudo iniciar sesión con Google. Inténtalo de nuevo.'); }
    finally { setBusy(null); }
  };

  const signInApple = async () => {
    setBusy('apple'); setError('');
    const p = new OAuthProvider('apple.com');
    p.addScope('email'); p.addScope('name');
    try { await signInWithPopup(auth, p); }
    catch { setError('Inicio de sesión con Apple requiere configuración adicional.'); }
    finally { setBusy(null); }
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
      if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential'))
        setError('Correo o contraseña incorrectos.');
      else if (code.includes('email-already-in-use'))
        setError('Este correo ya está registrado. Inicia sesión.');
      else if (code.includes('weak-password'))
        setError('La contraseña debe tener al menos 6 caracteres.');
      else setError('Error al autenticar. Inténtalo de nuevo.');
    } finally { setBusy(null); }
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-5" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[#050505]/92 backdrop-blur-sm" onClick={closeAuth} />
      <div className="relative w-full max-w-sm bg-[#090909] border border-[#1a1a1a] z-10">
        <button onClick={() => { reset(); closeAuth(); }}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#333] hover:text-[#E8E2D9] transition-colors">
          <X size={15} />
        </button>

        <div className="p-7 sm:p-8">
          <div className="mb-7">
            <p className="text-[#8B0000] text-[9px] font-mono tracking-[0.4em] uppercase mb-1.5">D.Z Tattoo Studio</p>
            <h2 className="text-[#E8E2D9] text-xl font-black uppercase tracking-wide">
              {mode === 'email' ? (isSignUp ? 'Crear cuenta' : 'Iniciar sesión') : 'Tu cuenta'}
            </h2>
            <p className="text-[#333] text-xs mt-1.5">Gestiona tus reservas desde cualquier dispositivo</p>
          </div>

          {mode === 'options' && (
            <div className="space-y-2.5">
              <button onClick={signInGoogle} disabled={!!busy}
                className="w-full flex items-center gap-3 border border-[#1a1a1a] hover:border-[#2a2a2a] bg-[#050505] hover:bg-[#0a0a0a] text-[#E8E2D9] px-4 py-3.5 text-xs font-medium tracking-wide transition-all disabled:opacity-40">
                {busy === 'google' ? <Loader2 size={15} className="animate-spin text-[#555]" /> : (
                  <svg width="15" height="15" viewBox="0 0 24 24" className="flex-shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continuar con Google
              </button>

              <button onClick={signInApple} disabled={!!busy}
                className="w-full flex items-center gap-3 border border-[#1a1a1a] hover:border-[#2a2a2a] bg-[#050505] hover:bg-[#0a0a0a] text-[#E8E2D9] px-4 py-3.5 text-xs font-medium tracking-wide transition-all disabled:opacity-40">
                {busy === 'apple' ? <Loader2 size={15} className="animate-spin text-[#555]" /> : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
                  </svg>
                )}
                Continuar con Apple
              </button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#111]" /></div>
                <div className="relative flex justify-center"><span className="bg-[#090909] px-3 text-[#222] text-[9px] font-mono tracking-widest">O</span></div>
              </div>

              <button onClick={() => setMode('email')} disabled={!!busy}
                className="w-full flex items-center gap-3 border border-[#1a1a1a] hover:border-[#2a2a2a] bg-[#050505] hover:bg-[#0a0a0a] text-[#E8E2D9] px-4 py-3.5 text-xs font-medium tracking-wide transition-all">
                <Mail size={15} className="text-[#555] flex-shrink-0" />
                Continuar con correo electrónico
              </button>

              {error && <p className="text-[#ff6060] text-[11px] mt-2 font-mono">{error}</p>}
            </div>
          )}

          {mode === 'email' && (
            <form onSubmit={handleEmail} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[#444] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Nombre</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre" className="input-pill text-sm" />
                </div>
              )}
              <div>
                <label className="block text-[#444] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Correo *</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com" className="input-pill text-sm" />
              </div>
              <div className="relative">
                <label className="block text-[#444] text-[10px] font-mono tracking-[0.2em] uppercase mb-2">Contraseña *</label>
                <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres" className="input-pill text-sm pr-11" />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute right-4 bottom-[14px] text-[#444] hover:text-[#E8E2D9] transition-colors">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {error && <p className="text-[#ff6060] text-[11px] font-mono">{error}</p>}

              <button type="submit" disabled={!!busy}
                className="btn-primary-round w-full py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-40 mt-2">
                {busy === 'email' ? <Loader2 size={14} className="animate-spin" /> : null}
                {isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
              </button>

              <div className="flex items-center justify-between pt-1">
                <button type="button" onClick={() => { setMode('options'); setError(''); }}
                  className="text-[#444] text-[10px] font-mono hover:text-[#E8E2D9] transition-colors">
                  ← Volver
                </button>
                <button type="button" onClick={() => { setIsSignUp(v => !v); setError(''); }}
                  className="text-[#8B0000] text-[10px] font-mono hover:text-[#C41E1E] transition-colors">
                  {isSignUp ? '¿Ya tienes cuenta?' : '¿Nuevo aquí? Regístrate'}
                </button>
              </div>
            </form>
          )}

          <p className="text-[#1a1a1a] text-[9px] font-mono text-center mt-6 leading-relaxed">
            Al continuar aceptas nuestra{' '}
            <a href="/privacidad" className="hover:text-[#2a2a2a] underline transition-colors">política de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  );
}
