// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = require('../../../tailwind.config.js');

describe('input font sizes', () => {
  it('never set a line height, so Android inputs do not scroll', () => {
    const sizes = config.theme.extend.fontSize;
    expect(sizes.input).toBe('15px');
    expect(sizes['input-sm']).toBe('14px');
  });
});
