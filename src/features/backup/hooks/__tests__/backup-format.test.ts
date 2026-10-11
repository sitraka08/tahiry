import { buildBackup, parseBackup } from '../backup-format';

const columns = { accounts: ['id', 'name', 'type'], goals: ['id', 'name'] };

describe('backup format', () => {
  const backup = buildBackup(
    { accounts: [{ id: 1, name: 'Espèces', type: 'cash' }], goals: [] },
    1000,
  );

  it('round-trips through JSON', () => {
    const result = parseBackup(JSON.stringify(backup), columns);
    expect(result).toEqual({ ok: true, backup });
  });

  it('rejects text that is not JSON', () => {
    expect(parseBackup('hello', columns).ok).toBe(false);
  });

  it('rejects a file from another app or version', () => {
    const other = JSON.stringify({ ...backup, app: 'other' });
    expect(parseBackup(other, columns).ok).toBe(false);
    const future = JSON.stringify({ ...backup, version: 2 });
    expect(parseBackup(future, columns).ok).toBe(false);
  });

  it('rejects unknown tables', () => {
    const bad = JSON.stringify(buildBackup({ secrets: [] }, 1));
    const result = parseBackup(bad, columns);
    expect(result).toEqual({ ok: false, error: 'Table inconnue : secrets.' });
  });

  it('rejects unknown columns', () => {
    const bad = JSON.stringify(buildBackup({ accounts: [{ id: 1, hack: 'x' }] }, 1));
    expect(parseBackup(bad, columns).ok).toBe(false);
  });

  it('rejects non scalar values', () => {
    const bad = JSON.stringify({ ...backup, tables: { accounts: [{ id: { a: 1 } }] } });
    expect(parseBackup(bad, columns).ok).toBe(false);
  });
});
