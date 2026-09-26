import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useBottomInset(min = 16) {
  return Math.max(useSafeAreaInsets().bottom, min);
}
