const intcode = require('./intcode')
const R = require('ramda')

describe('intcode', () => {
  describe('runToHalt', () => {
    describe('Day 2 specs', () => {
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

  describe('Day 5 specs', () => {
    describe('Part 1', () => {
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

    describe('Part 2', () => {
      describe('here are several programs that take one input, compare it to the value 8, and then produce one output', () => {
        describe('Using position mode', () => {
          describe('Consider whether the input is equal to 8', () => {
            const RAM = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]

            it('output 1 (if it is)', () => {
              expect(intcode.runToHalt([8], RAM)).toEqual({
                ram: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [1],
              })
            })

            it('or 0 (if it is not)', () => {
              expect(intcode.runToHalt([5], RAM)).toEqual({
                ram: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })

              expect(intcode.runToHalt([22], RAM)).toEqual({
                ram: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })
            })
          })

          describe('Consider whether the input is less than 8', () => {
            const RAM = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]

            it('output 1 (if it is)', () => {
              expect(intcode.runToHalt([5], RAM)).toEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [1],
              })

              expect(intcode.runToHalt([-10], RAM)).toEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [1],
              })
            })

            it('or 0 (if it is not)', () => {
              expect(intcode.runToHalt([100], RAM)).toEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })

              expect(intcode.runToHalt([8], RAM)).toEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })
            })
          })
        })

        describe('Using immediate mode', () => {
          describe('Consider whether the input is equal to 8', () => {
            const RAM = [3, 3, 1108, -1, 8, 3, 4, 3, 99]

            it('output 1 (if it is)', () => {
              expect(intcode.runToHalt([8], RAM)).toEqual({
                ram: [3, 3, 1108, 1, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [1],
              })
            })

            it('or 0 (if it is not)', () => {
              expect(intcode.runToHalt([5], RAM)).toEqual({
                ram: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })

              expect(intcode.runToHalt([22], RAM)).toEqual({
                ram: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })
            })
          })

          describe('Consider whether the input is less than 8', () => {
            const RAM = [3, 3, 1107, -1, 8, 3, 4, 3, 99]

            it('output 1 (if it is)', () => {
              expect(intcode.runToHalt([5], RAM)).toEqual({
                ram: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [1],
              })

              expect(intcode.runToHalt([-10], RAM)).toEqual({
                ram: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [1],
              })
            })

            it('or 0 (if it is not)', () => {
              expect(intcode.runToHalt([100], RAM)).toEqual({
                ram: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })

              expect(intcode.runToHalt([8], RAM)).toEqual({
                ram: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
                ip: 8,
                halted: true,
                input: [],
                output: [0],
              })
            })
          })
        })
      })

      describe('Here are some jump tests that take an input', () => {
        describe('Using position mode', () => {
          const RAM = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]

          it('output 0 if the input was zero', () => {
            expect(intcode.runToHalt([0], RAM)).toEqual({
              ram: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 0, 0, 1, 9],
              ip: 11,
              halted: true,
              input: [],
              output: [0],
            })
          })

          it('or 1 if the input was non-zero', () => {
            expect(intcode.runToHalt([-7], RAM)).toEqual({
              ram: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -7, 1, 1, 9],
              ip: 11,
              halted: true,
              input: [],
              output: [1],
            })

            expect(intcode.runToHalt([100], RAM)).toEqual({
              ram: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 100, 1, 1, 9],
              ip: 11,
              halted: true,
              input: [],
              output: [1],
            })
          })
        })

        describe('Using immediate mode', () => {
          const RAM = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]

          it('output 0 if the input was zero', () => {
            expect(intcode.runToHalt([0], RAM)).toEqual({
              ram: [3, 3, 1105, 0, 9, 1101, 0, 0, 12, 4, 12, 99, 0],
              ip: 11,
              halted: true,
              input: [],
              output: [0],
            })
          })

          it('or 1 if the input was non-zero', () => {
            expect(intcode.runToHalt([-7], RAM)).toEqual({
              ram: [3, 3, 1105, -7, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
              ip: 11,
              halted: true,
              input: [],
              output: [1],
            })

            expect(intcode.runToHalt([100], RAM)).toEqual({
              ram: [3, 3, 1105, 100, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
              ip: 11,
              halted: true,
              input: [],
              output: [1],
            })
          })
        })
      })

      describe('Larger example', () => {
        // prettier-ignore
        const RAM = [
          3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
          1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
          999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99
        ]

        it('output 999 if the input value is below 8', () => {
          expect(intcode.runToHalt([5], RAM)).toEqual({
            ram: R.update(21, 5, RAM),
            ip: 46,
            halted: true,
            input: [],
            output: [999],
          })

          expect(intcode.runToHalt([-100], RAM)).toEqual({
            ram: R.update(21, -100, RAM),
            ip: 46,
            halted: true,
            input: [],
            output: [999],
          })
        })

        it('output 1000 if the input value is equal to 8', () => {
          expect(intcode.runToHalt([8], RAM)).toEqual({
            ram: R.pipe(R.update(21, 8), R.update(20, 1000))(RAM),
            ip: 46,
            halted: true,
            input: [],
            output: [1000],
          })
        })

        it('output 1001 if the input value is greater than 8', () => {
          expect(intcode.runToHalt([10], RAM)).toEqual({
            ram: R.pipe(R.update(21, 10), R.update(20, 1001))(RAM),
            ip: 46,
            halted: true,
            input: [],
            output: [1001],
          })

          expect(intcode.runToHalt([200], RAM)).toEqual({
            ram: R.pipe(R.update(21, 200), R.update(20, 1001))(RAM),
            ip: 46,
            halted: true,
            input: [],
            output: [1001],
          })
        })
      })
    })
  })
})
