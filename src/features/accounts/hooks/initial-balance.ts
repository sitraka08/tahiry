export function initialBalanceFor(desired: number, balance: number, initialBalance: number) {
  return desired - (balance - initialBalance);
}
