import { useMemo, type ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';
import { vars } from 'nativewind';

import { resolveColorScheme, type ColorScheme } from './scheme';
import { useThemeStore } from './theme-store';
import { THEMES, type ThemeTokens } from './themes';

const toCssVars = (t: ThemeTokens) =>
  vars(
    Object.fromEntries(
      Object.entries(t).map(([key, value]) => [
        `--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`,
        value,
      ]),
    ),
  );

export function useResolvedColorScheme(): ColorScheme {
  const pref = useThemeStore((s) => s.colorScheme);
  const system = useColorScheme();
  return resolveColorScheme(pref, system);
}

export function useThemeTokens() {
  return THEMES[useResolvedColorScheme()];
}

type ScopeProps = { children: ReactNode; className?: string; overrides?: Partial<ThemeTokens> };

export function ThemeScope({ children, className, overrides }: ScopeProps) {
  const tokens = useThemeTokens();
  const style = useMemo(() => toCssVars({ ...tokens, ...overrides }), [tokens, overrides]);
  return (
    <View style={style} className={className}>
      {children}
    </View>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeScope className="flex-1 bg-bg">{children}</ThemeScope>;
}
