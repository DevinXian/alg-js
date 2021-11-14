const { dp, piles } = require('./index');

function run(method) {
  test('empty list', () => {
    expect(method([])).toBe(0);
  });
  test('increasing list', () => {
    const list = [0, 1, 2, 3, 4, 5];
    expect(method(list)).toBe(list.length);
  });
  test('decreasing list', () => {
    const list = [5, 4, 3, 2, 1, 0];
    expect(method(list)).toBe(1);
  });
  test('ordonary list 1', () => {
    const list = [1, 0, 4, 5, 1, 8, 2, 3, 4];
    expect(method(list)).toBe(5);
  });
  test('ordonary list 2', () => {
    const list = [1, 10, 40, 5, 1, 8, 20, 30];
    expect(method(list)).toBe(5);
  });
}

describe('LIS - dp', () => {
  run(dp);
});

describe('LIS - poker piles', () => {
  run(piles);
});
