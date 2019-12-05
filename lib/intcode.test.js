const intcode = require('./intcode')

describe('intcode', () => {
  describe('runToHalt', () => {
    describe('day 2 specs', () => {
      it('1,9,10,3,2,3,11,0,99,30,40,50 input', () => {
        expect(
          intcode.runToHalt([], [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]),
        ).toEqual({
          ram: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
          ip: 8,
          halted: true,
          input: [],
          output: [],
        })
      })

      it('1,0,0,0,99 input', () => {
        expect(intcode.runToHalt([], [1, 0, 0, 0, 99])).toEqual({
          ram: [2, 0, 0, 0, 99],
          ip: 4,
          halted: true,
          input: [],
          output: [],
        })
      })

      it('2,3,0,3,99 input', () => {
        expect(intcode.runToHalt([], [2, 3, 0, 3, 99])).toEqual({
          ram: [2, 3, 0, 6, 99],
          ip: 4,
          halted: true,
          input: [],
          output: [],
        })
      })

      it('2,4,4,5,99,0 input', () => {
        expect(intcode.runToHalt([], [2, 4, 4, 5, 99, 0])).toEqual({
          ram: [2, 4, 4, 5, 99, 9801],
          ip: 4,
          halted: true,
          input: [],
          output: [],
        })
      })

      it('1,1,1,4,99,5,6,0,99 input', () => {
        expect(intcode.runToHalt([], [1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual({
          ram: [30, 1, 1, 4, 2, 5, 6, 0, 99],
          ip: 8,
          halted: true,
          input: [],
          output: [],
        })
      })
    })
  })

  describe('day 5 specs', () => {
    it('The program 3,0,4,0,99 outputs whatever it gets as input, then halts.', () => {
      expect(intcode.runToHalt([1337], [3, 0, 4, 0, 99])).toEqual({
        ram: [1337, 0, 4, 0, 99],
        ip: 4,
        halted: true,
        input: [],
        output: [1337],
      })
    })
  })
})
