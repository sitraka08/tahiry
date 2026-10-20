import type { LucideIcon } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, Switch, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="mx-4 mt-5">
      <AppText
        variant="caption"
        weight="bold"
        tone="muted"
        className="uppercase"
        style={{ letterSpacing: 0.6 }}
      >
        {title}
      </AppText>
      <View className="mt-2 rounded-card bg-card px-3.5 py-1">{children}</View>
    </View>
  );
}

type RowProps = {
  icon: LucideIcon;
  label: string;
  value?: string;
  onPress?: () => void;
  toggle?: { value: boolean; onChange: (value: boolean) => void };
};

export function SettingsRow({ icon: Icon, label, value, onPress, toggle }: RowProps) {
  const t = useThemeTokens();
  const body = (
    <View className="min-h-14 flex-row items-center gap-3">
      <View className="size-9 items-center justify-center rounded-tile bg-tile">
        <Icon size={18} color={t.ink} strokeWidth={1.8} />
      </View>
      <AppText variant="body" className="flex-1">
        {label}
      </AppText>
      {value ? (
        <AppText variant="caption" tone="muted">
          {value}
        </AppText>
      ) : null}
      {toggle ? (
        <Switch
          accessibilityLabel={label}
          value={toggle.value}
          onValueChange={(v) => {
            tap();
            toggle.onChange(v);
          }}
          trackColor={{ true: t.accent, false: t.raised }}
          thumbColor={t.card}
        />
      ) : onPress ? (
        <ChevronRight size={18} color={t.muted} strokeWidth={2} />
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="active:opacity-70"
    >
      {body}
    </Pressable>
  );
}
