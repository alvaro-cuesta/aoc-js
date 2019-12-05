const intcode = require('./intcode')

describe('intcode', () => {
  describe('runToHalt', () => {
    it('1,9,10,3,2,3,11,0,99,30,40,50 input', () => {
      expect(
        intcode.runToHalt([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]),
      ).toEqual({
        ram: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        ip: 8,
        halted: true,
      })
    })

    it('1,0,0,0,99 input', () => {
      expect(intcode.runToHalt([1, 0, 0, 0, 99])).toMatchObject({
        ram: [2, 0, 0, 0, 99],
        ip: 4,
        halted: true,
      })
    })

    it('2,3,0,3,99 input', () => {
      expect(intcode.runToHalt([2, 3, 0, 3, 99])).toMatchObject({
        ram: [2, 3, 0, 6, 99],
        ip: 4,
        halted: true,
      })
    })

    it('2,4,4,5,99,0 input', () => {
      expect(intcode.runToHalt([2, 4, 4, 5, 99, 0])).toMatchObject({
        ram: [2, 4, 4, 5, 99, 9801],
        ip: 4,
        halted: true,
      })
    })

    it('1,1,1,4,99,5,6,0,99 input', () => {
      expect(intcode.runToHalt([1, 1, 1, 4, 99, 5, 6, 0, 99])).toMatchObject({
        ram: [30, 1, 1, 4, 2, 5, 6, 0, 99],
        ip: 8,
        halted: true,
      })
    })
  })
})
