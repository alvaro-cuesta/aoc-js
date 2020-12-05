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

const SANTA_SIDE = 100

const part2 = (rom) => {
  const getPosition = makeGetPosition(rom)

  let y = SANTA_SIDE, // we have to skip the first rows since some of them don't even have 1s for my input
    x = 0 // but we can't skip to x = SANTA_SIDE since y = SANTA_SIZE has all 0s after x = SANTA_SIDE

  // Do I have the weirdest input?

  for (;;) {
    while (getPosition([x, y]) === 0) {
      x++
    }

    if (getPosition([x + SANTA_SIDE - 1, y - SANTA_SIDE + 1]) === 1) {
      return x * 10000 + y - SANTA_SIDE + 1
    }

    y++
  }
}

module.exports = {
  part1,
  part2,
}
