import { Text, type TextProps } from 'react-native';

type Weight = 'regular' | 'medium' | 'bold';

const family: Record<Weight, string> = {
  regular: 'font-gs',
  medium: 'font-gs-medium',
  bold: 'font-gs-bold',
};

type Props = TextProps & { weight?: Weight; className?: string };

export function AppText({ weight = 'regular', className = '', ...rest }: Props) {
  return <Text className={`${family[weight]} text-ink ${className}`} {...rest} />;
}
