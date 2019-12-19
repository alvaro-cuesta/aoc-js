const R = require('ramda')
const intcode = require('./intcode')
const I = require('iter-tools')

const makeGetPosition = (rom) => (input) =>
  R.pipe(
    intcode.parseRAM,
    intcode.spawn,
    intcode.arrayExecutor(input),
    R.prop('output'),
    R.nth(0),
  )(rom)

const part1 = (rom) =>
  I.execPipe(
    I.product(I.range(0, 50), I.range(0, 50)),
    I.map(makeGetPosition(rom)),
    I.filter(R.equals(1)),
    I.toArray,
    R.length,
  )

const part2 = (rom) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
