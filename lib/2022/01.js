const R = require('ramda')
const { parseText, parseDecimal } = require('../utils')

const caloriesPerElf = R.pipe(
  parseText,
  R.split('\n\n'),
  R.map(R.pipe(R.split('\n'), R.map(parseDecimal), R.sum)),
)

const part1 = R.pipe(caloriesPerElf, R.reduce(R.max, -Infinity))

const part2 = R.pipe(
  caloriesPerElf,
  R.sort(R.flip(R.subtract)),
  R.take(3),
  R.sum,
)

module.exports = {
  part1,
  part2,
}
