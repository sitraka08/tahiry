import { Link } from 'expo-router';
import { type TabTriggerSlotProps } from 'expo-router/ui';
import { Plus, type LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { useThemeTokens } from '@/theme';

type ButtonProps = TabTriggerSlotProps & { icon: LucideIcon; label: string };

export function TabButton({ icon: Icon, label, isFocused, ...rest }: ButtonProps) {
  const t = useThemeTokens();
  const color = isFocused ? t.accent : t.darkMuted;
  return (
    <Pressable
      {...rest}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isFocused }}
      className="h-[52px] w-16 items-center justify-center gap-1"
    >
      <Icon size={22} color={color} strokeWidth={1.8} />
      <Text
        style={{ color }}
        className={`text-[11px] ${isFocused ? 'font-gs-bold' : 'font-gs-medium'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function TabFab() {
  const t = useThemeTokens();
  return (
    <View className="w-[58px]">
      <Link href="/add-transaction" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ajouter une opération"
          style={{ borderColor: t.bg, transform: [{ translateY: -16 }] }}
          className="size-[58px] items-center justify-center rounded-[19px] border-[3px] bg-accent active:opacity-80"
        >
          <Plus size={26} color={t.onAccent} strokeWidth={2.2} />
        </Pressable>
      </Link>
    </View>
  );
}
