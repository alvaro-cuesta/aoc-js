const { describeDay } = require('../test-utils')

describeDay(
  2016,
  4,

  158835,
  993,

  undefined,

  (_, { parseRoom, isValidRoom }) => {
    test('aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.', () => {
      expect.assertions(1)
      expect(isValidRoom(parseRoom('aaaaa-bbb-z-y-x-123[abxyz]'))).toBe(true)
    })

    test('a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.', () => {
      expect.assertions(1)
      expect(isValidRoom(parseRoom('a-b-c-d-e-f-g-h-987[abcde]'))).toBe(true)
    })

    test('not-a-real-room-404[oarel] is a real room.', () => {
      expect.assertions(1)
      expect(isValidRoom(parseRoom('not-a-real-room-404[oarel]'))).toBe(true)
    })

    test('totally-real-room-200[decoy] is not.', () => {
      expect.assertions(1)
      expect(isValidRoom(parseRoom('totally-real-room-200[decoy]'))).toBe(false)
    })
  },

  (_, { decipherName }) => {
    test('The real name for qzmt-zixmtkozy-ivhz-343 is very encrypted name.', () => {
      expect.assertions(1)
      expect(decipherName({ name: 'qzmt-zixmtkozy-ivhz', sector: 343 })).toBe(
        'very encrypted name',
      )
    })
  },
)
