/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './assets/*.js',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        rust: {
          deepest: 'var(--color-rust-deepest, #120b07)',
          base: 'var(--color-rust-base, #1b110a)',
          surface: 'var(--color-rust-surface, #24160d)',
          elevated: 'var(--color-rust-elevated, #311e13)',
          border: 'var(--color-rust-border, #442a1b)',
          muted: 'var(--color-rust-muted, #82573d)',
          warm: 'var(--color-rust-warm, #b35d33)',
          light: 'var(--color-rust-light, #f7f1ea)',
          parchment: 'var(--color-rust-parchment, #faf6f0)',
        },
        teal: {
          primary: 'var(--color-teal-primary, #0d9488)',
          hover: 'var(--color-teal-hover, #0f766e)',
          bright: 'var(--color-teal-bright, #14b8a6)',
          accent: 'var(--color-teal-accent, #2dd4bf)',
        },
        zari: {
          gold: 'var(--color-zari-gold, #c99b53)',
          sheen: 'var(--color-zari-sheen, #f3dfa2)',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif, "Playfair Display")', 'Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans, "Plus Jakarta Sans")', 'Inter', 'sans-serif'],
      },
      spacing: {
        'expansive': 'var(--space-expansive, clamp(4.5rem, 8vw, 8.5rem))',
        'monumental': 'var(--space-monumental, clamp(6rem, 12vw, 13rem))',
      },
      gridTemplateColumns: {
        'mobile-catalog': 'repeat(2, minmax(0, 1fr))',
        'desktop-catalog': 'repeat(3, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
