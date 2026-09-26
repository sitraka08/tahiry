import { Link } from 'expo-router';
import { TabList, TabTrigger, type TabTriggerSlotProps } from 'expo-router/ui';
import { Bell, ChartColumn, Clock, House, Plus, type LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeTokens } from '@/theme';

type ButtonProps = TabTriggerSlotProps & { icon: LucideIcon; label: string };

function TabButton({ icon: Icon, label, isFocused, ...rest }: ButtonProps) {
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

export function TabBar() {
  const t = useThemeTokens();
  const insets = useSafeAreaInsets();
  return (
    <TabList
      style={{ minHeight: 84, paddingBottom: Math.max(insets.bottom, 18) }}
      className="flex-row items-center justify-around rounded-t-[26px] bg-dark px-3 pt-2"
    >
      <TabTrigger name="index" href="/" asChild>
        <TabButton icon={House} label="Accueil" />
      </TabTrigger>
      <TabTrigger name="history" href="/history" asChild>
        <TabButton icon={Clock} label="Historique" />
      </TabTrigger>
      <View className="w-[58px]">
        <Link href="/add-transaction" asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ajouter une opération"
            style={{ borderColor: t.bg }}
            className="size-[58px] -translate-y-4 items-center justify-center rounded-[19px] border-[3px] bg-accent active:opacity-80"
          >
            <Plus size={26} color={t.onAccent} strokeWidth={2.2} />
          </Pressable>
        </Link>
      </View>
      <TabTrigger name="stats" href="/stats" asChild>
        <TabButton icon={ChartColumn} label="Stats" />
      </TabTrigger>
      <TabTrigger name="reminders" href="/reminders" asChild>
        <TabButton icon={Bell} label="Rappels" />
      </TabTrigger>
    </TabList>
  );
}
