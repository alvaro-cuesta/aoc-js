const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

describeDay(
  2022,
  5,

  'PTWLTDSJV',
  'WZMFVGGZP',

  ({ parseStackText }) => {
    describe('parseStackText', () => {
      it('Works for example input', () => {
        expect.assertions(1)

        expect(
          parseStackText(`    [D]
[N] [C]
[Z] [M] [P]
  1   2   3`),
        ).toEqual([['Z', 'N'], ['M', 'C', 'D'], ['P']])
      })

      it('Works for my input', () => {
        expect.assertions(1)

        expect(
          parseStackText(`[N]             [R]             [C]
[T] [J]         [S] [J]         [N]
[B] [Z]     [H] [M] [Z]         [D]
[S] [P]     [G] [L] [H] [Z]     [T]
[Q] [D]     [F] [D] [V] [L] [S] [M]
[H] [F] [V] [J] [C] [W] [P] [W] [L]
[G] [S] [H] [Z] [Z] [T] [F] [V] [H]
[R] [H] [Z] [M] [T] [M] [T] [Q] [W]
  1   2   3   4   5   6   7   8   9`),
        ).toEqual([
          ['R', 'G', 'H', 'Q', 'S', 'B', 'T', 'N'],
          ['H', 'S', 'F', 'D', 'P', 'Z', 'J'],
          ['Z', 'H', 'V'],
          ['M', 'Z', 'J', 'F', 'G', 'H'],
          ['T', 'Z', 'C', 'D', 'L', 'M', 'S', 'R'],
          ['M', 'T', 'W', 'V', 'H', 'Z', 'J'],
          ['T', 'F', 'P', 'L', 'Z'],
          ['Q', 'V', 'W', 'S'],
          ['W', 'H', 'L', 'M', 'T', 'D', 'N', 'C'],
        ])
      })
    })
  },

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe('CMZ')
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe('MCD')
    })
  },
)
