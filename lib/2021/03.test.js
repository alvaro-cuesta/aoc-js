const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`

describeDay(
  2021,
  3,

  2972336,
  3368358,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 198

    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 230

    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
