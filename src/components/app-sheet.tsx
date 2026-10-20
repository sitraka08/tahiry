import {
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetMethods,
} from '@expo/ui/community/bottom-sheet';
import type { ReactNode, Ref } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SHEET, ThemeScope, useResolvedColorScheme } from '@/theme';

type Props = { sheetRef: Ref<BottomSheetMethods>; children: ReactNode };

export function AppSheet({ sheetRef, children }: Props) {
  const surface = SHEET[useResolvedColorScheme()];
  const insets = useSafeAreaInsets();
  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: surface.bg }}
    >
      <BottomSheetView
        style={{ paddingHorizontal: 20, paddingBottom: Math.max(insets.bottom, 16) + 8 }}
      >
        <ThemeScope overrides={surface}>{children}</ThemeScope>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

export type { BottomSheetMethods as SheetMethods };
