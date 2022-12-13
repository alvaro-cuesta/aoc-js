const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`

describeDay(
  2022,
  13,

  5198,
  22344,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(13)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(140)
    })
  },
)
