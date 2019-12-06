const R = require('ramda')
const { parseLines, parseDecimal } = require('../utils')

const parseInput = R.pipe(parseLines, R.map(parseDecimal))

const requiredFuel = (mass) => Math.floor(mass / 3 - 2)

const requiredFuelRecursive = (mass) => {
  let total = 0

  let required = mass
  while ((required = requiredFuel(required)) > 0) {
    total += required
  }

  return total
}

const part1 = R.pipe(parseInput, R.map(requiredFuel), R.sum)

const part2 = R.pipe(parseInput, R.map(requiredFuelRecursive), R.sum)

module.exports = {
  requiredFuel,
  requiredFuelRecursive,
  part1,
  part2,
}
