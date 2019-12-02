const R = require('ramda')
const { parseText, parseDecimal } = require('../utils')

const parseInput = R.pipe(parseText, R.split(','), R.map(parseDecimal))

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
      ip: ip + 1,
      halted: true,
    }
  },
}

const step = (state) => opcodes[state.ram[state.ip]](state)

const run = R.pipe(
  (input) => ({
    ram: input,
    ip: 0,
    halted: false,
  }),
  R.until(R.prop('halted'), step),
)

const part1 = R.pipe(
  parseInput,
  R.update(1, 12),
  R.update(2, 2),
  run,
  R.prop('ram'),
  R.nth(0),
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
