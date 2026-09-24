import { format, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatTime(ts: number) {
  return format(ts, 'HH:mm');
}

export function formatDayLabel(ts: number) {
  if (isToday(ts)) return 'Aujourd’hui';
  if (isYesterday(ts)) return 'Hier';
  return format(ts, 'EEE d MMM', { locale: fr });
}

export function formatShortDate(ts: number) {
  return format(ts, 'd MMM', { locale: fr });
}

export function formatLongDate(ts: number) {
  return format(ts, 'EEE d MMM · HH:mm', { locale: fr });
}

export function monthKey(ts: number) {
  return format(ts, 'yyyy-MM');
}

export function startOfDayKey(ts: number) {
  return format(ts, 'yyyy-MM-dd');
}

export function formatDateChip(ts: number) {
  return isToday(ts)
    ? `Auj. ${formatTime(ts)}`
    : `${format(ts, 'd MMM', { locale: fr })} · ${formatTime(ts)}`;
}
