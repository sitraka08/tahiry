// eslint-disable-next-line no-restricted-imports
import { Text, type TextProps } from 'react-native';

export type Weight = 'regular' | 'medium' | 'bold';
type Variant = 'display' | 'title' | 'headline' | 'body' | 'caption' | 'micro';
type Tone = 'ink' | 'muted' | 'accent' | 'danger';

export const family: Record<Weight, string> = {
  regular: 'font-gs',
  medium: 'font-gs-medium',
  bold: 'font-gs-bold',
};

const variants: Record<Variant, { size: string; weight: Weight }> = {
  display: { size: 'text-display', weight: 'bold' },
  title: { size: 'text-title', weight: 'bold' },
  headline: { size: 'text-headline', weight: 'bold' },
  body: { size: 'text-body', weight: 'regular' },
  caption: { size: 'text-caption', weight: 'regular' },
  micro: { size: 'text-micro', weight: 'medium' },
};

const tones: Record<Tone, string> = {
  ink: 'text-ink',
  muted: 'text-muted',
  accent: 'text-accent',
  danger: 'text-danger',
};

type Props = TextProps & { weight?: Weight; variant?: Variant; tone?: Tone; className?: string };

export function AppText({ weight, variant, tone = 'ink', className = '', ...rest }: Props) {
  const v = variant ? variants[variant] : null;
  const font = family[weight ?? v?.weight ?? 'regular'];
  return (
    <Text
      className={`${font} ${v?.size ?? ''} ${tones[tone]} ${className}`}
      {...rest}
      allowFontScaling={false}
    />
  );
}
