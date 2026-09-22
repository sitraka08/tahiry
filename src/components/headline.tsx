import { Text } from 'react-native';

type Props = {
  lead: string;
  highlight: string;
  tail?: string;
  size?: 'md' | 'lg';
};

const sizes = {
  md: { fontSize: 27, lineHeight: 33, letterSpacing: -0.4 },
  lg: { fontSize: 32, lineHeight: 38, letterSpacing: -0.6 },
};

export function Headline({ lead, highlight, tail = '', size = 'md' }: Props) {
  const style = sizes[size];
  return (
    <Text accessibilityRole="header" style={style} className="font-gs-bold text-ink">
      {lead}
      <Text style={style} className="bg-accent font-gs-bold text-on-accent">
        {` ${highlight} `}
      </Text>
      {tail}
    </Text>
  );
}
