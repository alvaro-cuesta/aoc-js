const { describeDay } = require('../test-utils')

describeDay(
  2019,
  3,

  1674,
  null,

  ({ intersectSegments }) => {
    describe('intersectSegments', () => {
      it('Fully overallping H-H', () => {
        expect(
          intersectSegments(
            { orientation: 'H', y: 10, fromX: 0, toX: 3 },
            { orientation: 'H', y: 10, fromX: 0, toX: 3 },
          ),
        ).toEqual([
          [0, 10],
          [1, 10],
          [2, 10],
          [3, 10],
        ])
      })

      it('Partially overlapping H-H', () => {
        expect(
          intersectSegments(
            { orientation: 'H', y: 10, fromX: 0, toX: 3 },
            { orientation: 'H', y: 10, fromX: 3, toX: 5 },
          ),
        ).toEqual([[3, 10]])
      })

      it('Non-overalapping H-H', () => {
        expect(
          intersectSegments(
            { orientation: 'H', y: 10, fromX: 0, toX: 3 },
            { orientation: 'H', y: 10, fromX: 4, toX: 5 },
          ),
        ).toEqual([])
      })

      it('Fully overallping V-V', () => {
        expect(
          intersectSegments(
            { orientation: 'V', x: 10, fromY: 0, toY: 3 },
            { orientation: 'V', x: 10, fromY: 0, toY: 3 },
          ),
        ).toEqual([
          [10, 0],
          [10, 1],
          [10, 2],
          [10, 3],
        ])
      })

      it('Partially overlapping V-V', () => {
        expect(
          intersectSegments(
            { orientation: 'V', x: 10, fromY: 0, toY: 3 },
            { orientation: 'V', x: 10, fromY: 3, toY: 5 },
          ),
        ).toEqual([[10, 3]])
      })

      it('Non-overalapping V-V', () => {
        expect(
          intersectSegments(
            { orientation: 'V', x: 10, fromY: 0, toY: 3 },
            { orientation: 'V', x: 10, fromY: 4, toY: 5 },
          ),
        ).toEqual([])
      })
    })
  },
)
