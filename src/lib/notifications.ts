import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL = 'reminders';
const { SchedulableTriggerInputTypes: Trigger } = Notifications;

export function setupNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

async function ensureAccess() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: 'Rappels',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const asked = await Notifications.requestPermissionsAsync();
  return asked.granted;
}

export async function scheduleAt(date: number, title: string, body: string) {
  if (date <= Date.now() || !(await ensureAccess())) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { type: Trigger.DATE, date: new Date(date), channelId: CHANNEL },
  });
}

export async function scheduleDaily(hour: number, minute: number, title: string, body: string) {
  if (!(await ensureAccess())) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { type: Trigger.DAILY, hour, minute, channelId: CHANNEL },
  });
}

export async function scheduleWeekly(
  weekday: number,
  hour: number,
  minute: number,
  title: string,
  body: string,
) {
  if (!(await ensureAccess())) return null;
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { type: Trigger.WEEKLY, weekday, hour, minute, channelId: CHANNEL },
  });
}

export async function cancelNotification(id: string | null | undefined) {
  if (id) await Notifications.cancelScheduledNotificationAsync(id);
}
