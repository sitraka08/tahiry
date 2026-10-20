import { Segmented } from '@/components';
import type { ColorSchemePref } from '@/theme';

const OPTIONS: { value: ColorSchemePref; label: string }[] = [
  { value: 'system', label: 'Système' },
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
];

type Props = { value: ColorSchemePref; onChange: (value: ColorSchemePref) => void };

export function AppearancePicker({ value, onChange }: Props) {
  return <Segmented options={OPTIONS} value={value} onChange={onChange} />;
}
