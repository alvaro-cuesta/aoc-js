const { describeDay } = require('../test-utils')
const R = require('ramda')

describeDay(
  2019,
  22,

  5169,
  null,

  ({ newDeck, newStack, cutN, dealIncN, shuffleDeck }) => {
    test('newDeck', () => {
      expect.assertions(1)
      expect(newDeck(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    test('newStack', () => {
      expect.assertions(1)
      expect(R.pipe(newDeck, newStack)(10)).toEqual([
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
        0,
      ])
    })

    describe('cutN', () => {
      test('positive', () => {
        expect.assertions(1)
        expect(R.pipe(newDeck, cutN(3))(10)).toEqual([
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          1,
          2,
        ])
      })

      test('negative', () => {
        expect.assertions(1)
        expect(R.pipe(newDeck, cutN(-4))(10)).toEqual([
          6,
          7,
          8,
          9,
          0,
          1,
          2,
          3,
          4,
          5,
        ])
      })
    })

    describe('dealIncN', () => {
      test('3', () => {
        expect.assertions(1)
        expect(R.pipe(newDeck, dealIncN(3))(10)).toEqual([
          0,
          7,
          4,
          1,
          8,
          5,
          2,
          9,
          6,
          3,
        ])
      })

      test('7', () => {
        expect.assertions(1)
        expect(R.pipe(newDeck, dealIncN(7))(10)).toEqual([
          0,
          3,
          6,
          9,
          2,
          5,
          8,
          1,
          4,
          7,
        ])
      })
    })

    describe('shuffleDeck', () => {
      test('Example 1', () => {
        expect.assertions(1)
        expect(
          shuffleDeck(
            10,
            `deal with increment 7
deal into new stack
deal into new stack
`,
          ),
        ).toEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7])
      })

      test('Example 2', () => {
        expect.assertions(1)
        expect(
          shuffleDeck(
            10,
            `cut 6
deal with increment 7
deal into new stack
`,
          ),
        ).toEqual([3, 0, 7, 4, 1, 8, 5, 2, 9, 6])
      })

      test('Example 3', () => {
        expect.assertions(1)
        expect(
          shuffleDeck(
            10,
            `deal with increment 7
deal with increment 9
cut -2
`,
          ),
        ).toEqual([6, 3, 0, 7, 4, 1, 8, 5, 2, 9])
      })

      test('Example 4', () => {
        expect.assertions(1)
        expect(
          shuffleDeck(
            10,
            `deal into new stack
cut -2
deal with increment 7
cut 8
cut -4
deal with increment 7
cut 3
deal with increment 9
deal with increment 3
cut -1
`,
          ),
        ).toEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6])
      })
    })
  },
)
