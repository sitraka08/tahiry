import type { LucideIcon } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, Switch, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

export function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="mx-5 mt-5">
      <AppText
        weight="medium"
        className="text-[13px] uppercase text-muted"
        style={{ letterSpacing: 0.6 }}
      >
        {title}
      </AppText>
      <View className="mt-2.5 rounded-[20px] border border-line bg-card px-3.5 py-1">
        {children}
      </View>
    </View>
  );
}

type RowProps = {
  icon: LucideIcon;
  label: string;
  value?: string;
  last?: boolean;
  onPress?: () => void;
  toggle?: { value: boolean; onChange: (value: boolean) => void };
};

export function SettingsRow({ icon: Icon, label, value, last, onPress, toggle }: RowProps) {
  const t = useThemeTokens();
  const body = (
    <View
      className={`min-h-[50px] flex-row items-center gap-3 ${last ? '' : 'border-b border-line'}`}
    >
      <Icon size={20} color={t.ink} strokeWidth={1.8} />
      <AppText className="flex-1 text-[15px]">{label}</AppText>
      {value ? <AppText className="text-[13px] text-muted">{value}</AppText> : null}
      {toggle ? (
        <Switch
          accessibilityLabel={label}
          value={toggle.value}
          onValueChange={(v) => {
            tap();
            toggle.onChange(v);
          }}
          trackColor={{ true: t.dark, false: t.line }}
          thumbColor={toggle.value ? t.accent : t.tile}
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
