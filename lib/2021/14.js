const R = require('ramda')
const { frequency } = require('../utils')

const parseInput = (input) => {
  const [template, rulesRaw] = input.trim().split('\n\n')

  const rules = R.pipe(
    R.split('\n'),
    R.map((rules) => {
      const [pair, letter] = R.split(' -> ', rules)

      return [
        pair,
        {
          letter,
          leftPair: pair[0] + letter,
          rightPair: letter + pair[1],
        },
      ]
    }),
    R.fromPairs,
  )(rulesRaw)

  return { template, rules }
}

const solve = (template, rules, steps) => {
  const state = R.pipe(
    R.aperture(2),
    R.map(([a, b]) => [a + b, 1]),
    R.fromPairs,
  )(template)

  const letters = frequency(template)

  for (let i = 0; i < steps; i++) {
    for (const [pair, count] of Object.entries(state)) {
      if (rules[pair] !== undefined) {
        const { leftPair, rightPair, letter } = rules[pair]

        state[pair] -= count
        state[leftPair] = (state[leftPair] ?? 0) + count
        state[rightPair] = (state[rightPair] ?? 0) + count
        letters[letter] = (letters[letter] ?? 0) + count
      }
    }
  }

  const entries = R.values(letters)
  const max = R.reduce(R.max, -Infinity, entries)
  const min = R.reduce(R.min, +Infinity, entries)

  return max - min
}

const part1 = (input) => {
  let { template, rules } = parseInput(input)

  return solve(template, rules, 10)
}

const part2 = (input) => {
  let { template, rules } = parseInput(input)

  return solve(template, rules, 40)
}

module.exports = {
  part1,
  part2,
}
