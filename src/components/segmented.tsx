import { Pressable, Text, View } from 'react-native';

import { tap } from '@/lib/haptics';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View className="flex-row gap-1 rounded-2xl bg-card p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => {
              tap();
              onChange(o.value);
            }}
            className={`h-10 flex-1 items-center justify-center rounded-xl ${active ? 'bg-inverse' : ''}`}
          >
            <Text
              className={`text-[13px] ${active ? 'font-gs-bold text-on-inverse' : 'font-gs-medium text-muted'}`}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
