const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`

describeDay(
  2021,
  15,

  435,
  2842,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(40)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(315)
    })
  },
)
