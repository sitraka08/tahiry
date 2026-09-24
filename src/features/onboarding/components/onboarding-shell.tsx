import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, IconButton } from '@/components';

import { ProgressSegments } from './progress-segments';

type Props = {
  step: number;
  title: ReactNode;
  subtitle?: string;
  headerRight?: { kind: 'skip'; onPress: () => void } | { kind: 'badge'; label: string };
  onBack: () => void;
  footer: ReactNode;
  children?: ReactNode;
};

export function OnboardingShell({
  step,
  title,
  subtitle,
  headerRight,
  onBack,
  footer,
  children,
}: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row items-center gap-3.5 px-5 pt-5">
        <IconButton icon={ChevronLeft} label="Retour" onPress={onBack} />
        <ProgressSegments step={step} />
        {headerRight?.kind === 'skip' ? (
          <Pressable
            accessibilityRole="button"
            onPress={headerRight.onPress}
            className="min-h-11 justify-center"
          >
            <AppText weight="medium" className="text-sm">
              Passer
            </AppText>
          </Pressable>
        ) : null}
        {headerRight?.kind === 'badge' ? (
          <View className="rounded-full bg-accent px-2.5 py-[5px]">
            <AppText weight="bold" className="text-xs text-on-accent">
              {headerRight.label}
            </AppText>
          </View>
        ) : null}
      </View>

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-5 pb-6"
        >
          <Animated.View entering={FadeIn.duration(250)}>
            <View className="mt-[18px]">
              {title}
              {subtitle ? (
                <AppText className="mt-2 text-[15px] leading-[22px] text-muted">{subtitle}</AppText>
              ) : null}
            </View>
            {children}
          </Animated.View>
        </ScrollView>
        <View className="gap-2 px-5 pb-7 pt-2">{footer}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
