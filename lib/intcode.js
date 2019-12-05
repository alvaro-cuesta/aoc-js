const R = require('ramda')
const { parseText, parseDecimal } = require('./utils')

const parseRAM = R.pipe(parseText, R.split(','), R.map(parseDecimal))

const opcodes = {
  1: (state) => {
    const { ram, ip } = state
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = ram[a] + ram[b]

    return {
      ...state,
      ip: ip + 4,
    }
  },

  2: (state) => {
    const { ram, ip } = state
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = ram[a] * ram[b]

    return {
      ...state,
      ip: ip + 4,
    }
  },

  3: (state) => {
    const { ram, ip, input } = state
    const o = ram[ip + 1]

    ram[o] = input.pop()

    return {
      ...state,
      ip: ip + 2,
    }
  },

  4: (state) => {
    const { ram, ip, output } = state
    const i = ram[ip + 1]

    output.push(ram[i])

    return {
      ...state,
      ip: ip + 2,
    }
  },

  99: (state) => {
    // The halt instruction would increase the instruction pointer by 1,
    // but it halts the program instead.
    return {
      ...state,
      halted: true,
    }
  },
}

const step = (state) => opcodes[state.ram[state.ip]](state)

const runToHalt = R.curryN(
  2,
  R.pipe(
    (input, ram) => ({
      ram,
      ip: 0,
      halted: false,
      input,
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
