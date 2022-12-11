const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `ULL
RRDDD
LURDL
UUUUD
`

describeDay(
  2016,
  2,

  '35749',
  '9365C',

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toBe('1985')
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe('5DB3')
    })
  },
)
