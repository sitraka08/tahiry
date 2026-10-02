import { View } from 'react-native';

type Props = {
  value: number;
  tone?: 'ink' | 'accent';
  trackClassName?: string;
  thick?: boolean;
};

export function ProgressBar({ value, tone = 'ink', trackClassName = 'bg-tile', thick }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className={`overflow-hidden rounded-full ${thick ? 'h-2.5' : 'h-2'} ${trackClassName}`}>
      <View
        className={`h-full rounded-full ${tone === 'ink' ? 'bg-dark' : 'bg-accent'}`}
        style={{ width: `${pct}%` }}
      />
    </View>
  );
}
