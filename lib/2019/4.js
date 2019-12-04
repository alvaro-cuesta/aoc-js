const R = require('ramda')
const { parseText, parseDecimal } = require('../utils')

const parseInput = R.pipe(
  parseText,
  R.split('-'),
  R.map(parseDecimal),
  R.converge(R.range, [R.nth(0), R.pipe(R.nth(1), R.inc)]),
  R.map(R.toString),
)

const isPassword = R.pipe(
  R.aperture(2),
  R.allPass([R.any(R.apply(R.equals)), R.all(R.apply(R.lte))]),
)

const part1 = R.pipe(parseInput, R.filter(isPassword), R.length)

const getAdjacentIndices = R.pipe(
  R.aperture(2),
  R.addIndex(R.map)((x, idx) => [x, idx]),
  R.filter(R.pipe(R.nth(0), R.apply(R.equals))),
  R.map(R.nth(1)),
)

const hasStrictAdjacent = (password) => {
  const indices = getAdjacentIndices(password)

  return R.any(
    R.allPass([
      (index) =>
        password[index] !== password[index - 1] &&
        password[index] !== password[index + 2],
    ]),
  )(indices)
}

const isStrictPassword = R.allPass([
  hasStrictAdjacent,
  R.pipe(R.aperture(2), R.all(R.apply(R.lte))),
])

const part2 = R.pipe(parseInput, R.filter(isStrictPassword), R.length)

module.exports = {
  part1,
  part2,
}
