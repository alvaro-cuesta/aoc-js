const { describeDay } = require('../test-utils')

describeDay(
  2016,
  1,

  287,
  133,

  undefined,

  (part1) => {
    test('Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.', () => {
      expect.assertions(1)
      expect(part1('R2, L3')).toBe(5)
    })

    test('R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.', () => {
      expect.assertions(1)
      expect(part1('R2, R2, R2')).toBe(2)
    })

    test('R5, L5, R5, R3 leaves you 12 blocks away.', () => {
      expect.assertions(1)
      expect(part1('R5, L5, R5, R3')).toBe(12)
    })
  },

  (part2) => {
    test('R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.', () => {
      expect.assertions(1)
      expect(part2('R8, R4, R4, R8')).toBe(4)
    })
  },
)
