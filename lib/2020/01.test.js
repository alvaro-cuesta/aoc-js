const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `1721
979
366
299
675
1456
`

describeDay(
  2020,
  1,

  1019571,
  100655544,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 514579

    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 241861950

    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
