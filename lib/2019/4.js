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

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
