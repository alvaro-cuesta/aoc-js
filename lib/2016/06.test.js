const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
`

describeDay(
  2016,
  6,

  'bjosfbce',
  'veqfxzfx',

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toBe('easter')
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe('advent')
    })
  },
)
