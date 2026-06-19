import type { Metadata } from 'next';
import { Brain, Heart, Leaf, Activity, Zap, Check, Star, Sparkles, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Woman Balance · Clínica Montesinos Valencia',
  description:
    'Programas de bienestar integral femenino — Woman Balance y Woman Balance Prime. Conoce qué incluye tu programa en Clínica Montesinos, Valencia.',
};

// ─────────────────────────────────────────
// Brand tokens
// ─────────────────────────────────────────
const C = {
  page:    '#FDFCFA',
  card:    '#FFFFFF',
  dark:    '#1C1A2E',
  mid:     '#5A5570',
  light:   '#8A8298',
  border:  '#E8DDF5',
  rose:    '#B8607E',
  roseBg:  '#FEF0F4',
  violet:  '#6B4A96',
  violetBg:'#F3EEFA',
  gold:    '#A67C40',
  goldBg:  '#FBF5E8',
  teal:    '#3E7A68',
  tealBg:  '#EEF8F4',
  primeBadge: '#4A2A7A',
};

// ─────────────────────────────────────────
// Data
// ─────────────────────────────────────────
type Treatment = {
  num: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  sessions: string;
  who: string;
  color: string;
  colorBg: string;
  isPrime?: boolean;
  primeNote?: string;
  desc: string;
  benefits: string[];
};

const WB: Treatment[] = [
  {
    num: '01', Icon: Brain,
    title: 'Terapia NESA',
    subtitle: 'Neuroestimulación Sistémica Adaptativa',
    sessions: '8 sesiones · 50 min',
    who: 'Ana / Teresa',
    color: C.rose, colorBg: C.roseBg,
    desc: 'Como darle un reset al sistema nervioso. Electrodos suaves en muñecas y tobillos emiten una microcorriente que equilibra tu sistema nervioso autónomo — sin dolor, sin agujas, sin incomodidad. La mayoría de pacientes salen con sensación de calma y ligereza.',
    benefits: [
      'Mejora del dolor crónico y tensión muscular',
      'Regulación del estrés y la ansiedad',
      'Sueño más profundo y reparador',
      'Apoyo al suelo pélvico y equilibrio hormonal',
      'Más energía y bienestar general',
    ],
  },
  {
    num: '02', Icon: Heart,
    title: 'Consulta Ginecológica',
    subtitle: 'Valoración hormonal + seguimiento coordinado',
    sessions: '2 consultas · 20 min',
    who: 'Laura',
    color: C.violet, colorBg: C.violetBg,
    desc: 'Laura realiza una valoración completa de tu salud ginecológica y hormonal, coordinada con todo el equipo. No es una revisión rutinaria — es el punto de partida para entender qué está pasando en tu cuerpo y adaptar el programa exactamente a ti.',
    benefits: [
      'Historia clínica ginecológica completa',
      'Valoración del ciclo y sintomatología hormonal',
      'Analítica hormonal si la necesitas',
      'Seguimiento a mitad del programa (semana 7)',
      'Coordinación directa con nutrición y suelo pélvico',
    ],
  },
  {
    num: '03', Icon: Leaf,
    title: 'Consulta de Nutrición',
    subtitle: 'Plan nutricional para tu salud hormonal',
    sessions: '2 consultas · 50 min',
    who: 'Alexandra',
    color: C.gold, colorBg: C.goldBg,
    desc: 'Alexandra diseña un plan real que puedas seguir en tu día a día. No va de dietas restrictivas — va de entender cómo tu alimentación afecta tu energía, ciclo menstrual, inflamación y bienestar. Un enfoque funcional y muy práctico, adaptado a ti.',
    benefits: [
      'Valoración nutricional completa',
      'Plan personalizado para tu salud hormonal',
      'Pautas prácticas para el día a día',
      'Seguimiento y ajuste del plan a mitad (semana 4)',
      'La alimentación como herramienta de bienestar',
    ],
  },
  {
    num: '04', Icon: Activity,
    title: 'Fisioterapia de Suelo Pélvico',
    subtitle: 'Valoración funcional completa',
    sessions: '1 consulta · 55 min',
    who: 'María',
    color: C.teal, colorBg: C.tealBg,
    desc: 'El suelo pélvico afecta mucho más de lo que imaginamos: la postura, el dolor de espalda, el control de orina, las relaciones y hasta el sistema nervioso. María hace una evaluación funcional completa que orienta el trabajo de NESA y todo el equipo.',
    benefits: [
      'Evaluación funcional completa del suelo pélvico',
      'Detección de tensiones, hipertonía o disfunciones',
      'Conexión directa con el plan de NESA',
      'Mejora del dolor pélvico y lumbar',
      'Pautas de autocuidado personalizadas',
    ],
  },
];

const WBP: Treatment[] = [
  {
    num: '01', Icon: Brain,
    title: 'Terapia NESA',
    subtitle: '2 sesiones adicionales para mayor consolidación',
    sessions: '10 sesiones · 50 min',
    who: 'Ana / Teresa',
    color: C.rose, colorBg: C.roseBg,
    isPrime: false,
    primeNote: '2 sesiones más que en Woman Balance para consolidar los cambios en mayor profundidad.',
    desc: 'Todo lo de Woman Balance, con 2 sesiones adicionales que permiten consolidar los cambios con mayor profundidad. Las últimas sesiones actúan como mantenimiento y fijación de resultados, especialmente importante cuando se combina con el Emsculpt Neo.',
    benefits: [
      '10 sesiones de trabajo neurológico profundo',
      'Mayor consolidación del equilibrio nervioso',
      'Mejor integración con los resultados del Emsculpt',
      'Resultados más estables a largo plazo',
      'Todos los beneficios de Woman Balance amplificados',
    ],
  },
  {
    num: '02', Icon: Zap,
    title: 'Emsculpt Neo',
    subtitle: 'Remodelación corporal sin cirugía · Exclusivo Prime',
    sessions: '5 sesiones · 30 min',
    who: 'Ana',
    color: C.violet, colorBg: C.violetBg,
    isPrime: true,
    primeNote: 'Exclusivo del programa Prime.',
    desc: 'Lo más avanzado para remodelar el cuerpo sin cirugía. En 30 minutos combina radiofrecuencia (reduce grasa) y estimulación electromagnética de alta intensidad (tonifica el músculo). Una sesión equivale a unas 20.000 contracciones musculares supramáximas — imposibles de conseguir con ejercicio convencional.',
    benefits: [
      'Hasta 30% de reducción de grasa localizada',
      'Hasta 25% de aumento de masa muscular',
      'Sin cirugía · Sin agujas · Sin tiempo de recuperación',
      'Resultados visibles desde la 3ª sesión',
      'Complementa y potencia tu ejercicio habitual',
    ],
  },
  {
    num: '03', Icon: Heart,
    title: 'Consulta Ginecológica',
    subtitle: 'Valoración + 2 seguimientos coordinados',
    sessions: '3 consultas · 20 min',
    who: 'Laura',
    color: C.rose, colorBg: C.roseBg,
    isPrime: false,
    primeNote: 'Laura te acompaña en tres momentos del programa en lugar de dos.',
    desc: 'En el Prime tienes a Laura al inicio, a mitad y al final del programa. No solo hace la valoración inicial — ve cómo vas evolucionando en cada fase y ajusta las recomendaciones según tus resultados reales.',
    benefits: [
      'Valoración ginecológica completa al inicio',
      'Seguimiento a mitad del programa (semana 8)',
      'Valoración final con recomendaciones de continuidad',
      'Coordinación con Emsculpt y evolución nutricional',
      'Acompañamiento ginecológico real durante todo el programa',
    ],
  },
  {
    num: '04', Icon: Leaf,
    title: 'Consulta de Nutrición',
    subtitle: 'Plan optimizado para el Emsculpt Neo',
    sessions: '3 consultas · 50 min',
    who: 'Alexandra',
    color: C.gold, colorBg: C.goldBg,
    isPrime: false,
    primeNote: 'El plan nutricional se optimiza para potenciar también los resultados del Emsculpt.',
    desc: 'La nutrición en el Prime no solo trabaja el equilibrio hormonal — también se optimiza para potenciar los resultados del Emsculpt Neo. La proteína adecuada y el ajuste calórico correcto multiplican el efecto del programa.',
    benefits: [
      'Todo lo de Woman Balance',
      'Optimización nutricional para el Emsculpt Neo',
      'Seguimiento adicional al final del programa',
      'Estrategia de transición a la fase de mantenimiento',
      'La nutrición correcta multiplica los resultados',
    ],
  },
  {
    num: '05', Icon: Activity,
    title: 'Fisioterapia de Suelo Pélvico',
    subtitle: 'Valoración + sesión de trabajo terapéutico',
    sessions: '2 consultas · 55 min',
    who: 'María',
    color: C.teal, colorBg: C.tealBg,
    isPrime: false,
    primeNote: 'En semana 5, María trabaja directamente el suelo pélvico además de la valoración inicial.',
    desc: 'En el Prime María no solo hace la valoración inicial. En la semana 5 vuelves a trabajar con ella directamente — tratamiento manual, reeducación y ejercicio terapéutico. En ese punto ya llevas semanas de NESA y el cuerpo está más receptivo.',
    benefits: [
      'Valoración inicial completa (semana 1)',
      'Sesión de trabajo terapéutico en semana 5',
      'Tratamiento manual y reeducación pélvica',
      'Ejercicio terapéutico personalizado para casa',
      'Coordinación óptima con el Emsculpt en zona abdominal',
    ],
  },
];

type SeguimientoItem = {
  num: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  sessions: string;
  when: string;
  color: string;
  colorBg: string;
  desc: string;
  options?: { label: string; detail: string; desc: string }[];
};

const SEGUIMIENTO: SeguimientoItem[] = [
  {
    num: '01', Icon: Sparkles,
    title: 'NESA o Neosculpt',
    subtitle: 'Tú eliges según tus objetivos · a elegir antes de cada sesión',
    sessions: '5 sesiones',
    when: 'Semanas 3, 6, 9, 12, 15',
    color: C.rose, colorBg: C.roseBg,
    desc: 'Elige la modalidad que mejor encaje con tus objetivos en cada sesión. No tienes que decidirlo de antemano.',
    options: [
      {
        label: 'NESA',
        detail: '50 min · Ana / Teresa',
        desc: 'Para consolidar el equilibrio nervioso. Dolor, sueño, energía, suelo pélvico.',
      },
      {
        label: 'Neosculpt',
        detail: '30 min · Ana',
        desc: 'Para mantener el tono muscular y la composición corporal conseguida.',
      },
    ],
  },
  {
    num: '02', Icon: Activity,
    title: 'Sesión de Suelo Pélvico',
    subtitle: 'Continuidad terapéutica · María',
    sessions: '1 sesión · 55 min',
    when: 'Semana 1',
    color: C.teal, colorBg: C.tealBg,
    desc: 'María ya te conoce y sabe exactamente en qué punto está tu suelo pélvico. Esta sesión no es una nueva valoración — es trabajo terapéutico directo: revisión de evolución, tratamiento manual y pautas de autocuidado actualizadas.',
  },
  {
    num: '03', Icon: Leaf,
    title: 'Consulta de Nutrición',
    subtitle: 'Ajuste del plan · Alexandra',
    sessions: '1 consulta · 50 min',
    when: 'Semana 2',
    color: C.gold, colorBg: C.goldBg,
    desc: 'Alexandra revisa cómo has mantenido los hábitos alimentarios y ajusta el plan para la fase de mantenimiento. No es empezar de nuevo — es afinar lo que ya funciona y darte herramientas para seguir sola con confianza.',
  },
  {
    num: '04', Icon: Heart,
    title: 'Consulta Ginecológica de Cierre',
    subtitle: 'Valoración final del ciclo completo · Laura',
    sessions: '1 consulta · 20 min',
    when: 'Semana 15',
    color: C.violet, colorBg: C.violetBg,
    desc: 'Al final del seguimiento, Laura hace una valoración de cierre para ver cómo has evolucionado en todos estos meses. El equipo te da las recomendaciones finales y te quedas con un plan claro para seguir sola.',
  },
];

// ─────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────

function TreatmentCard({ t, showPrimeBadge }: { t: Treatment; showPrimeBadge?: boolean }) {
  const { Icon } = t;
  return (
    <div
      style={{
        backgroundColor: C.card,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        border: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Colored top bar */}
      <div style={{ height: '4px', backgroundColor: t.color }} />

      <div style={{ padding: '28px 28px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
          <div
            style={{
              width: '48px', height: '48px', borderRadius: '14px',
              backgroundColor: t.colorBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon size={22} style={{ color: t.color }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  color: C.dark,
                  lineHeight: 1.2,
                }}
              >
                {t.title}
              </span>
              {showPrimeBadge && t.isPrime && (
                <span
                  style={{
                    backgroundColor: C.primeBadge,
                    color: '#E8DCFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    flexShrink: 0,
                  }}
                >
                  ★ Exclusivo Prime
                </span>
              )}
            </div>
            <p style={{ color: C.light, fontSize: '0.78rem', lineHeight: 1.4 }}>{t.subtitle}</p>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: t.color,
              opacity: 0.5,
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            {t.num}
          </span>
        </div>

        {/* Session badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: t.colorBg,
            borderRadius: '9999px',
            padding: '6px 14px',
            marginBottom: '18px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: t.color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: t.color, letterSpacing: '0.04em' }}>
            {t.sessions}
          </span>
          <span style={{ color: C.light, fontSize: '0.75rem' }}>· {t.who}</span>
        </div>

        {/* Prime note */}
        {showPrimeBadge && t.primeNote && (
          <div
            style={{
              backgroundColor: C.violetBg,
              borderLeft: `3px solid ${C.violet}`,
              borderRadius: '0 8px 8px 0',
              padding: '10px 14px',
              marginBottom: '16px',
            }}
          >
            <p style={{ fontSize: '0.8rem', color: C.violet, lineHeight: 1.5 }}>{t.primeNote}</p>
          </div>
        )}

        {/* Description */}
        <p style={{ color: C.mid, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '20px' }}>
          {t.desc}
        </p>

        {/* Benefits */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {t.benefits.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Check size={14} style={{ color: t.color, marginTop: '3px', flexShrink: 0 }} />
              <span style={{ color: C.mid, fontSize: '0.85rem', lineHeight: 1.5 }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
      <span style={{ display: 'block', width: '32px', height: '2px', backgroundColor: color }} />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color,
        }}
      >
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────
// Page
// ─────────────────────────────────────────
export default function WomanBalancePage() {
  return (
    <main
      style={{
        backgroundColor: C.page,
        color: C.dark,
        fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* ── HERO ─────────────────────────────── */}
      <header
        style={{
          background: 'radial-gradient(ellipse at 70% 0%, #FFF0F6 0%, #FDFCFA 45%, #F5F0FF 100%)',
          borderBottom: `1px solid ${C.border}`,
          padding: '48px 24px 56px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '260px', height: '260px', borderRadius: '50%',
            background: `radial-gradient(circle, ${C.roseBg} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: '-40px', left: '-40px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: `radial-gradient(circle, ${C.violetBg} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
          {/* Clinic badge */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(180,96,126,0.1)',
                border: `1px solid rgba(180,96,126,0.25)`,
                borderRadius: '9999px',
                padding: '6px 18px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: C.rose,
              }}
            >
              Clínica Montesinos · Valencia
            </span>
          </div>

          {/* Main title */}
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(3rem, 10vw, 5.5rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              color: C.dark,
              marginBottom: '8px',
              letterSpacing: '-0.01em',
            }}
          >
            Woman Balance
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: C.rose,
              marginBottom: '20px',
            }}
          >
            Programas de bienestar integral femenino
          </p>
          <p
            style={{
              color: C.mid,
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              lineHeight: 1.75,
              maxWidth: '480px',
              margin: '0 auto 36px',
            }}
          >
            Un equipo de especialistas trabajando de forma coordinada para equilibrar tu cuerpo, hormonas y energía.
          </p>

          {/* Quick nav */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { href: '#woman-balance', label: 'Woman Balance', color: C.rose, bg: C.roseBg },
              { href: '#woman-balance-prime', label: 'Woman Balance Prime ★', color: C.violet, bg: C.violetBg },
              { href: '#seguimiento', label: 'Seguimiento', color: C.teal, bg: C.tealBg },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={{
                  backgroundColor: n.bg,
                  color: n.color,
                  border: `1.5px solid ${n.color}30`,
                  borderRadius: '9999px',
                  padding: '9px 18px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                {n.label}
                <ArrowRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── AT A GLANCE ─────────────────────── */}
      <section style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <SectionLabel color={C.mid}>De un vistazo</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              fontWeight: 600,
              color: C.dark,
              lineHeight: 1.2,
            }}
          >
            Dos programas, un mismo objetivo
          </h2>
          <p style={{ color: C.mid, marginTop: '12px', fontSize: '0.9rem', maxWidth: '500px', margin: '12px auto 0', lineHeight: 1.7 }}>
            Ambos programas trabajan tu bienestar de forma integral y coordinada. La diferencia está en la profundidad y en el Emsculpt Neo.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* WB Card */}
          <div
            style={{
              backgroundColor: C.card,
              borderRadius: '20px',
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(184,96,126,0.08)',
            }}
          >
            <div style={{ height: '6px', background: `linear-gradient(90deg, ${C.rose}, #D4909A)` }} />
            <div style={{ padding: '28px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: C.dark,
                    marginBottom: '4px',
                  }}
                >
                  Woman Balance
                </h3>
                <p style={{ color: C.light, fontSize: '0.82rem' }}>Programa completo de bienestar</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  { label: 'Terapia NESA', detail: '8 sesiones × 50 min', color: C.rose },
                  { label: 'Ginecología', detail: '2 consultas × 20 min', color: C.violet },
                  { label: 'Nutrición', detail: '2 consultas × 50 min', color: C.gold },
                  { label: 'Suelo Pélvico', detail: '1 consulta × 55 min', color: C.teal },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.875rem', color: C.dark, fontWeight: 500 }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: C.light, whiteSpace: 'nowrap' }}>{item.detail}</span>
                  </div>
                ))}
              </div>
              <a
                href="#woman-balance"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  backgroundColor: C.roseBg, color: C.rose, border: `1.5px solid ${C.rose}30`,
                  borderRadius: '9999px', padding: '10px 0', width: '100%',
                  fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em',
                  textDecoration: 'none', textTransform: 'uppercase',
                }}
              >
                Ver tratamientos <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* WBP Card */}
          <div
            style={{
              backgroundColor: C.card,
              borderRadius: '20px',
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(107,74,150,0.1)',
              position: 'relative',
            }}
          >
            <div style={{ height: '6px', background: `linear-gradient(90deg, ${C.violet}, ${C.rose})` }} />
            {/* Premium badge */}
            <div
              style={{
                position: 'absolute', top: '22px', right: '20px',
                backgroundColor: C.primeBadge, color: '#E8DCFF',
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
                padding: '4px 10px', borderRadius: '9999px', textTransform: 'uppercase',
              }}
            >
              ★ Prime
            </div>
            <div style={{ padding: '28px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '1.6rem',
                    fontWeight: 600,
                    color: C.dark,
                    marginBottom: '4px',
                    paddingRight: '72px',
                  }}
                >
                  Woman Balance Prime
                </h3>
                <p style={{ color: C.light, fontSize: '0.82rem' }}>Todo lo anterior + Emsculpt Neo</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  { label: 'Terapia NESA', detail: '10 sesiones × 50 min', color: C.rose },
                  { label: 'Emsculpt Neo ★', detail: '5 sesiones × 30 min', color: C.violet, prime: true },
                  { label: 'Ginecología', detail: '3 consultas × 20 min', color: C.rose },
                  { label: 'Nutrición', detail: '3 consultas × 50 min', color: C.gold },
                  { label: 'Suelo Pélvico', detail: '2 consultas × 55 min', color: C.teal },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          color: item.prime ? C.violet : C.dark,
                          fontWeight: item.prime ? 700 : 500,
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: C.light, whiteSpace: 'nowrap' }}>{item.detail}</span>
                  </div>
                ))}
              </div>
              <a
                href="#woman-balance-prime"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  backgroundColor: C.violetBg, color: C.violet, border: `1.5px solid ${C.violet}30`,
                  borderRadius: '9999px', padding: '10px 0', width: '100%',
                  fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em',
                  textDecoration: 'none', textTransform: 'uppercase',
                }}
              >
                Ver tratamientos <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WOMAN BALANCE SECTION ────────────── */}
      <section
        id="woman-balance"
        style={{
          backgroundColor: '#FFF8FB',
          padding: '72px 24px',
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          scrollMarginTop: '24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <SectionLabel color={C.rose}>Programa</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 600,
                color: C.dark,
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              Woman Balance
            </h2>
            <p style={{ color: C.mid, fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '560px' }}>
              Un programa integral de 4 tratamientos especializados que trabajan de forma coordinada para equilibrar tu sistema nervioso, salud hormonal, alimentación y suelo pélvico.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {WB.map((t) => (
              <TreatmentCard key={t.num} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WOMAN BALANCE PRIME SECTION ─────── */}
      <section
        id="woman-balance-prime"
        style={{
          backgroundColor: '#F8F5FF',
          padding: '72px 24px',
          borderBottom: `1px solid ${C.border}`,
          scrollMarginTop: '24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <SectionLabel color={C.violet}>Programa Premium</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                  fontWeight: 600,
                  color: C.dark,
                  lineHeight: 1.15,
                }}
              >
                Woman Balance Prime
              </h2>
              <span
                style={{
                  backgroundColor: C.primeBadge,
                  color: '#E8DCFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  alignSelf: 'center',
                  flexShrink: 0,
                }}
              >
                ★ Prime
              </span>
            </div>
            <p style={{ color: C.mid, fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '600px' }}>
              Todo lo del programa Woman Balance, con mayor profundidad en cada tratamiento y la incorporación del{' '}
              <strong style={{ color: C.violet }}>Emsculpt Neo</strong> — la tecnología más avanzada para remodelar el cuerpo sin cirugía.
            </p>
          </div>

          {/* Emsculpt hero highlight */}
          <div
            style={{
              background: `linear-gradient(135deg, ${C.primeBadge} 0%, #6B4A96 100%)`,
              borderRadius: '20px',
              padding: '32px 28px',
              marginBottom: '28px',
              color: '#E8DCFF',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '180px', height: '180px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Zap size={20} style={{ color: '#D4C0FF' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4C0FF' }}>
                  Exclusivo Prime
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                  lineHeight: 1.2,
                }}
              >
                Emsculpt Neo
              </h3>
              <p style={{ color: '#C8B8F0', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: '520px', marginBottom: '20px' }}>
                La única tecnología que combina radiofrecuencia para reducir grasa y estimulación electromagnética de alta intensidad para tonificar el músculo — todo en 30 minutos, sin cirugía, sin agujas, sin recuperación.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  '−30% grasa localizada',
                  '+25% masa muscular',
                  'Visible desde la 3ª sesión',
                  'Sin cirugía · Sin agujas',
                ].map((s) => (
                  <span
                    key={s}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '9999px',
                      padding: '5px 14px',
                      fontSize: '0.8rem',
                      color: '#E8DCFF',
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {WBP.map((t) => (
              <TreatmentCard key={t.num} t={t} showPrimeBadge />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK COMPARISON TABLE ───────────── */}
      <section style={{ padding: '64px 24px', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <SectionLabel color={C.mid}>Comparativa</SectionLabel>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              fontWeight: 600,
              color: C.dark,
              lineHeight: 1.2,
            }}
          >
            ¿Cuál es la diferencia?
          </h2>
        </div>

        <div
          style={{
            backgroundColor: C.card,
            borderRadius: '20px',
            border: `1px solid ${C.border}`,
            overflow: 'hidden',
            boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              backgroundColor: '#F8F4FF',
              borderBottom: `1px solid ${C.border}`,
              padding: '14px 20px',
            }}
          >
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: C.light, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tratamiento</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: C.rose, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>Balance</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: C.violet, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>Prime</span>
          </div>
          {[
            { label: 'Terapia NESA', wb: '8 × 50\'', wbp: '10 × 50\'', roseBold: false },
            { label: 'Emsculpt Neo', wb: '—', wbp: '5 × 30\'', isPrime: true },
            { label: 'Ginecología', wb: '2 × 20\'', wbp: '3 × 20\'', roseBold: false },
            { label: 'Nutrición', wb: '2 × 50\'', wbp: '3 × 50\'', roseBold: false },
            { label: 'Suelo Pélvico', wb: '1 × 55\'', wbp: '2 × 55\'', roseBold: false },
          ].map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                padding: '14px 20px',
                borderBottom: i < 4 ? `1px solid ${C.border}` : 'none',
                backgroundColor: row.isPrime ? C.violetBg : 'transparent',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.875rem', color: row.isPrime ? C.violet : C.dark, fontWeight: row.isPrime ? 700 : 500 }}>
                {row.label}{row.isPrime && ' ★'}
              </span>
              <span
                style={{
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  color: row.wb === '—' ? C.light : C.mid,
                  fontStyle: row.wb === '—' ? 'italic' : 'normal',
                }}
              >
                {row.wb}
              </span>
              <span style={{ textAlign: 'center', fontSize: '0.82rem', color: row.isPrime ? C.violet : C.mid, fontWeight: row.isPrime ? 700 : 400 }}>
                {row.wbp}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEGUIMIENTO SECTION ──────────────── */}
      <section
        id="seguimiento"
        style={{
          backgroundColor: C.tealBg,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: '72px 24px',
          scrollMarginTop: '24px',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <SectionLabel color={C.teal}>Después del programa</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 600,
                color: C.dark,
                lineHeight: 1.15,
                marginBottom: '12px',
              }}
            >
              Programa de Seguimiento
            </h2>
            <p style={{ color: C.mid, fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '580px' }}>
              Al finalizar el programa principal — ya sea Woman Balance o Prime — existe un programa de seguimiento para consolidar los resultados y acompañarte en el mantenimiento a largo plazo.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {SEGUIMIENTO.map((item) => {
              const { Icon } = item;
              return (
                <div
                  key={item.num}
                  style={{
                    backgroundColor: C.card,
                    borderRadius: '20px',
                    border: `1px solid ${C.border}`,
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                  }}
                >
                  <div style={{ height: '3px', backgroundColor: item.color }} />
                  <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <div
                        style={{
                          width: '44px', height: '44px', borderRadius: '12px',
                          backgroundColor: item.colorBg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} style={{ color: item.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <h3
                            style={{
                              fontFamily: 'var(--font-cormorant), Georgia, serif',
                              fontSize: '1.25rem',
                              fontWeight: 600,
                              color: C.dark,
                              lineHeight: 1.2,
                            }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p style={{ color: C.light, fontSize: '0.78rem', lineHeight: 1.4 }}>{item.subtitle}</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            backgroundColor: item.colorBg, borderRadius: '9999px',
                            padding: '5px 12px', marginBottom: '4px',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: item.color }}>{item.sessions}</span>
                        </div>
                        <p style={{ fontSize: '0.72rem', color: C.light }}>{item.when}</p>
                      </div>
                    </div>

                    <p style={{ color: C.mid, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: item.options ? '20px' : 0 }}>
                      {item.desc}
                    </p>

                    {/* NESA / Neosculpt choice */}
                    {item.options && (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '12px',
                        }}
                      >
                        {item.options.map((opt) => (
                          <div
                            key={opt.label}
                            style={{
                              backgroundColor: C.roseBg,
                              border: `1px solid ${C.rose}25`,
                              borderRadius: '14px',
                              padding: '16px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.rose, flexShrink: 0 }} />
                              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: C.dark }}>{opt.label}</span>
                              <span style={{ fontSize: '0.75rem', color: C.light, marginLeft: 'auto' }}>{opt.detail}</span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: C.mid, lineHeight: 1.5 }}>{opt.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seguimiento summary */}
          <div
            style={{
              marginTop: '32px',
              backgroundColor: C.card,
              borderRadius: '16px',
              border: `1px solid ${C.border}`,
              padding: '24px 28px',
            }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.light, marginBottom: '12px' }}>
              Resumen del seguimiento
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
              }}
            >
              {[
                { label: 'NESA o Neosculpt', detail: 'Sem. 3·6·9·12·15', color: C.rose },
                { label: 'Suelo pélvico', detail: 'Semana 1 · 55 min', color: C.teal },
                { label: 'Nutrición', detail: 'Semana 2 · 50 min', color: C.gold },
                { label: 'Ginecología cierre', detail: 'Semana 15 · 20 min', color: C.violet },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: row.color, flexShrink: 0, marginTop: '4px' }} />
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{row.label}</p>
                    <p style={{ fontSize: '0.75rem', color: C.light }}>{row.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer
        style={{
          background: `linear-gradient(160deg, ${C.dark} 0%, #2A2040 100%)`,
          color: '#E8DDF5',
          padding: '56px 24px 48px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '52px', height: '52px', borderRadius: '16px',
              backgroundColor: 'rgba(184,96,126,0.2)', border: '1px solid rgba(184,96,126,0.3)',
              marginBottom: '20px',
            }}
          >
            <Heart size={22} style={{ color: C.rose }} />
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '10px',
              lineHeight: 1.2,
            }}
          >
            Clínica Montesinos
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#B0A0C8',
              marginBottom: '20px',
            }}
          >
            Valencia
          </p>
          <p style={{ color: '#8A7A9A', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '32px' }}>
            ¿Tienes dudas sobre tu programa? Habla directamente con tu equipo — están para ayudarte en cada paso del proceso.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            {[
              { label: 'Woman Balance', href: '#woman-balance', color: C.rose },
              { label: 'Prime', href: '#woman-balance-prime', color: C.violet },
              { label: 'Seguimiento', href: '#seguimiento', color: C.teal },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: l.color,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  opacity: 0.85,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <p style={{ color: '#4A4060', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            © 2026 · Clínica Montesinos · Todos los derechos reservados
          </p>
        </div>
      </footer>
    </main>
  );
}
