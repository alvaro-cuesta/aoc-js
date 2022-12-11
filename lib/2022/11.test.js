const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`

describeDay(
  2022,
  11,

  57838,
  15050382231,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(10605)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(2713310158)
    })
  },
)
