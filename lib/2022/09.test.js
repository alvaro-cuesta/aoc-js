const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`

const LARGE_EXAMPLE_INPUT = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`

describeDay(
  2022,
  9,

  6314,
  2504,

  undefined,

  (part1) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toEqual(13)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toEqual(1)
    })

    it('Large example input', () => {
      expect.assertions(1)

      expect(part2(LARGE_EXAMPLE_INPUT)).toEqual(36)
    })
  },
)
