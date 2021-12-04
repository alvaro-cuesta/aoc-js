const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `199
200
208
210
200
207
240
269
260
263
`

describeDay(
  2021,
  1,

  1752,
  1781,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 7

    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 5

    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
