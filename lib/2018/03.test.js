const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`

describeDay(
  2018,
  3,

  111326,
  1019,

  undefined,

  (part1) => {
    /*
    For example, consider the following claims:

      #1 @ 1,3: 4x4
      #2 @ 3,1: 4x4
      #3 @ 5,5: 2x2

    Visually, these claim the following areas:

      ........
      ...2222.
      ...2222.
      .11XX22.
      .11XX22.
      .111133.
      .111133.
      ........

    The four square inches marked with X are claimed by both 1 and 2.
    */
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toBe(4)
    })
  },

  (part2) => {
    /*
    For example, in the claims above, only claim 3 is intact after all claims are made.
    */
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe(3)
    })
  },
)
