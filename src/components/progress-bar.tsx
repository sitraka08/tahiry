import { View } from 'react-native';

type Props = {
  value: number;
  tone?: 'ink' | 'accent';
  trackClassName?: string;
  thick?: boolean;
};

export function ProgressBar({
  value,
  tone = 'accent',
  trackClassName = 'bg-raised',
  thick,
}: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View className={`overflow-hidden rounded-full ${thick ? 'h-2' : 'h-1.5'} ${trackClassName}`}>
      <View
        className={`h-full rounded-full ${tone === 'ink' ? 'bg-ink' : 'bg-accent'}`}
        style={{ width: `${pct}%` }}
      />
    </View>
  );
}
