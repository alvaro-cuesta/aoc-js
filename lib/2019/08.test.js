const { describeDay } = require('../test-utils')

describeDay(
  2019,
  8,

  828,
  [
    '',
    '████ █    ███    ██ ████ ',
    '   █ █    █  █    █ █    ',
    '  █  █    ███     █ ███  ',
    ' █   █    █  █    █ █    ',
    '█    █    █  █ █  █ █    ',
    '████ ████ ███   ██  █    ',
  ].join('\n'),

  ({ parseLayers }) => {
    test('parseLayers', () => {
      expect.assertions(1)

      expect(
        parseLayers(
          3,
          2,
        )(`123456789012
`),
      ).toEqual([
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 0, 1, 2],
      ])
    })
  },

  undefined,

  (_, { parseLayers, part2Result }) => {
    const layers = parseLayers(
      2,
      2,
    )(`0222112222120000
`)

    test('parseLayers', () => {
      expect.assertions(1)

      expect(layers).toEqual([
        [0, 2, 2, 2],
        [1, 1, 2, 2],
        [2, 2, 1, 2],
        [0, 0, 0, 0],
      ])
    })

    test('part2Result', () => {
      expect.assertions(1)

      expect(part2Result(layers)).toBe('0110')
    })
  },
)
