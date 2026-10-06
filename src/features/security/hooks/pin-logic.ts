export const PIN_LENGTH = 4;

export const appendDigit = (current: string, digit: string) =>
  current.length >= PIN_LENGTH ? current : current + digit;

export const removeDigit = (current: string) => current.slice(0, -1);

export const isComplete = (pin: string) => pin.length === PIN_LENGTH;

export function cooldownMs(failures: number) {
  if (failures < 5) return 0;
  const steps = Math.floor(failures / 5) - 1;
  return Math.min(30_000 * 2 ** steps, 300_000);
}

export function shouldLock(backgroundedAt: number | null, now: number, delayMinutes: number) {
  if (backgroundedAt === null) return false;
  return now - backgroundedAt >= delayMinutes * 60_000;
}
