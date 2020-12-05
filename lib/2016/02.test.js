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
    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual('1985')
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual('5DB3')
    })
  },
)
