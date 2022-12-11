const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

describeDay(
  2022,
  3,

  7674,
  2805,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(157)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(70)
    })
  },
)
