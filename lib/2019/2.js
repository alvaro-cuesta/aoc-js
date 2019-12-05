const R = require('ramda')
const intcode = require('../intcode')

const partX = (noun, verb) =>
  R.pipe(
    intcode.parseRAM,
    R.update(1, noun),
    R.update(2, verb),
    intcode.runToHalt,
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
