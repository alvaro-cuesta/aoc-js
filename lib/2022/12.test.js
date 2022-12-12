const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`

describeDay(
  2022,
  12,

  361,
  354,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(31)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(29)
    })
  },
)
