const R = require('ramda')
const { parseText, parseDecimal } = require('./utils')

const parseRAM = R.pipe(parseText, R.split(','), R.map(parseDecimal))

const makeOpcode = (arity, fn) => (modes, state) => {
  const { ram, ip } = state
  const args = ram.slice(ip + 1, ip + 1 + arity)

  const result = fn(args, modes, state)

  return {
    ...state,
    ...result,
    ip: result.ip
      ? result.ip
      : // The halt instruction would increase the instruction pointer by 1,
      // but it halts the program instead.
      !result.halted
      ? ip + 1 + arity
      : ip,
  }
}

const opcodes = {
  // add
  1: makeOpcode(3, ([a, b, o], [am, bm], { ram }) => {
    ram[o] = (am ? a : ram[a]) + (bm ? b : ram[b])

    return { ram }
  }),

  // multiply
  2: makeOpcode(3, ([a, b, o], [am, bm], { ram }) => {
    ram[o] = (am ? a : ram[a]) * (bm ? b : ram[b])

    return { ram }
  }),

  // input
  3: makeOpcode(1, ([o], _, { ram, input }) => {
    ram[o] = input.pop()

    return { ram, input }
  }),

  // output
  4: makeOpcode(1, ([i], [im], { ram, output }) => {
    output.push(im ? i : ram[i])

    return { output }
  }),

  // jump-if-true
  5: makeOpcode(2, ([a, b], [am, bm], { ram }) => {
    const mustJump = (am ? a : ram[a]) !== 0
    const bv = bm ? b : ram[b]

    return {
      ip: mustJump ? bv : undefined,
    }
  }),

  // jump-if-false
  6: makeOpcode(2, ([a, b], [am, bm], { ram }) => {
    const mustJump = (am ? a : ram[a]) === 0
    const bv = bm ? b : ram[b]

    return {
      ip: mustJump ? bv : undefined,
    }
  }),

  // less than
  7: makeOpcode(3, ([a, b, o], [am, bm], { ram }) => {
    ram[o] = (am ? a : ram[a]) < (bm ? b : ram[b]) ? 1 : 0

    return { ram }
  }),

  // equals
  8: makeOpcode(3, ([a, b, o], [am, bm], { ram }) => {
    ram[o] = (am ? a : ram[a]) === (bm ? b : ram[b]) ? 1 : 0

    return { ram }
  }),

  // halt
  99: makeOpcode(0, (_, __, ___) => {
    return { halted: true }
  }),
}

const decodeOpcode = R.pipe(
  R.toString,
  (x) => x.padStart(5, '0'),
  R.applySpec({
    opcode: R.pipe(R.slice(3, +Infinity), parseDecimal),
    modes: R.pipe(R.slice(0, 3), R.split(''), R.reverse, R.map(R.equals('1'))),
  }),
)

const step = (state) => {
  const { opcode, modes } = decodeOpcode(state.ram[state.ip])

  return opcodes[opcode](modes, state)
}

const runToHalt = R.curryN(
  2,
  R.pipe(
    (input, ram) => ({
      ram: [...ram],
      ip: 0,
      halted: false,
      input: [...input],
      output: [],
    }),
    R.until(R.prop('halted'), step),
  ),
)

module.exports = {
  parseRAM,
  opcodes,
  step,
  runToHalt,
}
