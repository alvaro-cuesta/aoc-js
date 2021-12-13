const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`

// prettier-ignore
const EXAMPLE_PART2_OUTPUT =
  '\n' +
    '#####\n' +
    '#   #\n' +
    '#   #\n' +
    '#   #\n' +
    '#####\n' +
    '     \n' +
    '     '

describeDay(
  2021,
  13,

  788,
  '\n' +
    '#  #   ## ###  #  # #### #  # ###   ##  \n' +
    '# #     # #  # # #  #    #  # #  # #  # \n' +
    '##      # ###  ##   ###  #  # ###  #    \n' +
    '# #     # #  # # #  #    #  # #  # # ## \n' +
    '# #  #  # #  # # #  #    #  # #  # #  # \n' +
    '#  #  ##  ###  #  # ####  ##  ###   ### ',

  undefined,

  (part1) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toEqual(17)
    })
  },

  (part2) => {
    it('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toEqual(EXAMPLE_PART2_OUTPUT)
    })
  },
)
