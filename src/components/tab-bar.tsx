import { Link } from 'expo-router';
import { type TabTriggerSlotProps } from 'expo-router/ui';
import { Plus, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { useThemeTokens } from '@/theme';

import { AppText } from './app-text';

type ButtonProps = TabTriggerSlotProps & { icon: LucideIcon; label: string };

export function TabButton({ icon: Icon, label, isFocused, ...rest }: ButtonProps) {
  const t = useThemeTokens();
  const color = isFocused ? t.ink : t.muted;
  return (
    <Pressable
      {...rest}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      className="h-14 w-16 items-center justify-center gap-1"
    >
      <Icon size={24} color={color} strokeWidth={isFocused ? 2.2 : 1.8} />
      <AppText weight={isFocused ? 'bold' : 'medium'} style={{ color }} className="text-[11px]">
        {label}
      </AppText>
    </Pressable>
  );
}

export function TabFab() {
  const t = useThemeTokens();
  return (
    <View className="w-16 items-center">
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
