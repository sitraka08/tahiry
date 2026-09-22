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
        ink: token('ink'),
        muted: token('muted'),
        accent: token('accent'),
        'on-accent': token('on-accent'),
        dark: token('dark'),
        'on-dark': token('on-dark'),
        'dark-muted': token('dark-muted'),
        line: token('line'),
        seg3: token('seg3'),
        danger: token('danger'),
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
