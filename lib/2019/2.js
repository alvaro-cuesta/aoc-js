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

const partX = (noun, verb) =>
  R.pipe(
    parseInput,
    R.update(1, noun),
    R.update(2, verb),
    run,
    R.prop('ram'),
    R.nth(0),
  )

const part1 = partX(12, 2)

const PART2_WANTED_OUTPUT = 19690720

const part2 = (input) => {
  for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
      if (partX(n, v)(input) === PART2_WANTED_OUTPUT) {
        return n * 100 + v
      }
    }
  }

  throw new Error('Solution not found')
}

module.exports = {
  part1,
  part2,
}
