import { Pressable, type PressableProps } from 'react-native';

type Props = Omit<PressableProps, 'style'> & { className?: string };

export function PressableFeedback({ className = '', ...rest }: Props) {
  return <Pressable {...rest} className={`active:opacity-75 ${className}`} />;
}
