import type { LucideIcon } from 'lucide-react-native';
import { View } from 'react-native';

import { withAlpha } from '@/lib/color';
import type { ColorToken } from '@/lib/visuals';
import { useThemeTokens } from '@/theme';

type Props = { icon: LucideIcon; color: ColorToken; size?: 'sm' | 'md' | 'lg' };

const SIZES = { sm: 32, md: 40, lg: 44 };

export function IconTile({ icon: Icon, color, size = 'lg' }: Props) {
  const t = useThemeTokens();
  const px = SIZES[size];
  return (
    <View
      style={{ width: px, height: px, backgroundColor: withAlpha(t[color], 0.15) }}
      className="items-center justify-center rounded-tile"
    >
      <Icon size={Math.round(px * 0.45)} color={t[color]} strokeWidth={1.9} />
    </View>
  );
}
