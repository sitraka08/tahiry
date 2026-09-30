import { View } from 'react-native';

import { AppText, PressableFeedback } from '@/components';
import { tap } from '@/lib/haptics';
import { THEMES, THEME_NAMES, useThemeStore, type ThemeName } from '@/theme';

type Props = { onChoose: (name: ThemeName) => void };

export function ThemePicker({ onChoose }: Props) {
  const current = useThemeStore((s) => s.theme);
  const active = THEMES[current];

  return (
    <View className="flex-row gap-2">
      {THEME_NAMES.map((name) => {
        const theme = THEMES[name];
        const selected = name === current;
        return (
          <PressableFeedback
            key={name}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={`Thème ${name}`}
            onPress={() => {
              tap();
              onChoose(name);
            }}
            className="flex-1 gap-1.5 rounded-2xl border-2 bg-card p-1.5"
          >
            <View
              style={{
                backgroundColor: theme.bg,
                borderColor: selected ? active.ink : 'transparent',
              }}
              className="h-14 justify-between rounded-[10px] border-2 p-2"
            >
              <View style={{ backgroundColor: theme.ink }} className="h-1.5 w-3/5 rounded-[3px]" />
              <View
                style={{ backgroundColor: theme.accent }}
                className="size-[22px] rounded-[7px]"
              />
            </View>
            <AppText weight="medium" className="text-center text-xs">
              {name}
            </AppText>
          </PressableFeedback>
        );
      })}
    </View>
  );
}
