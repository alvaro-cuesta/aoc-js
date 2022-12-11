const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`

describeDay(
  2021,
  14,

  5656,
  12271437788530,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(1588)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(2188189693529)
    })
  },
)
