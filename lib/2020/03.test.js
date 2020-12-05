const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`

describeDay(
  2020,
  3,

  265,
  3154761400,

  undefined,

  (part1) => {
    const EXAMPLE_PART1_RESULT = 7

    it('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART1_RESULT)
    })
  },

  (part2) => {
    const EXAMPLE_PART2_RESULT = 336

    it('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_RESULT)
    })
  },
)
