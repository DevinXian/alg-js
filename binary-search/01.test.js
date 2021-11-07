const { bs, bs_left_boundary, bs_right_boundary } = require('./01')

function run(bs) {
  it('empty should return -1', () => {
    expect(bs([], 10)).toBe(-1);
  })

  it('should not find the target', () => {
    expect(bs([2, 3, 4, 5], 10)).toBe(-1)
  })

  it('should find the target when length is odd', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8]
    const index = list.findIndex(i => i === 5); // 4
    expect(bs(list, 5)).toBe(index)
  })

  it('should find the target when length is even', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const index = list.findIndex(i => i === 5); // 4
    expect(bs(list, 5)).toBe(index)
  })
}
describe('binary search', () => {
  describe('basic binary search', () => {
    run(bs)
  });

  describe('binary search to left boundary', () => {
    run(bs_left_boundary)
    // basic alg can't handle this case
    it('should find the target when ele is duplicated', () => {
      const list = [1, 2, 5, 5, 5]
      const index = list.findIndex(i => i === 5); // 3
      expect(bs_left_boundary(list, 5)).toBe(index)
    })
  })

  describe('binary search to right boundary', () => {
    run(bs_right_boundary)
    // basic alg can't handle this case
    it('should find the target when ele is duplicated', () => {
      const list = [1, 2, 3, 5, 5]
      const index = list.reverse().findIndex(i => i === 5); // 0
      expect(bs_left_boundary(list, 5)).toBe(index)
    })
  })
})

