const R = require('ramda')
const { parseText, parseDecimal } = require('./utils')

const parseRAM = R.pipe(parseText, R.split(','), R.map(parseDecimal))

const opcodes = {
  // add
  1: ([am, bm], state) => {
    const { ram, ip } = state
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = (am ? a : ram[a]) + (bm ? b : ram[b])

    return {
      ...state,
      ip: ip + 4,
    }
  },

  // multiply
  2: ([am, bm], state) => {
    const { ram, ip } = state
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = (am ? a : ram[a]) * (bm ? b : ram[b])

    return {
      ...state,
      ip: ip + 4,
    }
  },

  // input
  3: (_, state) => {
    const { ram, ip, input } = state
    const o = ram[ip + 1]

    ram[o] = input.pop()

    return {
      ...state,
      ip: ip + 2,
    }
  },

  // output
  4: ([am], state) => {
    const { ram, ip, output } = state
    const i = ram[ip + 1]

    output.push(am ? i : ram[i])

    return {
      ...state,
      ip: ip + 2,
    }
  },

  // jump-if-true
  5: ([am, bm], state) => {
    const { ram, ip } = state
    const [a, b] = ram.slice(ip + 1, ip + 3)

    const mustJump = (am ? a : ram[a]) !== 0
    const bv = bm ? b : ram[b]

    return {
      ...state,
      ip: mustJump ? bv : ip + 3,
    }
  },

  // jump-if-false
  6: ([am, bm], state) => {
    const { ram, ip } = state
    const [a, b] = ram.slice(ip + 1, ip + 3)

    const mustJump = (am ? a : ram[a]) === 0
    const bv = bm ? b : ram[b]

    return {
      ...state,
      ip: mustJump ? bv : ip + 3,
    }
  },

  // less than
  7: ([am, bm], state) => {
    const { ram, ip } = state
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = (am ? a : ram[a]) < (bm ? b : ram[b]) ? 1 : 0

    return {
      ...state,
      ip: ip + 4,
    }
  },

  // equals
  8: ([am, bm], state) => {
    const { ram, ip } = state
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = (am ? a : ram[a]) === (bm ? b : ram[b]) ? 1 : 0

    return {
      ...state,
      ip: ip + 4,
    }
  },

  99: (_, state) => {
    // The halt instruction would increase the instruction pointer by 1,
    // but it halts the program instead.
    return {
      ...state,
      halted: true,
    }
  },
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
