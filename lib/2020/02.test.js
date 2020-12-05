const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`

describeDay(
  2020,
  2,

  607,
  321,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 2

    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 1

    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
