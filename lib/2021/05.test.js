const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`

describeDay(
  2021,
  5,

  5294,
  21698,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 5

    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 12

    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
