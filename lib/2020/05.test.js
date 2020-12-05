const { describeDay } = require('../test-utils')

describeDay(
  2020,
  5,

  987,
  603,

  undefined,

  (_, { parsePass }) => {
    it('parsePass', () => {
      expect.assertions(4)
      expect(parsePass('FBFBBFFRLR')).toEqual(44 * 8 + 5)
      expect(parsePass('BFFFBBFRRR')).toEqual(70 * 8 + 7)
      expect(parsePass('FFFBBBFRRR')).toEqual(14 * 8 + 7)
      expect(parsePass('BBFFBBFRLL')).toEqual(102 * 8 + 4)
    })
  },

  undefined,
)
