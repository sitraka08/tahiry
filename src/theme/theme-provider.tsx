import { useMemo, type ReactNode } from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';

import { useThemeStore } from './theme-store';
import { THEMES, type ThemeTokens } from './themes';

const toCssVars = (t: ThemeTokens) =>
  vars({
    '--bg': t.bg,
    '--card': t.card,
    '--tile': t.tile,
    '--ink': t.ink,
    '--muted': t.muted,
    '--accent': t.accent,
    '--on-accent': t.onAccent,
    '--dark': t.dark,
    '--on-dark': t.onDark,
    '--dark-muted': t.darkMuted,
    '--line': t.line,
    '--outline': t.outline,
    '--seg3': t.seg3,
    '--danger': t.danger,
  });

export function useThemeTokens() {
  const name = useThemeStore((s) => s.theme);
  return THEMES[name];
}

export function ThemeScope({ children, className }: { children: ReactNode; className?: string }) {
  const tokens = useThemeTokens();
  const style = useMemo(() => toCssVars(tokens), [tokens]);
  return (
    <View style={style} className={className}>
      {children}
    </View>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeScope className="flex-1 bg-bg">{children}</ThemeScope>;
}
