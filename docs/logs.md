@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

:root {
  --radius: 0.75rem;

  /* ============================================================
     2026 SOFT-TECH COLOR SYSTEM
     ============================================================ */

  /* BACKGROUND SYSTEM - Clean & Engineering-Focused
     Ana arka plan: Geleneksel beyaz (maksimum ferahlık)
     Hero section: #F8F9FA (hafif ayrım için) */
  --background: #FFFFFF;
  --foreground: #1A1A2E;

  /* GLASS CARD - Semi-transparent white surfaces
     Hafif blur efektli cam katmanları */
  --card: rgba(255, 255, 255, 0.8);
  --card-foreground: #1A1A2E;

  --popover: rgba(255, 255, 255, 0.95);
  --popover-foreground: #1A1A2E;

  /* PEACH CORAL - Primary Accent (CRITICAL USE ONLY)
     SADECE birincil CTA butonlarında
     SADECE kritik uyumluluk uyarılarında
     Disiplinli kullanım - maksimum etki */
  --primary: #E3987F;
  --primary-foreground: #FFFFFF;

  /* OXFORD BLUE - Logic Layer Color
     Kart ince çerçeveler, teknik metinler
     "Mantık katmanı" - arka plan olarak değil, vurgu olarak */
  --logic-blue: #04165D;
  --logic-blue-dim: rgba(4, 22, 93, 0.08);

  /* SAPPHIRE BLUE - Component Glow Effect
     PC anakart parça parlama efekti */
  --sapphire-glow: rgba(9, 80, 205, 0.4);
  --sapphire-glow-subtle: rgba(9, 80, 205, 0.15);

  /* Secondary - Neutral surfaces */
  --secondary: rgba(26, 26, 46, 0.05);
  --secondary-foreground: #1A1A2E;

  /* Muted - Subtle content */
  --muted: rgba(26, 26, 46, 0.06);
  --muted-foreground: #6B7280;

  /* Accent - Interactive states */
  --accent: rgba(227, 152, 127, 0.12);
  --accent-foreground: #E3987F;

  /* Destructive - Error states */
  --destructive: #DC2626;
  --destructive-foreground: #FFFFFF;

  /* Borders - Oxford Blue thin lines */
  --border: rgba(4, 22, 93, 0.12);
  --border-thin: rgba(4, 22, 93, 0.08);
  --input: rgba(4, 22, 93, 0.15);

  /* Ring - Focus states */
  --ring: #E3987F;

  /* Chart colors */
  --chart-1: #E3987F;
  --chart-2: #04165D;
  --chart-3: #0950CD;
  --chart-4: #6B7280;
  --chart-5: #9CA3AF;

  /* Sidebar colors */
  --sidebar: #FFFFFF;
  --sidebar-foreground: #1A1A2E;
  --sidebar-primary: #E3987F;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: rgba(4, 22, 93, 0.08);
  --sidebar-accent-foreground: #1A1A2E;
  --sidebar-border: rgba(4, 22, 93, 0.12);
  --sidebar-ring: #E3987F;
}

.dark {
  /* ============================================================
     DARK MODE - Deep & Consistent
     Subtle section separation, minimal gradients
     ============================================================ */

  /* Base - Deep dark blue, almost black */
  --background: #0D1117;
  --foreground: #E6EDF3;

  /* Cards - Semi-transparent with blue tint */
  --card: rgba(22, 27, 34, 0.8);
  --card-foreground: #E6EDF3;

  --popover: rgba(22, 27, 34, 0.95);
  --popover-foreground: #E6EDF3;

  /* Peach Coral - Keep brand color */
  --primary: #E3987F;
  --primary-foreground: #0D1117;

  /* Logic Blue - Lighter for dark mode */
  --logic-blue: #58A6FF;
  --logic-blue-dim: rgba(88, 166, 255, 0.1);

  /* Sapphire - More subtle in dark */
  --sapphire-glow: rgba(88, 166, 255, 0.3);
  --sapphire-glow-subtle: rgba(88, 166, 255, 0.08);

  /* Muted colors */
  --secondary: rgba(255, 255, 255, 0.08);
  --secondary-foreground: #E6EDF3;

  --muted: rgba(255, 255, 255, 0.04);
  --muted-foreground: #8B949E;

  /* Accent */
  --accent: rgba(227, 152, 127, 0.15);
  --accent-foreground: #E3987F;

  /* Destructive */
  --destructive: #F85149;
  --destructive-foreground: #FFFFFF;

  /* Borders - Subtle but visible */
  --border: rgba(48, 54, 61, 0.5);
  --border-thin: rgba(48, 54, 61, 0.3);
  --input: rgba(48, 54, 61, 0.6);

  --ring: #E3987F;

  /* Charts */
  --chart-1: #E3987F;
  --chart-2: #58A6FF;
  --chart-3: #0950CD;
  --chart-4: #8B949E;
  --chart-5: #6B7280;

  /* Sidebar */
  --sidebar: #0D1117;
  --sidebar-foreground: #E6EDF3;
  --sidebar-primary: #E3987F;
  --sidebar-primary-foreground: #0D1117;
  --sidebar-accent: rgba(255, 255, 255, 0.08);
  --sidebar-accent-foreground: #E6EDF3;
  --sidebar-border: rgba(48, 54, 61, 0.5);
  --sidebar-ring: #E3987F;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/* ============================================================
   2026 SOFT-TECH UTILITY CLASSES
   ============================================================ */

/* Glassmorphism card effect */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(4, 22, 93, 0.12);
}

.dark .glass-card {
  background: rgba(22, 27, 34, 0.7);
  border: 1px solid rgba(48, 54, 61, 0.4);
}

/* Hero background - subtle off-white for section separation */
.bg-hero {
  background-color: #F8F9FA;
}

.dark .bg-hero {
  background-color: #0D1117;
}

/* Oxford Blue thin border */
.border-logic {
  border-color: rgba(4, 22, 93, 0.12);
}

.dark .border-logic {
  border-color: rgba(48, 54, 61, 0.5);
}

/* Sapphire glow effect - very subtle in dark */
.glow-sapphire {
  box-shadow:
    0 0 20px rgba(9, 80, 205, 0.15),
    0 0 40px rgba(9, 80, 205, 0.08);
}

.dark .glow-sapphire {
  box-shadow:
    0 0 12px rgba(88, 166, 255, 0.15),
    0 0 24px rgba(88, 166, 255, 0.06);
}

/* Peach coral glow - for CTAs only */
.glow-primary {
  box-shadow:
    0 0 20px rgba(227, 152, 127, 0.3),
    0 0 40px rgba(227, 152, 127, 0.15);
}

.dark .glow-primary {
  box-shadow:
    0 0 16px rgba(227, 152, 127, 0.2),
    0 0 32px rgba(227, 152, 127, 0.1);
}

/* Tech grid background pattern - minimal in dark */
.bg-tech-grid {
  background-image:
    linear-gradient(rgba(4, 22, 93, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(4, 22, 93, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.dark .bg-tech-grid {
  background-image:
    linear-gradient(rgba(48, 54, 61, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(48, 54, 61, 0.15) 1px, transparent 1px);
}

/* Monospace for technical indicators */
.font-tech {
  font-family: var(--font-geist-mono), 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  letter-spacing: -0.02em;
}

/* ============================================================
   BENTO GRID LAYOUT UTILITIES
   ============================================================ */

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.bento-item-span-4 { grid-column: span 4; }
.bento-item-span-6 { grid-column: span 6; }
.bento-item-span-8 { grid-column: span 8; }
.bento-item-span-12 { grid-column: span 12; }

@media (max-width: 1024px) {
  .bento-item-span-4,
  .bento-item-span-6,
  .bento-item-span-8 {
    grid-column: span 6;
  }
}

@media (max-width: 640px) {
  .bento-item-span-4,
  .bento-item-span-6,
  .bento-item-span-8,
  .bento-item-span-12 {
    grid-column: span 12;
  }
}

/* ============================================================
   MOTHERBOARD EFFECT - PC Component Styling
   ============================================================ */

.motherboard-slot {
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(4, 22, 93, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  isolation: isolate; /* Create new stacking context */
}

.motherboard-slot::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 0.75rem;
  padding: 1px;
  background: linear-gradient(135deg,
    rgba(9, 80, 205, 0.3) 0%,
    transparent 50%,
    transparent 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none; /* Allow clicks to pass through */
  z-index: 0;
}

.motherboard-slot:hover::before {
  opacity: 1;
}

.motherboard-slot:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(9, 80, 205, 0.3);
  box-shadow:
    0 0 0 1px rgba(9, 80, 205, 0.1),
    0 4px 20px rgba(9, 80, 205, 0.15),
    0 8px 40px rgba(4, 22, 93, 0.1);
  transform: translateY(-2px);
}

/* Dark mode motherboard - more subtle */
.dark .motherboard-slot {
  background: rgba(22, 27, 34, 0.6);
  border-color: rgba(48, 54, 61, 0.5);
}

.dark .motherboard-slot:hover {
  background: rgba(22, 27, 34, 0.85);
  border-color: rgba(88, 166, 255, 0.3);
  box-shadow:
    0 0 0 1px rgba(88, 166, 255, 0.08),
    0 4px 16px rgba(88, 166, 255, 0.1),
    0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Component connector dots */
.connector-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(4, 22, 93, 0.4);
  border-radius: 50%;
}

.dark .connector-dot {
  background: rgba(88, 166, 255, 0.4);
}

.connector-dot::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: rgba(9, 80, 205, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dark .connector-dot::after {
  background: rgba(88, 166, 255, 0.5);
}

.motherboard-slot:hover .connector-dot::after {
  opacity: 1;
}

/* Connector positions */
.connector-tl { top: 6px; left: 6px; }
.connector-tr { top: 6px; right: 6px; }
.connector-bl { bottom: 6px; left: 6px; }
.connector-br { bottom: 6px; right: 6px; }

/* ============================================================
   CUSTOM ANIMATIONS
   ============================================================ */

@keyframes float-subtle {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes pulse-sapphire {
  0%, 100% {
    box-shadow: 0 0 20px rgba(9, 80, 205, 0.15);
  }
  50% {
    box-shadow: 0 0 30px rgba(9, 80, 205, 0.25);
  }
}

@keyframes scan-reveal {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

@keyframes tech-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float-subtle {
  animation: float-subtle 4s ease-in-out infinite;
}

.animate-pulse-sapphire {
  animation: pulse-sapphire 3s ease-in-out infinite;
}

.animate-tech-fade-in {
  animation: tech-fade-in 0.5s ease-out forwards;
}

/* Staggered animation delays */
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
.stagger-5 { animation-delay: 0.25s; }
.stagger-6 { animation-delay: 0.3s; }
.stagger-7 { animation-delay: 0.35s; }
.stagger-8 { animation-delay: 0.4s; }

/* ============================================================
   STATUS BADGE COLORS
   ============================================================ */

/* Status badges - more vibrant in dark mode */
.status-compatible {
  background: rgba(34, 197, 94, 0.12);
  color: #16A34A;
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.status-partial {
  background: rgba(245, 158, 11, 0.12);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.status-incompatible {
  background: rgba(220, 38, 38, 0.12);
  color: #DC2626;
  border: 1px solid rgba(220, 38, 38, 0.25);
}

.status-unknown {
  background: rgba(107, 114, 128, 0.12);
  color: #6B7280;
  border: 1px solid rgba(107, 114, 128, 0.25);
}

/* Dark mode status badges - clearer colors */
.dark .status-compatible {
  background: rgba(46, 160, 67, 0.2);
  border-color: rgba(46, 160, 67, 0.4);
  color: #3FB950;
}

.dark .status-partial {
  background: rgba(210, 153, 34, 0.2);
  border-color: rgba(210, 153, 34, 0.4);
  color: #D29922;
}

.dark .status-incompatible {
  background: rgba(218, 54, 51, 0.2);
  border-color: rgba(218, 54, 51, 0.4);
  color: #F85149;
}

.dark .status-unknown {
  background: rgba(110, 118, 129, 0.2);
  border-color: rgba(110, 118, 129, 0.4);
  color: #8B949E;
}
