const { describeDay } = require('../test-utils')

const EXAMPLE_INPUTS = [
  `mjqjpqmgbljsphdztnvjfqwrcgsmlb
`,
  `bvwbjplbgvbhsrlpgdmjqwftvncz
`,
  `nppdvjthqldpwncqszvftbrmjlhg
`,
  `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
`,
  `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`,
]

describeDay(
  2022,
  6,

  1042,
  2980,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(5)

      expect(part1(EXAMPLE_INPUTS[0])).toBe(7)
      expect(part1(EXAMPLE_INPUTS[1])).toBe(5)
      expect(part1(EXAMPLE_INPUTS[2])).toBe(6)
      expect(part1(EXAMPLE_INPUTS[3])).toBe(10)
      expect(part1(EXAMPLE_INPUTS[4])).toBe(11)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(5)

      expect(part2(EXAMPLE_INPUTS[0])).toBe(19)
      expect(part2(EXAMPLE_INPUTS[1])).toBe(23)
      expect(part2(EXAMPLE_INPUTS[2])).toBe(23)
      expect(part2(EXAMPLE_INPUTS[3])).toBe(29)
      expect(part2(EXAMPLE_INPUTS[4])).toBe(26)
    })
  },
)
