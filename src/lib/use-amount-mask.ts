import { formatAmount, formatNumber } from './money';
import { useUiStore } from './ui-store';

export function useAmountMask() {
  const hide = useUiStore((s) => s.hideAmounts);
  return (value: number, withCurrency = true) => {
    if (hide) return '••••••';
    return withCurrency ? formatAmount(value) : formatNumber(value);
  };
}
