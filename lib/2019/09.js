const R = require('ramda')
const intcode = require('./intcode')

const partX = (input) =>
  R.pipe(
    intcode.parseRAM,
    intcode.runToHalt([input]),
    R.prop('output'),
    R.nth(0),
  )

const part1 = partX(1)

const part2 = partX(2)

module.exports = {
  part1,
  part2,
}
