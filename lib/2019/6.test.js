const { describeDay } = require('../test-utils')

describeDay(
  2019,
  6,

  271151,
  null,

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
)
