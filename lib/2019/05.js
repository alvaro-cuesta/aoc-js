const R = require('ramda')
const intcode = require('./intcode')

const partX = (systemId) =>
  R.pipe(
    intcode.parseRAM,
    intcode.runToHalt([systemId]),
    R.prop('output'),
    R.last,
  )

const part1 = partX(1)

const part2 = partX(5)

module.exports = {
  part1,
  part2,
}
