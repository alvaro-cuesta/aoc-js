const { describeDay } = require('../test-utils')

describeDay(
  2019,
  6,

  271151,
  388,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

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
      ).toStrictEqual(42)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

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
      ).toStrictEqual(4)
    })
  },
)
