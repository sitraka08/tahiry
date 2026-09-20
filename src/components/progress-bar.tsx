import { View } from 'react-native';

type Props = { value: number; tone?: 'ink' | 'accent'; trackClassName?: string };

export function ProgressBar({ value, tone = 'ink', trackClassName = 'bg-tile' }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className={`h-2 overflow-hidden rounded-full ${trackClassName}`}>
      <View
        className={`h-full rounded-full ${tone === 'ink' ? 'bg-dark' : 'bg-accent'}`}
        style={{ width: `${pct}%` }}
      />
    </View>
  );
}
