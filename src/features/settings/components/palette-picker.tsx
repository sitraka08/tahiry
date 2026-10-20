import { Check } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppText } from '@/components';
import { tap } from '@/lib/haptics';
import {
  PALETTES,
  PALETTE_LABELS,
  getThemeTokens,
  useResolvedColorScheme,
  type Palette,
} from '@/theme';

type Props = { value: Palette; onChange: (value: Palette) => void };

export function PalettePicker({ value, onChange }: Props) {
  const scheme = useResolvedColorScheme();
  return (
    <View accessibilityRole="radiogroup" className="flex-row rounded-card bg-tile px-1 py-3">
      {PALETTES.map((p) => {
        const active = p === value;
        const t = getThemeTokens(p, scheme);
        return (
          <Pressable
            key={p}
            accessibilityRole="radio"
            accessibilityLabel={PALETTE_LABELS[p]}
            accessibilityState={{ selected: active }}
            onPress={() => {
              tap();
              onChange(p);
            }}
            className="flex-1 items-center gap-1.5"
          >
            <View
              className={`h-11 w-11 items-center justify-center rounded-full border-2 ${active ? 'border-ink' : 'border-transparent'}`}
              style={{ backgroundColor: t.bg }}
            >
              <View
                className="h-6 w-6 items-center justify-center rounded-full"
                style={{ backgroundColor: t.accent }}
              >
                {active ? <Check size={14} color={t.onAccent} strokeWidth={2} /> : null}
              </View>
            </View>
            <AppText
              variant="micro"
              weight={active ? 'bold' : 'medium'}
              tone={active ? 'ink' : 'muted'}
              numberOfLines={1}
            >
              {PALETTE_LABELS[p]}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
