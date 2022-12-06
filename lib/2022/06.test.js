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
    it('Example input', () => {
      expect.assertions(5)

      expect(part1(EXAMPLE_INPUTS[0])).toEqual(7)
      expect(part1(EXAMPLE_INPUTS[1])).toEqual(5)
      expect(part1(EXAMPLE_INPUTS[2])).toEqual(6)
      expect(part1(EXAMPLE_INPUTS[3])).toEqual(10)
      expect(part1(EXAMPLE_INPUTS[4])).toEqual(11)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(5)

      expect(part2(EXAMPLE_INPUTS[0])).toEqual(19)
      expect(part2(EXAMPLE_INPUTS[1])).toEqual(23)
      expect(part2(EXAMPLE_INPUTS[2])).toEqual(23)
      expect(part2(EXAMPLE_INPUTS[3])).toEqual(29)
      expect(part2(EXAMPLE_INPUTS[4])).toEqual(26)
    })
  },
)
