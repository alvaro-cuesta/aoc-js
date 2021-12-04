const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `forward 5
down 5
forward 8
up 3
down 8
forward 2
`

describeDay(
  2021,
  2,

  2120749,
  2138382217,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 150

    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 900

    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
