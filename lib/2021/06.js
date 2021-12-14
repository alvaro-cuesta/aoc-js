const R = require('ramda')
const { frequency, parseDecimal } = require('../utils')

const parseInput = (input) => {
  const fishCount = R.pipe(
    R.trim,
    R.split(','),
    R.map(parseDecimal),
    frequency,
  )(input)

  for (let i = 0; i < 10; i++) {
    fishCount[i] = fishCount[i] ?? 0
  }

  return fishCount
}

const mutStep = (fishCount) => {
  const zeroes = fishCount[0]

  for (let i = 0; i < 9; i++) {
    fishCount[i] = fishCount[i + 1]
  }

  fishCount[9] = 0

  fishCount[6] += zeroes
  fishCount[8] += zeroes
}

const solve = (input, steps) => {
  const fishCount = parseInput(input)

  for (let i = 0; i < steps; i++) {
    mutStep(fishCount)
  }

  return R.pipe(R.values, R.sum)(fishCount)
}

const part1 = (input, steps = 80) => solve(input, steps)

const part2 = (input, steps = 256) => solve(input, steps)

module.exports = {
  part1,
  part2,
}
