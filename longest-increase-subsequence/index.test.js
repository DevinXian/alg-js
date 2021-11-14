const { dp } = require('./index');

describe('lis: longest increase subsequence - dp', () => {
  test('empty list', () => {
    expect(dp([])).toBe(0);
  });
  test('increasing list', () => {
    const list = [0, 1, 2, 3, 4, 5];
    expect(dp(list)).toBe(list.length);
  });
  test('decreasing list', () => {
    const list = [5, 4, 3, 2, 1, 0];
    expect(dp(list)).toBe(1);
  });
  test('ordonary list 1', () => {
    const list = [1, 0, 4, 5, 1, 8, 2, 3, 4];
    expect(dp(list)).toBe(5);
  });
  test('ordonary list 2', () => {
    const list = [1, 10, 40, 5, 1, 8, 20, 30];
    expect(dp(list)).toBe(5);
  });
});
