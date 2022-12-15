const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`

describeDay(
  2022,
  15,

  4951427,
  null,

  undefined,

  (_, { solvePart1 }) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(solvePart1(10, EXAMPLE_INPUT)).toBe(26)
    })
  },

  (_, { solvePart2 }) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(solvePart2(20, EXAMPLE_INPUT)).toBe(56000011)
    })
  },
)
