const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `dabAcCaCBAcCcaDA
`

describeDay(
  2018,
  5,

  11668,
  4652,

  ({ react }) => {
    describe('react', () => {
      test('In aA, a and A react, leaving nothing behind', () => {
        expect.assertions(1)
        expect(react('aA')).toBe('')
      })

      test('In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.', () => {
        expect.assertions(1)
        expect(react('abBA')).toBe('')
      })

      test('In abAB, no two adjacent units are of the same type, and so nothing happens.', () => {
        expect.assertions(1)
        expect(react('abAB')).toBe('abAB')
      })

      test('In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.', () => {
        expect.assertions(1)
        expect(react('aabAAB')).toBe('aabAAB')
      })

      /*
    Now, consider a larger example, dabAcCaCBAcCcaDA:

      dabAcCaCBAcCcaDA  The first 'cC' is removed.
      dabAaCBAcCcaDA    This creates 'Aa', which is removed.
      dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
      dabCBAcaDA        No further actions can be taken.

    */
      test('Example input', () => {
        expect.assertions(1)
        expect(react('dabAcCaCBAcCcaDA')).toBe('dabCBAcaDA')
      })
    })
  },

  (part1) => {
    test('In aA, a and A react, leaving nothing behind', () => {
      expect.assertions(1)
      expect(
        part1(`aA
`),
      ).toBe(0)
    })

    test('In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.', () => {
      expect.assertions(1)
      expect(
        part1(`abBA
`),
      ).toBe(0)
    })

    test('In abAB, no two adjacent units are of the same type, and so nothing happens.', () => {
      expect.assertions(1)
      expect(
        part1(`abAB
`),
      ).toBe(4)
    })

    test('In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.', () => {
      expect.assertions(1)
      expect(
        part1(`aabAAB
`),
      ).toBe(6)
    })

    /*
    Now, consider a larger example, dabAcCaCBAcCcaDA:

      dabAcCaCBAcCcaDA  The first 'cC' is removed.
      dabAaCBAcCcaDA    This creates 'Aa', which is removed.
      dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
      dabCBAcaDA        No further actions can be taken.

    After all possible reactions, the resulting polymer contains 10 units.
    */
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toBe(10)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe(4)
    })
  },
)
