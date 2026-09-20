import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, Button } from '@/components';

type Props = {
  title: string;
  subtitle?: string;
  step: number;
  total?: number;
  actionLabel: string;
  onAction: () => void;
  onSkip?: () => void;
  children: ReactNode;
};

export function OnboardingShell({
  title,
  subtitle,
  step,
  total = 3,
  actionLabel,
  onAction,
  onSkip,
  children,
}: Props) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between px-6 pt-5">
        <View className="flex-row gap-1.5">
          {Array.from({ length: total }, (_, i) => (
            <View
              key={i}
              className={`h-2 rounded-full ${i === step ? 'w-6 bg-dark' : 'w-2 bg-line'}`}
            />
          ))}
        </View>
        {onSkip ? (
          <AppText weight="medium" className="py-2 text-sm" onPress={onSkip}>
            Passer
          </AppText>
        ) : null}
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-6 pb-6 pt-5 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2">
          <AppText weight="bold" className="text-[28px] leading-[34px]">
            {title}
          </AppText>
          {subtitle ? <AppText className="text-base text-muted">{subtitle}</AppText> : null}
        </View>
        {children}
      </ScrollView>
      <View className="px-6 pb-7">
        <Button label={actionLabel} onPress={onAction} />
      </View>
    </SafeAreaView>
  );
}
