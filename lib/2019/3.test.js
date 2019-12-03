const { describeDay } = require('../test-utils')

const FIRST_EXAMPLE = `R8,U5,L5,D3
U7,R6,D4,L4
`

const SECOND_EXAMPLE = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83
`

const THIRD_EXAMPLE = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
`

describeDay(
  2019,
  3,

  1674,
  14012,

  undefined,

  (part1) => {
    it('1st example', () => {
      expect(part1(FIRST_EXAMPLE)).toEqual(6)
    })

    it('2nd example', () => {
      expect(part1(SECOND_EXAMPLE)).toEqual(159)
    })

    it('3rd example', () => {
      expect(part1(THIRD_EXAMPLE)).toEqual(135)
    })
  },

  (part2) => {
    it('1st example', () => {
      expect(part2(FIRST_EXAMPLE)).toEqual(30)
    })

    it('2nd example', () => {
      expect(part2(SECOND_EXAMPLE)).toEqual(610)
    })

    it('3rd example', () => {
      expect(part2(THIRD_EXAMPLE)).toEqual(410)
    })
  },
)
