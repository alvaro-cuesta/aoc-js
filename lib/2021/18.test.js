const { describeDay } = require('../test-utils')
const { splitDeep, addAllReducing } = require('./18')

const EXAMPLE_INPUT = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]
`

describeDay(
  2021,
  18,

  2501,
  4935,

  ({ add, explode, split, addReducing, getMagnitude }) => {
    test('add', () => {
      expect.assertions(1)

      expect(add([1, 2], [[3, 4], 5])).toEqual([
        [1, 2],
        [[3, 4], 5],
      ])
    })

    test('explode', () => {
      expect.assertions(5)

      expect(explode([[[[[9, 8], 1], 2], 3], 4])).toEqual([
        [[[[0, 9], 2], 3], 4],
        [9, null],
      ])
      expect(explode([7, [6, [5, [4, [3, 2]]]]])).toEqual([
        [7, [6, [5, [7, 0]]]],
        [null, 2],
      ])
      expect(explode([[6, [5, [4, [3, 2]]]], 1])).toEqual([
        [[6, [5, [7, 0]]], 3],
        [null, null],
      ])
      expect(
        explode([
          [3, [2, [1, [7, 3]]]],
          [6, [5, [4, [3, 2]]]],
        ]),
      ).toEqual([
        [
          [3, [2, [8, 0]]],
          [9, [5, [4, [3, 2]]]],
        ],
        [null, null],
      ])
      expect(
        explode([
          [3, [2, [8, 0]]],
          [9, [5, [4, [3, 2]]]],
        ]),
      ).toEqual([
        [
          [3, [2, [8, 0]]],
          [9, [5, [7, 0]]],
        ],
        [null, 2],
      ])
    })

    test('split', () => {
      expect.assertions(3)

      expect(split(10)).toEqual([5, 5])
      expect(split(11)).toEqual([5, 6])
      expect(split(12)).toEqual([6, 6])
    })

    test('splitDeep', () => {
      expect.assertions(3)

      expect(
        splitDeep([
          [
            [[[4, 3], 4], 4],
            [7, [[8, 4], 9]],
          ],
          [1, 1],
        ]),
      ).toBeNull()

      expect(
        splitDeep([
          [
            [[0, 7], 4],
            [15, [0, 13]],
          ],
          [1, 1],
        ]),
      ).toEqual([
        [
          [[0, 7], 4],
          [
            [7, 8],
            [0, 13],
          ],
        ],
        [1, 1],
      ])

      expect(
        splitDeep([
          [
            [[0, 7], 4],
            [
              [7, 8],
              [0, 13],
            ],
          ],
          [1, 1],
        ]),
      ).toEqual([
        [
          [[0, 7], 4],
          [
            [7, 8],
            [0, [6, 7]],
          ],
        ],
        [1, 1],
      ])
    })

    test('addReducing', () => {
      expect.assertions(1)

      expect(
        addReducing(
          [
            [[[4, 3], 4], 4],
            [7, [[8, 4], 9]],
          ],
          [1, 1],
        ),
      ).toEqual([
        [
          [[0, 7], 4],
          [
            [7, 8],
            [6, 0],
          ],
        ],
        [8, 1],
      ])
    })

    test('addAllReducing', () => {
      expect.assertions(4)

      expect(
        addAllReducing([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
        ]),
      ).toEqual([
        [
          [
            [1, 1],
            [2, 2],
          ],
          [3, 3],
        ],
        [4, 4],
      ])

      expect(
        addAllReducing([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
        ]),
      ).toEqual([
        [
          [
            [3, 0],
            [5, 3],
          ],
          [4, 4],
        ],
        [5, 5],
      ])

      expect(
        addAllReducing([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
          [6, 6],
        ]),
      ).toEqual([
        [
          [
            [5, 0],
            [7, 4],
          ],
          [5, 5],
        ],
        [6, 6],
      ])

      expect(
        addAllReducing([
          [
            [
              [0, [4, 5]],
              [0, 0],
            ],
            [
              [
                [4, 5],
                [2, 6],
              ],
              [9, 5],
            ],
          ],
          [
            7,
            [
              [
                [3, 7],
                [4, 3],
              ],
              [
                [6, 3],
                [8, 8],
              ],
            ],
          ],
          [
            [
              2,
              [
                [0, 8],
                [3, 4],
              ],
            ],
            [
              [[6, 7], 1],
              [7, [1, 6]],
            ],
          ],
          [
            [
              [[2, 4], 7],
              [6, [0, 5]],
            ],
            [
              [
                [6, 8],
                [2, 8],
              ],
              [
                [2, 1],
                [4, 5],
              ],
            ],
          ],
          [
            7,
            [
              5,
              [
                [3, 8],
                [1, 4],
              ],
            ],
          ],
          [
            [2, [2, 2]],
            [8, [8, 1]],
          ],
          [2, 9],
          [
            1,
            [
              [[9, 3], 9],
              [
                [9, 0],
                [0, 7],
              ],
            ],
          ],
          [[[5, [7, 4]], 7], 1],
          [
            [[[4, 2], 2], 6],
            [8, 7],
          ],
        ]),
      ).toEqual([
        [
          [
            [8, 7],
            [7, 7],
          ],
          [
            [8, 6],
            [7, 7],
          ],
        ],
        [
          [
            [0, 7],
            [6, 6],
          ],
          [8, 7],
        ],
      ])
    })

    test('getMagnitude', () => {
      expect.assertions(9)

      expect(getMagnitude([9, 1])).toBe(29)
      expect(getMagnitude([1, 9])).toBe(21)
      expect(
        getMagnitude([
          [9, 1],
          [1, 9],
        ]),
      ).toBe(129)
      expect(
        getMagnitude([
          [1, 2],
          [[3, 4], 5],
        ]),
      ).toBe(143)
      expect(
        getMagnitude([
          [
            [[0, 7], 4],
            [
              [7, 8],
              [6, 0],
            ],
          ],
          [8, 1],
        ]),
      ).toBe(1384)
      expect(
        getMagnitude([
          [
            [
              [1, 1],
              [2, 2],
            ],
            [3, 3],
          ],
          [4, 4],
        ]),
      ).toBe(445)
      expect(
        getMagnitude([
          [
            [
              [3, 0],
              [5, 3],
            ],
            [4, 4],
          ],
          [5, 5],
        ]),
      ).toBe(791)
      expect(
        getMagnitude([
          [
            [
              [5, 0],
              [7, 4],
            ],
            [5, 5],
          ],
          [6, 6],
        ]),
      ).toBe(1137)
      expect(
        getMagnitude([
          [
            [
              [8, 7],
              [7, 7],
            ],
            [
              [8, 6],
              [7, 7],
            ],
          ],
          [
            [
              [0, 7],
              [6, 6],
            ],
            [8, 7],
          ],
        ]),
      ).toBe(3488)
    })
  },

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(4140)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(3993)
    })
  },
)
