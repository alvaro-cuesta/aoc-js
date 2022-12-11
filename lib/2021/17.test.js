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
        expect(xAfterSteps(7, 0)).toBe(0)
        expect(xAfterSteps(7, 1)).toBe(7)
        expect(xAfterSteps(7, 2)).toBe(13)
        expect(xAfterSteps(7, 3)).toBe(18)
        expect(xAfterSteps(7, 4)).toBe(22)
        expect(xAfterSteps(7, 5)).toBe(25)
        expect(xAfterSteps(7, 6)).toBe(27)
        expect(xAfterSteps(7, 7)).toBe(28)
      })

      test('6', () => {
        expect.assertions(10)
        expect(xAfterSteps(6, 0)).toBe(0)
        expect(xAfterSteps(6, 1)).toBe(6)
        expect(xAfterSteps(6, 2)).toBe(11)
        expect(xAfterSteps(6, 3)).toBe(15)
        expect(xAfterSteps(6, 4)).toBe(18)
        expect(xAfterSteps(6, 5)).toBe(20)
        expect(xAfterSteps(6, 6)).toBe(21)
        expect(xAfterSteps(6, 7)).toBe(21)
        expect(xAfterSteps(6, 8)).toBe(21)
        expect(xAfterSteps(6, 9)).toBe(21)
      })

      test('17', () => {
        expect.assertions(5)
        expect(xAfterSteps(17, 0)).toBe(0)
        expect(xAfterSteps(17, 1)).toBe(17)
        expect(xAfterSteps(17, 2)).toBe(33)
        expect(xAfterSteps(17, 3)).toBe(48)
        expect(xAfterSteps(17, 4)).toBe(62)
      })

      test('-3', () => {
        expect.assertions(4)
        expect(xAfterSteps(-3, 0)).toBe(-0)
        expect(xAfterSteps(-3, 1)).toBe(-3)
        expect(xAfterSteps(-3, 2)).toBe(-5)
        expect(xAfterSteps(-3, 3)).toBe(-6)
      })
    })

    describe('yAfterSteps', () => {
      test('2', () => {
        expect.assertions(8)
        expect(yAfterSteps(2, 0)).toBe(0)
        expect(yAfterSteps(2, 1)).toBe(2)
        expect(yAfterSteps(2, 2)).toBe(3)
        expect(yAfterSteps(2, 3)).toBe(3)
        expect(yAfterSteps(2, 4)).toBe(2)
        expect(yAfterSteps(2, 5)).toBe(0)
        expect(yAfterSteps(2, 6)).toBe(-3)
        expect(yAfterSteps(2, 7)).toBe(-7)
      })

      test('3', () => {
        expect.assertions(10)
        expect(yAfterSteps(3, 0)).toBe(0)
        expect(yAfterSteps(3, 1)).toBe(3)
        expect(yAfterSteps(3, 2)).toBe(5)
        expect(yAfterSteps(3, 3)).toBe(6)
        expect(yAfterSteps(3, 4)).toBe(6)
        expect(yAfterSteps(3, 5)).toBe(5)
        expect(yAfterSteps(3, 6)).toBe(3)
        expect(yAfterSteps(3, 7)).toBe(0)
        expect(yAfterSteps(3, 8)).toBe(-4)
        expect(yAfterSteps(3, 9)).toBe(-9)
      })

      test('-4', () => {
        expect.assertions(5)
        expect(yAfterSteps(-4, 0)).toBe(-0)
        expect(yAfterSteps(-4, 1)).toBe(-4)
        expect(yAfterSteps(-4, 2)).toBe(-9)
        expect(yAfterSteps(-4, 3)).toBe(-15)
        expect(yAfterSteps(-4, 4)).toBe(-22)
      })

      test('2', () => {
        expect.assertions(4)
        expect(yAfterSteps(2, 0)).toBe(0)
        expect(yAfterSteps(2, 1)).toBe(2)
        expect(yAfterSteps(2, 2)).toBe(3)
        expect(yAfterSteps(2, 3)).toBe(3)
      })
    })

    describe('yPeak', () => {
      it('Works', () => {
        expect.assertions(6)
        expect(yPeak(0)).toBe(0)
        expect(yPeak(1)).toBe(1)
        expect(yPeak(2)).toBe(3)
        expect(yPeak(3)).toBe(6)
        expect(yPeak(4)).toBe(10)
        expect(yPeak(-10)).toBe(0)
      })
    })
  },

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(45)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(112)
    })
  },
)
