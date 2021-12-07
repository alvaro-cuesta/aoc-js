const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `16,1,2,0,4,2,7,1,2,14
`

describeDay(
  2021,
  7,

  341534,
  93397632,

  undefined,

  (part1) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toEqual(37)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toEqual(168)
    })
  },
)
