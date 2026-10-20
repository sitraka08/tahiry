import { Search } from 'lucide-react-native';
import { View } from 'react-native';

import { useThemeTokens } from '@/theme';

import { AppTextInput } from './app-text-input';

type Props = { value: string; onChangeText: (text: string) => void; placeholder: string };

export function SearchInput({ value, onChangeText, placeholder }: Props) {
  const t = useThemeTokens();
  return (
    <View className="justify-center">
      <View pointerEvents="none" style={{ position: 'absolute', left: 14, zIndex: 1 }}>
        <Search size={20} color={t.muted} strokeWidth={1.8} />
      </View>
      <AppTextInput
        accessibilityLabel={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        className="h-12 rounded-2xl bg-card py-0 pl-11 pr-3.5 text-input"
      />
    </View>
  );
}
