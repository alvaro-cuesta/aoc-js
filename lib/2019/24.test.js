const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `....#
#..#.
#..##
..#..
#....
`

describeDay(
  2019,
  24,

  27777901,
  null,

  ({ parseInput, step, getBiodiversity }) => {
    describe('step', () => {
      test('Example input - 1 step', () => {
        expect.assertions(1)
        expect(step(parseInput(EXAMPLE_INPUT))).toEqual([
          ['#', '.', '.', '#', '.'],
          ['#', '#', '#', '#', '.'],
          ['#', '#', '#', '.', '#'],
          ['#', '#', '.', '#', '#'],
          ['.', '#', '#', '.', '.'],
        ])
      })

      test('Example input - 2 steps', () => {
        expect.assertions(1)
        expect(step(step(parseInput(EXAMPLE_INPUT)))).toEqual([
          ['#', '#', '#', '#', '#'],
          ['.', '.', '.', '.', '#'],
          ['.', '.', '.', '.', '#'],
          ['.', '.', '.', '#', '.'],
          ['#', '.', '#', '#', '#'],
        ])
      })

      test('Example input - 3 steps', () => {
        expect.assertions(1)
        expect(step(step(step(parseInput(EXAMPLE_INPUT))))).toEqual([
          ['#', '.', '.', '.', '.'],
          ['#', '#', '#', '#', '.'],
          ['.', '.', '.', '#', '#'],
          ['#', '.', '#', '#', '.'],
          ['.', '#', '#', '.', '#'],
        ])
      })

      test('Example input - 4 steps', () => {
        expect.assertions(1)
        expect(step(step(step(step(parseInput(EXAMPLE_INPUT)))))).toEqual([
          ['#', '#', '#', '#', '.'],
          ['.', '.', '.', '.', '#'],
          ['#', '#', '.', '.', '#'],
          ['.', '.', '.', '.', '.'],
          ['#', '#', '.', '.', '.'],
        ])
      })

      test('getBiodiversity', () => {
        expect.assertions(1)
        expect(
          getBiodiversity([
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['#', '.', '.', '.', '.'],
            ['.', '#', '.', '.', '.'],
          ]),
        ).toEqual(2129920)
      })
    })
  },

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toEqual(2129920)
    })
  },

  (part2, dayModule) => {},
)
