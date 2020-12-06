const R = require('ramda')
const { frequency } = require('../utils')

const parseInput = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((g) => g.split('\n'))

const part1 = R.pipe(
  parseInput,
  R.map(R.pipe(R.join(''), R.uniq, R.length)),
  R.sum,
)

const part2 = R.pipe(
  parseInput,
  R.map((g) =>
    R.pipe(
      R.join(''),
      frequency,
      R.filter(R.equals(g.length)),
      R.keys,
      R.length,
    )(g),
  ),
  R.sum,
)

module.exports = {
  part1,
  part2,
}
