import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText, Button } from '@/components';
import { withAlpha } from '@/lib/color';
import { formatNumber } from '@/lib/money';
import { useThemeTokens } from '@/theme';

type Props = {
  missing: number;
  counted: number;
  expected: number;
  onAddExpense: () => void;
  onRecount: () => void;
};

export function CashGapAlert({ missing, counted, expected, onAddExpense, onRecount }: Props) {
  const t = useThemeTokens();
  return (
    <View
      style={{ backgroundColor: withAlpha(t.danger, 0.12) }}
      className="mx-4 mt-5 gap-2 rounded-card p-4"
    >
      <View className="flex-row items-center gap-2">
        <TriangleAlert size={20} color={t.danger} strokeWidth={1.8} />
        <AppText variant="headline" tone="danger">
          {formatNumber(missing)} Ar introuvables
        </AppText>
      </View>
      <AppText variant="caption">
        Tu as compté {formatNumber(counted)} Ar en espèces, l’app en attendait{' '}
        {formatNumber(expected)} Ar. Une dépense oubliée ?
      </AppText>
      <View className="mt-1 flex-row gap-2">
        <View className="flex-1">
          <Button label="Ajouter la dépense" size="sm" variant="accent" onPress={onAddExpense} />
        </View>
        <View className="flex-1">
          <Button label="Recompter" size="sm" variant="soft" onPress={onRecount} />
        </View>
      </View>
    </View>
  );
}
