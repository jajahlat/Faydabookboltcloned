export const Colors = {
  primary: '#126b40',
  accent: '#e4c77c',
  background: '#f8f5f0',
  text: '#222222',
  textLight: '#666666',
  white: '#ffffff',

  dark: {
    background: '#1a1a1a',
    text: '#f8f8f8',
    textLight: '#a0a0a0',
  },

  sepia: {
    background: '#f4ecd8',
    text: '#5b4636',
  },

  night: {
    background: '#0d0d0d',
    text: '#c4c4c4',
  },

  highlightColors: {
    gold: '#e4c77c',
    emerald: '#126b40',
    blue: '#4a90e2',
    pink: '#e57373',
  },

  gradients: {
    primary: ['#126b40', '#0d4f2e'],
    accent: ['#e4c77c', '#d4b76c'],
    hero: ['#126b40', '#0a5a34', '#0d4f2e'],
  },
};

export const Typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },

  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export type ReadingTheme = 'Light' | 'Sepia' | 'Dark' | 'Night';

export const getReadingThemeColors = (theme: ReadingTheme) => {
  switch (theme) {
    case 'Sepia':
      return { background: Colors.sepia.background, text: Colors.sepia.text };
    case 'Dark':
      return { background: Colors.dark.background, text: Colors.dark.text };
    case 'Night':
      return { background: Colors.night.background, text: Colors.night.text };
    case 'Light':
    default:
      return { background: Colors.white, text: Colors.text };
  }
};
