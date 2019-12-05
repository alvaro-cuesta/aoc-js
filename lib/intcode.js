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

const makeBinaryOpOpcode = (binaryOp) =>
  makeOpcode(3, ([a, b, o], [am, bm], { ram }) => {
    ram[o] = binaryOp(am ? a : ram[a], bm ? b : ram[b])

    return { ram }
  })

const makeAbsJumpOpcode = (pred) =>
  makeOpcode(2, ([a, b], [am, bm], { ram }) => {
    const mustJump = pred(am ? a : ram[a])
    const bv = bm ? b : ram[b]
    const ip = mustJump ? bv : undefined

    return { ip }
  })

const intBoolean = (x) => (x ? 1 : 0)

const opcodes = {
  // add
  1: makeBinaryOpOpcode(R.add),

  // multiply
  2: makeBinaryOpOpcode(R.multiply),

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
  5: makeAbsJumpOpcode(R.complement(R.identical)(0)),

  // jump-if-false
  6: makeAbsJumpOpcode(R.identical(0)),

  // less than
  7: makeBinaryOpOpcode(R.pipe(R.lt, intBoolean)),

  // equals
  8: makeBinaryOpOpcode(R.pipe(R.identical, intBoolean)),

  // halt
  99: makeOpcode(0, R.always({ halted: true })),
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
