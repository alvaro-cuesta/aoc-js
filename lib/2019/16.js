const R = require('ramda')
const I = require('iter-tools')
const { parseText, parseDecimal, applyN } = require('../utils')

const makePattern = R.curry((pattern, i) =>
  I.execPipe(I.map(I.repeatTimes(i), pattern), I.join, I.cycle, I.drop(1)),
)

const applyPattern = R.curry((input, pattern) =>
  I.execPipe(
    I.zip(input, pattern),
    I.map(R.apply(R.multiply)),
    I.reduce(R.add),
    Math.abs,
    R.flip(R.modulo)(10),
  ),
)

const phase = R.curry((pattern, input) =>
  I.execPipe(
    I.map(
      (_, i) => I.execPipe(makePattern(pattern, i + 1), applyPattern(input)),
      input,
    ),
    I.toArray,
  ),
)

const part1 = R.pipe(
  parseText,
  R.split(''),
  R.map(parseDecimal),
  (x) => {
    const doPhase = phase([0, 1, 0, -1])

    for (let i = 0; i < 100; i++) {
      x = doPhase(x)
    }

    return x
  },
  // applyN(phase([0, 1, 0, -1]), 10),
  I.take(8),
  I.toArray,
  R.join(''),
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  makePattern,
  applyPattern,
  phase,
  part1,
  part2,
}
