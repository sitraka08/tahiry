// Integer value at progress p (0 to 1) of an ease out cubic count from one amount to another.
export function countAt(from: number, to: number, p: number) {
  const k = Math.max(0, Math.min(1, p));
  const eased = 1 - (1 - k) ** 3;
  return Math.round(from + (to - from) * eased);
}
