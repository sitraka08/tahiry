import { useMemo, type ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';
import { vars } from 'nativewind';

import { getSheetTokens, getThemeTokens } from './palettes';
import { resolveColorScheme, type ColorScheme } from './scheme';
import { useThemeStore } from './theme-store';
import type { ThemeTokens } from './themes';

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
  return getThemeTokens(
    useThemeStore((s) => s.palette),
    useResolvedColorScheme(),
  );
}

export function useSheetTokens() {
  return getSheetTokens(
    useThemeStore((s) => s.palette),
    useResolvedColorScheme(),
  );
}

// The balance card and illustrations always use the dark variant.
export function useCardTokens() {
  return getThemeTokens(
    useThemeStore((s) => s.palette),
    'dark',
  );
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
