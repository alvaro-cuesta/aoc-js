const R = require('ramda')

const parseInput = (input) =>
  input
    .trim()
    .split(',')
    .map((x) => parseInt(x, 10))

const solve = (input, costFn) => {
  const crabs = parseInput(input)

  const minX = R.reduce(R.min, Infinity)(crabs)
  const maxX = R.reduce(R.max, -Infinity)(crabs)

  const xs = R.range(minX, maxX + 1)

  const fuels = xs.map((x) =>
    crabs
      .map((crabX) => costFn(Math.abs(x - crabX)))
      .reduce((a, b) => a + b, 0),
  )

  return R.reduce(R.min, Infinity)(fuels)
}

const part1 = (input) => solve(input, R.identity)

const part2 = (input) => solve(input, (steps) => (steps * (steps + 1)) / 2)

module.exports = {
  part1,
  part2,
}
