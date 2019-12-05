const R = require('ramda')
const { parseText, parseDecimal } = require('./utils')

const parseRAM = R.pipe(parseText, R.split(','), R.map(parseDecimal))

const opcodes = {
  1: ({ ram, ip, halted }) => {
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = ram[a] + ram[b]

    return {
      ram,
      ip: ip + 4,
      halted,
    }
  },

  2: ({ ram, ip, halted }) => {
    const [a, b, o] = ram.slice(ip + 1, ip + 4)

    ram[o] = ram[a] * ram[b]

    return {
      ram,
      ip: ip + 4,
      halted,
    }
  },

  99: ({ ram, ip, halted }) => {
    return {
      ram,
      ip, // The halt instruction would increase the instruction pointer by 1, but it halts the program instead.
      halted: true,
    }
  },
}

const step = (state) => opcodes[state.ram[state.ip]](state)

const runToHalt = R.pipe(
  (input) => ({
    ram: input,
    ip: 0,
    halted: false,
  }),
  R.until(R.prop('halted'), step),
)

module.exports = {
  parseRAM,
  opcodes,
  step,
  runToHalt,
}
