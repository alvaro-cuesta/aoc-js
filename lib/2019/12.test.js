const { describeDay } = require('../test-utils')
const { applyN } = require('../utils')
const R = require('ramda')

const EXAMPLE_INPUT = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>
`

describeDay(
  2019,
  12,

  9999,
  null,

  ({ parseMoons, step, getEnergy }) => {
    describe('step', () => {
      test('Example input', () => {
        expect.assertions(11)

        const step0 = parseMoons(EXAMPLE_INPUT)

        expect(step0).toStrictEqual([
          { pos: [-1, 0, 2], vel: [0, 0, 0], i: 0 },
          { pos: [2, -10, -7], vel: [0, 0, 0], i: 1 },
          { pos: [4, -8, 8], vel: [0, 0, 0], i: 2 },
          { pos: [3, 5, -1], vel: [0, 0, 0], i: 3 },
        ])

        const step1 = step(step0)

        expect(step1).toStrictEqual([
          { pos: [2, -1, 1], vel: [3, -1, -1], i: 0 },
          { pos: [3, -7, -4], vel: [1, 3, 3], i: 1 },
          { pos: [1, -7, 5], vel: [-3, 1, -3], i: 2 },
          { pos: [2, 2, 0], vel: [-1, -3, 1], i: 3 },
        ])

        const step2 = step(step1)

        expect(step2).toStrictEqual([
          { pos: [5, -3, -1], vel: [3, -2, -2], i: 0 },
          { pos: [1, -2, 2], vel: [-2, 5, 6], i: 1 },
          { pos: [1, -4, -1], vel: [0, 3, -6], i: 2 },
          { pos: [1, -4, 2], vel: [-1, -6, 2], i: 3 },
        ])

        const step3 = step(step2)

        expect(step3).toStrictEqual([
          { pos: [5, -6, -1], vel: [0, -3, 0], i: 0 },
          { pos: [0, 0, 6], vel: [-1, 2, 4], i: 1 },
          { pos: [2, 1, -5], vel: [1, 5, -4], i: 2 },
          { pos: [1, -8, 2], vel: [0, -4, 0], i: 3 },
        ])

        const step4 = step(step3)

        expect(step4).toStrictEqual([
          { pos: [2, -8, 0], vel: [-3, -2, 1], i: 0 },
          { pos: [2, 1, 7], vel: [2, 1, 1], i: 1 },
          { pos: [2, 3, -6], vel: [0, 2, -1], i: 2 },
          { pos: [2, -9, 1], vel: [1, -1, -1], i: 3 },
        ])

        const step5 = step(step4)

        expect(step5).toStrictEqual([
          { pos: [-1, -9, 2], vel: [-3, -1, 2], i: 0 },
          { pos: [4, 1, 5], vel: [2, 0, -2], i: 1 },
          { pos: [2, 2, -4], vel: [0, -1, 2], i: 2 },
          { pos: [3, -7, -1], vel: [1, 2, -2], i: 3 },
        ])

        const step6 = step(step5)

        expect(step6).toStrictEqual([
          { pos: [-1, -7, 3], vel: [0, 2, 1], i: 0 },
          { pos: [3, 0, 0], vel: [-1, -1, -5], i: 1 },
          { pos: [3, -2, 1], vel: [1, -4, 5], i: 2 },
          { pos: [3, -4, -2], vel: [0, 3, -1], i: 3 },
        ])

        const step7 = step(step6)

        expect(step7).toStrictEqual([
          { pos: [2, -2, 1], vel: [3, 5, -2], i: 0 },
          { pos: [1, -4, -4], vel: [-2, -4, -4], i: 1 },
          { pos: [3, -7, 5], vel: [0, -5, 4], i: 2 },
          { pos: [2, 0, 0], vel: [-1, 4, 2], i: 3 },
        ])

        const step8 = step(step7)

        expect(step8).toStrictEqual([
          { pos: [5, 2, -2], vel: [3, 4, -3], i: 0 },
          { pos: [2, -7, -5], vel: [1, -3, -1], i: 1 },
          { pos: [0, -9, 6], vel: [-3, -2, 1], i: 2 },
          { pos: [1, 1, 3], vel: [-1, 1, 3], i: 3 },
        ])

        const step9 = step(step8)

        expect(step9).toStrictEqual([
          { pos: [5, 3, -4], vel: [0, 1, -2], i: 0 },
          { pos: [2, -9, -3], vel: [0, -2, 2], i: 1 },
          { pos: [0, -8, 4], vel: [0, 1, -2], i: 2 },
          { pos: [1, 1, 5], vel: [0, 0, 2], i: 3 },
        ])

        const step10 = step(step9)

        expect(step10).toStrictEqual([
          { pos: [2, 1, -3], vel: [-3, -2, 1], i: 0 },
          { pos: [1, -8, 0], vel: [-1, 1, 3], i: 1 },
          { pos: [3, -6, 1], vel: [3, 2, -3], i: 2 },
          { pos: [2, 0, 4], vel: [1, -1, -1], i: 3 },
        ])
      })
    })

    describe('getEnergy', () => {
      test('Example input', () => {
        expect.assertions(1)

        expect(
          R.pipe(parseMoons, applyN(step, 10), getEnergy)(EXAMPLE_INPUT),
        ).toStrictEqual(179)
      })
    })
  },

  undefined,

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toStrictEqual(2772)
    })
  },
)
