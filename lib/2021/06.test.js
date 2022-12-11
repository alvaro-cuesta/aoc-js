const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `3,4,3,1,2
`

describeDay(
  2021,
  6,

  352872,
  1604361182149,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(2)

      expect(part1(EXAMPLE_INPUT, 18)).toBe(26)
      expect(part1(EXAMPLE_INPUT)).toBe(5934)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe(26984457539)
    })
  },
)
