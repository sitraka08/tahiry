import { Pressable, View } from 'react-native';

import { tap } from '@/lib/haptics';

import { AppText } from './app-text';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Segmented<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View className="flex-row gap-1 rounded-full bg-tile p-1">
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
            className={`h-10 flex-1 items-center justify-center rounded-full ${active ? 'bg-inverse' : ''}`}
          >
            <AppText
              weight={active ? 'bold' : 'medium'}
              className={`text-caption ${active ? 'text-on-inverse' : 'text-muted'}`}
            >
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
