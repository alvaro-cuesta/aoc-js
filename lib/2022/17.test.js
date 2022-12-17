const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
`

describeDay(
  2022,
  17,

  3215,
  1514285714288,

  (dayModule) => {},

  (part1, dayModule) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(3068)
    })
  },

  (part2, dayModule) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBeNull()
    })
  },
)
