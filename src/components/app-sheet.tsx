import {
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetMethods,
} from '@expo/ui/community/bottom-sheet';
import type { ReactNode, Ref } from 'react';

import { useThemeTokens } from '@/theme';

type Props = { sheetRef: Ref<BottomSheetMethods>; children: ReactNode };

export function AppSheet({ sheetRef, children }: Props) {
  const { bg } = useThemeTokens();
  return (
    <BottomSheetModal ref={sheetRef} enablePanDownToClose backgroundStyle={{ backgroundColor: bg }}>
      <BottomSheetView style={{ paddingHorizontal: 20, paddingBottom: 24 }}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

export type { BottomSheetMethods as SheetMethods };
