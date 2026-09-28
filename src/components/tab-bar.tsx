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
      style={{ height: 52, width: 64, alignItems: 'center', justifyContent: 'center', gap: 4 }}
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
    <View style={{ width: 58 }}>
      <Link href="/add-transaction" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ajouter une opération"
          style={{
            width: 58,
            height: 58,
            borderRadius: 19,
            borderWidth: 3,
            borderColor: t.bg,
            backgroundColor: t.accent,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateY: -16 }],
          }}
        >
          <Plus size={26} color={t.onAccent} strokeWidth={2.2} />
        </Pressable>
      </Link>
    </View>
  );
}
