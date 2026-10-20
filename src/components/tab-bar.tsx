import { Link } from 'expo-router';
import { type TabTriggerSlotProps } from 'expo-router/ui';
import { Plus, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { useThemeTokens } from '@/theme';

import { AppText } from './app-text';

// solid: filled shape, cutout: filled shape with inner lines in the background color.
type Fill = 'solid' | 'cutout';

// Inline on purpose: TabTrigger passes its own style and would override classes.
const CELL = { flex: 1, height: 56, alignItems: 'center', justifyContent: 'center' } as const;

type ButtonProps = TabTriggerSlotProps & { icon: LucideIcon; label: string; fill?: Fill };

export function TabButton({ icon: Icon, label, fill, isFocused, ...rest }: ButtonProps) {
  const t = useThemeTokens();
  const color = isFocused ? t.ink : t.muted;
  const filled = isFocused && fill;
  return (
    <Pressable
      {...rest}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      style={CELL}
    >
      <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <Icon
          size={24}
          color={filled === 'cutout' ? t.bg : color}
          fill={filled ? t.ink : 'none'}
          strokeWidth={isFocused ? 2.2 : 1.8}
        />
        <AppText weight={isFocused ? 'bold' : 'medium'} style={{ color }} className="text-micro">
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

export function TabFab() {
  const t = useThemeTokens();
  return (
    <View style={CELL}>
      <Link href="/add-transaction" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ajouter une opération"
          className="size-14 items-center justify-center rounded-full bg-accent active:opacity-80"
        >
          <Plus size={26} color={t.onAccent} strokeWidth={2.2} />
        </Pressable>
      </Link>
    </View>
  );
}

// Fades the content into the background behind the floating tab bar.
export function TabBarFade() {
  const t = useThemeTokens();
  return (
    <Svg
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <Defs>
        <LinearGradient id="tab-fade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={t.bg} stopOpacity={0} />
          <Stop offset="0.38" stopColor={t.bg} stopOpacity={1} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#tab-fade)" />
    </Svg>
  );
}
