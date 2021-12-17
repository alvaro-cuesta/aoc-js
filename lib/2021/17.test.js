const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `target area: x=20..30, y=-10..-5
`

describeDay(
  2021,
  17,

  13203,
  5644,

  ({ xAfterSteps, yAfterSteps, yPeak }) => {
    describe('xAfterSteps', () => {
      test('7', () => {
        expect.assertions(8)
        expect(xAfterSteps(7, 0)).toEqual(0)
        expect(xAfterSteps(7, 1)).toEqual(7)
        expect(xAfterSteps(7, 2)).toEqual(13)
        expect(xAfterSteps(7, 3)).toEqual(18)
        expect(xAfterSteps(7, 4)).toEqual(22)
        expect(xAfterSteps(7, 5)).toEqual(25)
        expect(xAfterSteps(7, 6)).toEqual(27)
        expect(xAfterSteps(7, 7)).toEqual(28)
      })

      test('6', () => {
        expect.assertions(10)
        expect(xAfterSteps(6, 0)).toEqual(0)
        expect(xAfterSteps(6, 1)).toEqual(6)
        expect(xAfterSteps(6, 2)).toEqual(11)
        expect(xAfterSteps(6, 3)).toEqual(15)
        expect(xAfterSteps(6, 4)).toEqual(18)
        expect(xAfterSteps(6, 5)).toEqual(20)
        expect(xAfterSteps(6, 6)).toEqual(21)
        expect(xAfterSteps(6, 7)).toEqual(21)
        expect(xAfterSteps(6, 8)).toEqual(21)
        expect(xAfterSteps(6, 9)).toEqual(21)
      })

      test('17', () => {
        expect.assertions(5)
        expect(xAfterSteps(17, 0)).toEqual(0)
        expect(xAfterSteps(17, 1)).toEqual(17)
        expect(xAfterSteps(17, 2)).toEqual(33)
        expect(xAfterSteps(17, 3)).toEqual(48)
        expect(xAfterSteps(17, 4)).toEqual(62)
      })

      test('-3', () => {
        expect.assertions(4)
        expect(xAfterSteps(-3, 0)).toEqual(-0)
        expect(xAfterSteps(-3, 1)).toEqual(-3)
        expect(xAfterSteps(-3, 2)).toEqual(-5)
        expect(xAfterSteps(-3, 3)).toEqual(-6)
      })
    })

    describe('yAfterSteps', () => {
      test('2', () => {
        expect.assertions(8)
        expect(yAfterSteps(2, 0)).toEqual(0)
        expect(yAfterSteps(2, 1)).toEqual(2)
        expect(yAfterSteps(2, 2)).toEqual(3)
        expect(yAfterSteps(2, 3)).toEqual(3)
        expect(yAfterSteps(2, 4)).toEqual(2)
        expect(yAfterSteps(2, 5)).toEqual(0)
        expect(yAfterSteps(2, 6)).toEqual(-3)
        expect(yAfterSteps(2, 7)).toEqual(-7)
      })

      test('3', () => {
        expect.assertions(10)
        expect(yAfterSteps(3, 0)).toEqual(0)
        expect(yAfterSteps(3, 1)).toEqual(3)
        expect(yAfterSteps(3, 2)).toEqual(5)
        expect(yAfterSteps(3, 3)).toEqual(6)
        expect(yAfterSteps(3, 4)).toEqual(6)
        expect(yAfterSteps(3, 5)).toEqual(5)
        expect(yAfterSteps(3, 6)).toEqual(3)
        expect(yAfterSteps(3, 7)).toEqual(0)
        expect(yAfterSteps(3, 8)).toEqual(-4)
        expect(yAfterSteps(3, 9)).toEqual(-9)
      })

      test('-4', () => {
        expect.assertions(5)
        expect(yAfterSteps(-4, 0)).toEqual(-0)
        expect(yAfterSteps(-4, 1)).toEqual(-4)
        expect(yAfterSteps(-4, 2)).toEqual(-9)
        expect(yAfterSteps(-4, 3)).toEqual(-15)
        expect(yAfterSteps(-4, 4)).toEqual(-22)
      })

      test('2', () => {
        expect.assertions(4)
        expect(yAfterSteps(2, 0)).toEqual(0)
        expect(yAfterSteps(2, 1)).toEqual(2)
        expect(yAfterSteps(2, 2)).toEqual(3)
        expect(yAfterSteps(2, 3)).toEqual(3)
      })
    })

    describe('yPeak', () => {
      it('Works', () => {
        expect.assertions(6)
        expect(yPeak(0)).toEqual(0)
        expect(yPeak(1)).toEqual(1)
        expect(yPeak(2)).toEqual(3)
        expect(yPeak(3)).toEqual(6)
        expect(yPeak(4)).toEqual(10)
        expect(yPeak(-10)).toEqual(0)
      })
    })
  },

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toEqual(45)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toEqual(112)
    })
  },
)
