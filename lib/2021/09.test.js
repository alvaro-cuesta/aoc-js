const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `2199943210
3987894921
9856789892
8767896789
9899965678
`

describeDay(
  2021,
  9,

  502,
  1330560,

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

      expect(part2(EXAMPLE_INPUT)).toBe(1134)
    })
  },
)
