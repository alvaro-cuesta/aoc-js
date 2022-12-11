const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `A Y
B X
C Z
`

describeDay(
  2022,
  2,

  9241,
  14610,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(15)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(12)
    })
  },
)
