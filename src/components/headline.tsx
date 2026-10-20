import { AppText } from './app-text';

type Props = {
  lead: string;
  highlight?: string;
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
    <AppText accessibilityRole="header" weight="bold" style={style}>
      {lead}
      {highlight ? (
        <AppText weight="bold" style={style} className="bg-accent text-on-accent">
          {`\u00A0${highlight}\u00A0`}
        </AppText>
      ) : null}
      {tail}
    </AppText>
  );
}
