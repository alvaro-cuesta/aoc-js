const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `+1
-2
+3
+1
`

describeDay(
  2018,
  1,

  406,
  312,

  undefined,

  (part1) => {
    /*
    For example, if the device displays frequency changes of +1, -2, +3, +1,
    then starting from a frequency of zero, the following changes would occur:

      Current frequency  0, change of +1; resulting frequency  1.
      Current frequency  1, change of -2; resulting frequency -1.
      Current frequency -1, change of +3; resulting frequency  2.
      Current frequency  2, change of +1; resulting frequency  3.

    In this example, the resulting frequency is 3.
    */
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toBe(3)
    })

    test('+1, +1, +1 results in  3', () => {
      expect.assertions(1)
      expect(
        part1(`+1
+1
+1
`),
      ).toBe(3)
    })

    test('+1, +1, -2 results in  0', () => {
      expect.assertions(1)
      expect(
        part1(`+1
+1
-2
`),
      ).toBe(0)
    })

    test('-1, -2, -3 results in -6', () => {
      expect.assertions(1)
      expect(
        part1(`-1
-2
-3
`),
      ).toBe(-6)
    })
  },

  (part2) => {
    /*
    For example, using the same list of changes above, the device would loop as
    follows:

      Current frequency  0, change of +1; resulting frequency  1.
      Current frequency  1, change of -2; resulting frequency -1.
      Current frequency -1, change of +3; resulting frequency  2.
      Current frequency  2, change of +1; resulting frequency  3.
      (At this point, the device continues from the start of the list.)
      Current frequency  3, change of +1; resulting frequency  4.
      Current frequency  4, change of -2; resulting frequency  2, which has already been seen.

    In this example, the first frequency reached twice is 2.
    */
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe(2)
    })

    test('+1, -1 first reaches 0 twice.', () => {
      expect.assertions(1)
      expect(
        part2(`+1
-1
`),
      ).toBe(0)
    })

    test('+3, +3, +4, -2, -4 first reaches 10 twice.', () => {
      expect.assertions(1)
      expect(
        part2(`+3
+3
+4
-2
-4
`),
      ).toBe(10)
    })

    test('-6, +3, +8, +5, -6 first reaches 5 twice.', () => {
      expect.assertions(1)
      expect(
        part2(`-6
+3
+8
+5
-6
`),
      ).toBe(5)
    })

    test('+7, +7, -2, -7, -4 first reaches 14 twice.', () => {
      expect.assertions(1)
      expect(
        part2(`+7
+7
-2
-7
-4
`),
      ).toBe(14)
    })
  },
)
