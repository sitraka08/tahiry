import * as Haptics from 'expo-haptics';

export const tap = () => Haptics.selectionAsync().catch(() => undefined);
export const press = () =>
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
export const success = () =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
