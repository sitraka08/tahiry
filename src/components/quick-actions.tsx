import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, type LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { press } from '@/lib/haptics';
import { useThemeTokens } from '@/theme';

import { AppText } from './app-text';
import { PressableFeedback } from './pressable-feedback';

type Action = { type: 'out' | 'in' | 'transfer'; label: string; icon: LucideIcon };

const ACTIONS: Action[] = [
  { type: 'out', label: 'Dépense', icon: ArrowUpRight },
  { type: 'in', label: 'Revenu', icon: ArrowDownLeft },
  { type: 'transfer', label: 'Transfert', icon: ArrowLeftRight },
];

type Props = { onPick: (type: Action['type']) => void };

export function QuickActions({ onPick }: Props) {
  const t = useThemeTokens();
  return (
    <View className="mx-4 mt-5 flex-row gap-2">
      {ACTIONS.map((a) => {
        const accent = a.type === 'in';
        return (
          <PressableFeedback
            key={a.type}
            accessibilityRole="button"
            accessibilityLabel={`Ajouter : ${a.label}`}
            onPress={() => {
              press();
              onPick(a.type);
            }}
            className={`h-12 flex-1 flex-row items-center justify-center gap-2 rounded-full ${
              accent ? 'bg-accent' : 'bg-tile'
            }`}
          >
            <a.icon size={18} color={accent ? t.onAccent : t.ink} strokeWidth={2} />
            <AppText weight="bold" className={`text-sm ${accent ? 'text-on-accent' : 'text-ink'}`}>
              {a.label}
            </AppText>
          </PressableFeedback>
        );
      })}
    </View>
  );
}
