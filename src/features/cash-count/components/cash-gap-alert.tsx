import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';

import { AppText, Button } from '@/components';
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
    <View className="mx-5 mt-[18px] gap-2 rounded-[20px] bg-accent p-4">
      <View className="flex-row items-center gap-2">
        <TriangleAlert size={20} color={t.onAccent} strokeWidth={1.8} />
        <AppText weight="bold" className="text-base text-on-accent">
          {formatNumber(missing)} Ar introuvables
        </AppText>
      </View>
      <AppText className="text-[13px] leading-[19px] text-on-accent">
        Tu as compté {formatNumber(counted)} Ar en espèces, l’app en attendait{' '}
        {formatNumber(expected)} Ar. Une dépense oubliée ?
      </AppText>
      <View className="mt-1 flex-row gap-2">
        <View className="flex-1">
          <Button label="Ajouter la dépense" size="sm" onPress={onAddExpense} />
        </View>
        <View className="flex-1">
          <Button label="Recompter" size="sm" variant="soft" onPress={onRecount} />
        </View>
      </View>
    </View>
  );
}
