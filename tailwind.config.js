/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        // Electric blue of the open bracket around the R.W Electrical logo (sampled: #0D21FF)
        volt: {
          50: '#EEF0FF',  // tint for backgrounds and illustration panels
          100: '#DDE1FF',
          200: '#BCC3FF',
          300: '#8E98FF',
          400: '#5B6BFF', // logo blue lifted for use on dark backgrounds
          500: '#0D21FF', // the logo blue itself — buttons, links, accents
          600: '#0A1AD6', // hover / pressed
          700: '#0814A8',
        },
        // "ELECTRICAL" wordmark black in the logo, softened a touch for screens
        ink: {
          DEFAULT: '#0B0C10',
          800: '#16181F',
          700: '#22252E',
        },
        // Grey of the outlined "RW" letters and the "ELECTRICAL CONTRACTORS" line (sampled: #565656)
        graphite: {
          DEFAULT: '#565656',
          light: '#8A8C93',
          line: '#D9DBE3', // hairlines and borders
        },
        // Page background — a cool off-white so the blue reads crisply
        paper: '#F7F8FB',
        // Warm lamp light — used only inside the illustrations, not part of the logo
        glow: '#FFCF4A',
      },
      fontFamily: {
        display: ['"Saira Variable"', 'Saira', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans Variable"', '"Public Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
      boxShadow: {
        card: '0 1px 2px rgba(11,12,16,.04), 0 8px 24px -12px rgba(11,12,16,.12)',
        lift: '0 2px 4px rgba(11,12,16,.04), 0 18px 40px -18px rgba(13,33,255,.28)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(18px)' }, '100%': { opacity: 1, transform: 'none' } },
        flow: { to: { strokeDashoffset: '-100' } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        flow: 'flow 3.2s linear infinite',
      },
    },
  },
  plugins: [],
};
