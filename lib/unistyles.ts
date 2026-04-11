import { StyleSheet } from 'react-native-unistyles';

const darkTheme = {
  colors: {
    bg1: '#2A3239',
    bg2: '#3A4651', // bottom bar / drawer
    bg3: '#3F4D59', // bottom bar open
    border: '#444444',
    buttonDark: '#53606C',
    text: '#FFFFFF',
    textSecondary: '#888888',
    textInverted: '#000000',
    accent: '#444444',
    verticalLine: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 20,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
  },
};

const lightTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    bg1: '#FFFFFF',
    bg2: '#F5F5F5',
    bg3: '#E5E5E5',
    buttonDark: '#8fa6ba',
    text: '#000000',
    textSecondary: '#888888',
    accent: '#444444',
    textInverted: '#FFFFFF',
    verticalLine: 'rgba(0, 0, 0, 0.1)',
  },
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  superLarge: 2000,
  tvLike: 4000,
} as const;

type AppThemes = typeof appThemes;

type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    adaptiveThemes: true,
  },
});
