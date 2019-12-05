const R = require('ramda')
const intcode = require('../intcode')

const part1 = R.pipe(
  intcode.parseRAM,
  intcode.runToHalt([1]),
  R.prop('output'),
  R.last,
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
