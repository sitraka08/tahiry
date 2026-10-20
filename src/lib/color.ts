// Appends an alpha channel to a #RRGGBB color.
export function withAlpha(hex: string, alpha: number) {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
  return `${hex.slice(0, 7)}${a.toString(16).padStart(2, '0').toUpperCase()}`;
}
