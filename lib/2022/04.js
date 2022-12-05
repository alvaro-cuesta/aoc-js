const R = require('ramda')
const { parseLines, parseDecimal } = require('../utils')

const anyFullyContains = ([[a0, a1], [b0, b1]]) =>
  (a0 >= b0 && a1 <= b1) || (b0 >= a0 && b1 <= a1)

const parsePairs = R.pipe(
  parseLines,
  R.map(R.pipe(R.split(','), R.map(R.pipe(R.split('-'), R.map(parseDecimal))))),
)

const part1 = R.pipe(parsePairs, R.count(anyFullyContains))

const anyOverlaps = ([[a0, a1], [b0, b1]]) =>
  (a0 >= b0 && a0 <= b1) || (b0 >= a0 && b0 <= a1)

const part2 = R.pipe(parsePairs, R.count(anyOverlaps))

module.exports = {
  part1,
  part2,
}
