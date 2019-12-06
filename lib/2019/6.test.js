const { describeDay } = require('../test-utils')

describeDay(
  2019,
  6,

  271151,
  388,

  undefined,

  (part1) => {
    it('Example input', () => {
      expect(
        part1(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
`),
      ).toEqual(42)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect(
        part2(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
`),
      ).toEqual(4)
    })
  },
)
