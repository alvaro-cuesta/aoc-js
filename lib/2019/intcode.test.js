const intcode = require('./intcode')
const R = require('ramda')

describe('intcode', () => {
  describe('spawn / *Executor', () => {
    describe('Day 2 specs', () => {
      test('1,9,10,3,2,3,11,0,99,30,40,50 input', () => {
        expect.assertions(1)

        expect(
          intcode.spawn([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]).next(),
        ).toStrictEqual({
          done: true,
          value: {
            ram: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
            ip: 8,
            base: 0,
            halted: true,
          },
        })
      })

      test('1,0,0,0,99 input', () => {
        expect.assertions(1)
        expect(intcode.spawn([1, 0, 0, 0, 99]).next()).toStrictEqual({
          done: true,
          value: {
            ram: [2, 0, 0, 0, 99],
            ip: 4,
            base: 0,
            halted: true,
          },
        })
      })

      test('2,3,0,3,99 input', () => {
        expect.assertions(1)
        expect(intcode.spawn([2, 3, 0, 3, 99]).next()).toStrictEqual({
          done: true,
          value: {
            ram: [2, 3, 0, 6, 99],
            ip: 4,
            base: 0,
            halted: true,
          },
        })
      })

      test('2,4,4,5,99,0 input', () => {
        expect.assertions(1)
        expect(intcode.spawn([2, 4, 4, 5, 99, 0]).next()).toStrictEqual({
          done: true,
          value: {
            ram: [2, 4, 4, 5, 99, 9801],
            ip: 4,
            base: 0,
            halted: true,
          },
        })
      })

      test('1,1,1,4,99,5,6,0,99 input', () => {
        expect.assertions(1)
        expect(
          intcode.spawn([1, 1, 1, 4, 99, 5, 6, 0, 99]).next(),
        ).toStrictEqual({
          done: true,
          value: {
            ram: [30, 1, 1, 4, 2, 5, 6, 0, 99],
            ip: 8,
            base: 0,
            halted: true,
          },
        })
      })
    })
  })

  describe('Day 5 specs', () => {
    describe('Part 1', () => {
      test('The program 3,0,4,0,99 outputs whatever it gets as input, then halts.', () => {
        expect.assertions(3)

        const thread = intcode.spawn([3, 0, 4, 0, 99])

        expect(thread.next()).toStrictEqual({
          done: false,
          value: { type: 'input' },
        })

        expect(thread.next(1337)).toStrictEqual({
          done: false,
          value: { type: 'output', value: 1337 },
        })

        expect(thread.next()).toStrictEqual({
          done: true,
          value: {
            ram: [1337, 0, 4, 0, 99],
            ip: 4,
            base: 0,
            halted: true,
          },
        })
      })
    })

    describe('Part 2', () => {
      describe('Here are several programs that take one input, compare it to the value 8, and then produce one output', () => {
        describe('Using position mode', () => {
          describe('Consider whether the input is equal to 8', () => {
            const ROM = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8]

            test('output 1 (if it is)', () => {
              expect.assertions(3)

              const thread = intcode.spawn(ROM)

              expect(thread.next()).toStrictEqual({
                done: false,
                value: { type: 'input' },
              })

              expect(thread.next(8)).toStrictEqual({
                done: false,
                value: { type: 'output', value: 1 },
              })

              expect(thread.next()).toStrictEqual({
                done: true,
                value: {
                  ram: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8],
                  ip: 8,
                  base: 0,
                  halted: true,
                },
              })
            })

            test('or 0 (if it is not)', () => {
              expect.assertions(2)

              expect(
                intcode.arrayExecutor([5], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })

              expect(
                intcode.arrayExecutor([22], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })
            })
          })

          describe('Consider whether the input is less than 8', () => {
            const ROM = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8]

            test('output 1 (if it is)', () => {
              expect.assertions(2)

              expect(
                intcode.arrayExecutor([5], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [1],
              })

              expect(
                intcode.arrayExecutor([-10], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [1],
              })
            })

            test('or 0 (if it is not)', () => {
              expect.assertions(2)

              expect(
                intcode.arrayExecutor([100], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })

              expect(
                intcode.arrayExecutor([8], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })
            })
          })
        })

        describe('Using immediate mode', () => {
          describe('Consider whether the input is equal to 8', () => {
            const ROM = [3, 3, 1108, -1, 8, 3, 4, 3, 99]

            test('output 1 (if it is)', () => {
              expect.assertions(1)
              expect(
                intcode.arrayExecutor([8], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1108, 1, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [1],
              })
            })

            test('or 0 (if it is not)', () => {
              expect.assertions(2)

              expect(
                intcode.arrayExecutor([5], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })

              expect(
                intcode.arrayExecutor([22], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })
            })
          })

          describe('Consider whether the input is less than 8', () => {
            const ROM = [3, 3, 1107, -1, 8, 3, 4, 3, 99]

            test('output 1 (if it is)', () => {
              expect.assertions(2)

              expect(
                intcode.arrayExecutor([5], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [1],
              })

              expect(
                intcode.arrayExecutor([-10], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [1],
              })
            })

            test('or 0 (if it is not)', () => {
              expect.assertions(2)

              expect(
                intcode.arrayExecutor([100], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })

              expect(
                intcode.arrayExecutor([8], intcode.spawn(ROM)),
              ).toStrictEqual({
                ram: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
                ip: 8,
                base: 0,
                halted: true,
                remainingInput: [],
                output: [0],
              })
            })
          })
        })
      })

      describe('Here are some jump tests that take an input', () => {
        describe('Using position mode', () => {
          const ROM = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9]

          test('output 0 if the input was zero', () => {
            expect.assertions(1)
            expect(
              intcode.arrayExecutor([0], intcode.spawn(ROM)),
            ).toStrictEqual({
              ram: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 0, 0, 1, 9],
              ip: 11,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [0],
            })
          })

          test('or 1 if the input was non-zero', () => {
            expect.assertions(2)

            expect(
              intcode.arrayExecutor([-7], intcode.spawn(ROM)),
            ).toStrictEqual({
              ram: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -7, 1, 1, 9],
              ip: 11,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [1],
            })

            expect(
              intcode.arrayExecutor([100], intcode.spawn(ROM)),
            ).toStrictEqual({
              ram: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 100, 1, 1, 9],
              ip: 11,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [1],
            })
          })
        })

        describe('Using immediate mode', () => {
          const ROM = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1]

          test('output 0 if the input was zero', () => {
            expect.assertions(1)

            expect(
              intcode.arrayExecutor([0], intcode.spawn(ROM)),
            ).toStrictEqual({
              ram: [3, 3, 1105, 0, 9, 1101, 0, 0, 12, 4, 12, 99, 0],
              ip: 11,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [0],
            })
          })

          test('or 1 if the input was non-zero', () => {
            expect.assertions(2)

            expect(
              intcode.arrayExecutor([-7], intcode.spawn(ROM)),
            ).toStrictEqual({
              ram: [3, 3, 1105, -7, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
              ip: 11,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [1],
            })

            expect(
              intcode.arrayExecutor([100], intcode.spawn(ROM)),
            ).toStrictEqual({
              ram: [3, 3, 1105, 100, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
              ip: 11,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [1],
            })
          })
        })
      })

      describe('Larger example', () => {
        // prettier-ignore
        const ROM = [
          3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
          1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
          999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99
        ]

        test('output 999 if the input value is below 8', () => {
          expect.assertions(2)

          expect(intcode.arrayExecutor([5], intcode.spawn(ROM))).toStrictEqual({
            ram: R.update(21, 5, ROM),
            ip: 46,
            base: 0,
            halted: true,
            remainingInput: [],
            output: [999],
          })

          expect(
            intcode.arrayExecutor([-100], intcode.spawn(ROM)),
          ).toStrictEqual({
            ram: R.update(21, -100, ROM),
            ip: 46,
            base: 0,
            halted: true,
            remainingInput: [],
            output: [999],
          })
        })

        test('output 1000 if the input value is equal to 8', () => {
          expect.assertions(1)
          expect(intcode.arrayExecutor([8], intcode.spawn(ROM))).toStrictEqual({
            ram: R.pipe(R.update(21, 8), R.update(20, 1000))(ROM),
            ip: 46,
            base: 0,
            halted: true,
            remainingInput: [],
            output: [1000],
          })
        })

        test('output 1001 if the input value is greater than 8', () => {
          expect.assertions(2)

          expect(intcode.arrayExecutor([10], intcode.spawn(ROM))).toStrictEqual(
            {
              ram: R.pipe(R.update(21, 10), R.update(20, 1001))(ROM),
              ip: 46,
              base: 0,
              halted: true,
              remainingInput: [],
              output: [1001],
            },
          )

          expect(
            intcode.arrayExecutor([200], intcode.spawn(ROM)),
          ).toStrictEqual({
            ram: R.pipe(R.update(21, 200), R.update(20, 1001))(ROM),
            ip: 46,
            base: 0,
            halted: true,
            remainingInput: [],
            output: [1001],
          })
        })
      })
    })
  })

  describe('Day 9 specs', () => {
    test('Quine', () => {
      expect.assertions(1)

      const ROM = [
        109,
        1,
        204,
        -1,
        1001,
        100,
        1,
        100,
        1008,
        100,
        16,
        101,
        1006,
        101,
        0,
        99,
      ]

      const EXPECTED_ROM = [...ROM]

      EXPECTED_ROM[100] = 16
      EXPECTED_ROM[101] = 1

      expect(intcode.arrayExecutor([], intcode.spawn(ROM))).toStrictEqual({
        ram: EXPECTED_ROM,
        ip: 15,
        base: 16,
        halted: true,
        remainingInput: [],
        output: ROM,
      })
    })

    test('16 digit', () => {
      expect.assertions(1)

      const ROM = [1102, 34915192, 34915192, 7, 4, 7, 99, 0]
      const NUMBER = 1219070632396864

      expect(intcode.arrayExecutor([], intcode.spawn(ROM))).toStrictEqual({
        ram: R.update(7, NUMBER, ROM),
        ip: 6,
        base: 0,
        halted: true,
        remainingInput: [],
        output: [NUMBER],
      })
    })

    test('Large number', () => {
      expect.assertions(1)

      const ROM = [104, 1125899906842624, 99]

      expect(intcode.arrayExecutor([], intcode.spawn(ROM))).toStrictEqual({
        ram: ROM,
        ip: 2,
        base: 0,
        halted: true,
        remainingInput: [],
        output: [1125899906842624],
      })
    })
  })
})
