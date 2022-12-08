const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `30373
25512
65332
33549
35390
`

describeDay(
  2022,
  8,

  1827,
  335580,

  undefined,

  (part1) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toEqual(21)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toEqual(8)
    })
  },
)
