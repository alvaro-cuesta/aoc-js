const { describeDay } = require('../test-utils')
const I = require('iter-tools')

const COMPLEX_INPUT_1 = (12345678)
  .toString()
  .padStart(8, '0')
  .split('')
  .map((x) => parseInt(x, 10))

const COMPLEX_INPUT_2 = (48226158)
  .toString()
  .padStart(8, '0')
  .split('')
  .map((x) => parseInt(x, 10))

const COMPLEX_INPUT_3 = (34040438)
  .toString()
  .padStart(8, '0')
  .split('')
  .map((x) => parseInt(x, 10))

const COMPLEX_INPUT_4 = (3415518)
  .toString()
  .padStart(8, '0')
  .split('')
  .map((x) => parseInt(x, 10))

const COMPLEX_INPUT_5 = (1029498)
  .toString()
  .padStart(8, '0')
  .split('')
  .map((x) => parseInt(x, 10))

const PATTERN = [0, 1, 0, -1]

describeDay(
  2019,
  16,

  23135243,
  null,

  ({ makePattern, applyPattern, phase }) => {
    describe('makePattern', () => {
      test('Repeat once', () => {
        expect.assertions(1)
        expect([...I.take(10, makePattern([1, 2, 3], 1))]).toEqual([
          2,
          3,
          1,
          2,
          3,
          1,
          2,
          3,
          1,
          2,
        ])
      })

      test('Repeat twice', () => {
        expect.assertions(1)
        expect([...I.take(10, makePattern([1, 2, 3], 2))]).toEqual([
          1,
          2,
          2,
          3,
          3,
          1,
          1,
          2,
          2,
          3,
        ])
      })
    })

    describe('applyPattern', () => {
      test('Simple input', () => {
        expect.assertions(1)
        expect(
          applyPattern([9, 8, 7, 6, 5], makePattern([3, 1, 2], 1)),
        ).toEqual(2)
      })

      test('Complex input', () => {
        expect.assertions(32)

        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 1))).toEqual(
          COMPLEX_INPUT_2[0],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 2))).toEqual(
          COMPLEX_INPUT_2[1],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 3))).toEqual(
          COMPLEX_INPUT_2[2],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 4))).toEqual(
          COMPLEX_INPUT_2[3],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 5))).toEqual(
          COMPLEX_INPUT_2[4],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 6))).toEqual(
          COMPLEX_INPUT_2[5],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 7))).toEqual(
          COMPLEX_INPUT_2[6],
        )
        expect(applyPattern(COMPLEX_INPUT_1, makePattern(PATTERN, 8))).toEqual(
          COMPLEX_INPUT_2[7],
        )

        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 1))).toEqual(
          COMPLEX_INPUT_3[0],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 2))).toEqual(
          COMPLEX_INPUT_3[1],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 3))).toEqual(
          COMPLEX_INPUT_3[2],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 4))).toEqual(
          COMPLEX_INPUT_3[3],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 5))).toEqual(
          COMPLEX_INPUT_3[4],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 6))).toEqual(
          COMPLEX_INPUT_3[5],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 7))).toEqual(
          COMPLEX_INPUT_3[6],
        )
        expect(applyPattern(COMPLEX_INPUT_2, makePattern(PATTERN, 8))).toEqual(
          COMPLEX_INPUT_3[7],
        )

        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 1))).toEqual(
          COMPLEX_INPUT_4[0],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 2))).toEqual(
          COMPLEX_INPUT_4[1],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 3))).toEqual(
          COMPLEX_INPUT_4[2],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 4))).toEqual(
          COMPLEX_INPUT_4[3],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 5))).toEqual(
          COMPLEX_INPUT_4[4],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 6))).toEqual(
          COMPLEX_INPUT_4[5],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 7))).toEqual(
          COMPLEX_INPUT_4[6],
        )
        expect(applyPattern(COMPLEX_INPUT_3, makePattern(PATTERN, 8))).toEqual(
          COMPLEX_INPUT_4[7],
        )

        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 1))).toEqual(
          COMPLEX_INPUT_5[0],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 2))).toEqual(
          COMPLEX_INPUT_5[1],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 3))).toEqual(
          COMPLEX_INPUT_5[2],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 4))).toEqual(
          COMPLEX_INPUT_5[3],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 5))).toEqual(
          COMPLEX_INPUT_5[4],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 6))).toEqual(
          COMPLEX_INPUT_5[5],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 7))).toEqual(
          COMPLEX_INPUT_5[6],
        )
        expect(applyPattern(COMPLEX_INPUT_4, makePattern(PATTERN, 8))).toEqual(
          COMPLEX_INPUT_5[7],
        )
      })
    })

    describe('phase', () => {
      test('Complex input', () => {
        expect.assertions(4)
        expect([...phase(PATTERN, COMPLEX_INPUT_1)]).toEqual(COMPLEX_INPUT_2)
        expect([...phase(PATTERN, COMPLEX_INPUT_2)]).toEqual(COMPLEX_INPUT_3)
        expect([...phase(PATTERN, COMPLEX_INPUT_3)]).toEqual(COMPLEX_INPUT_4)
        expect([...phase(PATTERN, COMPLEX_INPUT_4)]).toEqual(COMPLEX_INPUT_5)
      })
    })
  },

  (part1, dayModule) => {},

  (part2, dayModule) => {},
)
