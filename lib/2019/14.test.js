const { describeDay } = require('../test-utils')

describeDay(
  2019,
  14,

  null,
  null,

  (dayModule) => {},

  (part1, dayModule) => {
    test.only('Example input 1', () => {
      expect(
        part1(`10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL
`),
      ).toEqual(['ORE', 30])
    })
  },

  (part2, dayModule) => {},
)
