const token = (name) => `var(--${name})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        card: token('card'),
        tile: token('tile'),
        raised: token('raised'),
        ink: token('ink'),
        muted: token('muted'),
        subtle: token('subtle'),
        accent: token('accent'),
        'on-accent': token('on-accent'),
        dark: token('dark'),
        'on-dark': token('on-dark'),
        'dark-muted': token('dark-muted'),
        inverse: token('inverse'),
        'on-inverse': token('on-inverse'),
        positive: token('positive'),
        negative: token('negative'),
        line: token('line'),
        outline: token('outline'),
        seg3: token('seg3'),
        danger: token('danger'),
        'cat-orange': token('cat-orange'),
        'cat-blue': token('cat-blue'),
        'cat-sand': token('cat-sand'),
        'cat-violet': token('cat-violet'),
        'cat-rose': token('cat-rose'),
        'cat-teal': token('cat-teal'),
        'cat-green': token('cat-green'),
        'illus-ink': token('illus-ink'),
      },
      borderRadius: {
        tile: '10px',
        card: '16px',
        bank: '18px',
      },
      fontSize: {
        hero: ['38px', { lineHeight: '42px', letterSpacing: '-1px' }],
        display: ['34px', { lineHeight: '40px', letterSpacing: '-0.8px' }],
        title: ['22px', { lineHeight: '28px', letterSpacing: '-0.4px' }],
        headline: ['17px', { lineHeight: '22px', letterSpacing: '-0.2px' }],
        body: ['15px', { lineHeight: '20px' }],
        caption: ['13px', { lineHeight: '16px' }],
        micro: ['11px', { lineHeight: '14px' }],
        // Inputs never get a line height: Android clips and scrolls the text otherwise.
        input: '15px',
        'input-sm': '14px',
      },
      fontFamily: {
        gs: ['GoogleSans-Regular'],
        'gs-medium': ['GoogleSans-Medium'],
        'gs-semibold': ['GoogleSans-SemiBold'],
        'gs-bold': ['GoogleSans-Bold'],
      },
    },
  },
};
