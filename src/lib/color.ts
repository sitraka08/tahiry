// Appends an alpha channel to a #RRGGBB color.
export function withAlpha(hex: string, alpha: number) {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
  return `${hex.slice(0, 7)}${a.toString(16).padStart(2, '0').toUpperCase()}`;
}

// Mixes a #RRGGBB color toward black. amount 0 keeps it, 1 gives black.
export function shade(hex: string, amount: number) {
  const k = 1 - Math.max(0, Math.min(1, amount));
  const channel = (i: number) =>
    Math.round(parseInt(hex.slice(i, i + 2), 16) * k)
      .toString(16)
      .padStart(2, '0');
  return `#${channel(1)}${channel(3)}${channel(5)}`.toUpperCase();
}
