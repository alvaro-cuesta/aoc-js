const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

describeDay(
  2022,
  1,

  72240,
  210957,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(24000)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(45000)
    })
  },
)
