const parseInput = (input) =>
  input
    .trim()
    .split(',')
    .map((x) => parseInt(x, 10))

/* Naive solution */
const step = (fish) => fish.flatMap((fish) => (fish > 0 ? [fish - 1] : [6, 8]))

const solveNaive = (input, steps) => {
  let fish = parseInput(input)

  for (let i = 0; i < steps; i++) {
    fish = step(fish)
  }

  return fish.length
}

const part1 = (input, steps = 80) => solveNaive(input, steps)

/* Hardened solution */
const solve = (input, steps) =>
  parseInput(input)
    .map((initial) => populationAfterSteps(steps - initial))
    .reduce((a, b) => a + b, 0)

// Can this be solved mathematically?
const cache = {}
const populationAfterSteps = (steps) => {
  if (cache[steps] !== undefined) {
    return cache[steps]
  }

  let accum = 1

  for (let i = 0; i < steps; i += 7) {
    accum += populationAfterSteps(steps - i - 9)
  }

  cache[steps] = accum

  return accum
}

const part2 = (input, steps = 256) => solve(input, steps)

module.exports = {
  part1,
  part2,
}
