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
    it('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toEqual(15)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toEqual(12)
    })
  },
)
