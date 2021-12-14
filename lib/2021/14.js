const R = require('ramda')
const { sortedFrequency, frequency } = require('../utils')

const parseInput = (input) => {
  const [template, rulesRaw] = input.trim().split('\n\n')

  const rules = Object.fromEntries(
    rulesRaw.split('\n').map((rule) => rule.split(' -> ')),
  )

  return { template, rules }
}

const naiveStep = (template, rules) =>
  R.aperture(2, template)
    .map(([a, b]) => (rules[a + b] !== undefined ? a + rules[a + b] : a))
    .join('') + template[template.length - 1]

const part1 = (input) => {
  let { template, rules } = parseInput(input)

  for (let i = 0; i < 10; i++) {
    template = naiveStep(template, rules)
  }

  const frequencies = sortedFrequency(template)

  return frequencies[0][1] - frequencies[frequencies.length - 1][1]
}

const makeMemoizedStep = (rules) => {
  const cache = {}

  const memoizedStep = (template, steps) => {
    const cacheKey = `${template}-${steps}`

    if (cache[cacheKey] !== undefined) {
      return cache[cacheKey]
    }

    if (steps === 0) {
      const counts = frequency(template)

      // Do not count last letter, since it will be counted as start of next template
      counts[template[template.length - 1]] -= 1

      return (cache[cacheKey] = counts)
    }

    const pairs = R.aperture(2, template)

    const counts = {}

    for (const [a, b] of pairs) {
      const stepped = rules[a + b] !== undefined ? a + rules[a + b] + b : a + b

      const innerRes = memoizedStep(stepped, steps - 1)

      for (const [k, v] of Object.entries(innerRes)) {
        counts[k] = (counts[k] ?? 0) + v
      }
    }

    return (cache[cacheKey] = counts)
  }

  return memoizedStep
}

const part2 = (input) => {
  let { template, rules } = parseInput(input)

  const memoizedStep = makeMemoizedStep(rules)
  const counts = memoizedStep(template, 40)

  // Add back last letter since it was removed inside memoizedStep to avoid
  // double counts, but last is never double-counted since it's not start of a
  // template
  counts[template[template.length - 1]] += 1

  const entries = R.values(counts)
  const max = R.reduce(R.max, -Infinity, entries)
  const min = R.reduce(R.min, +Infinity, entries)

  return max - min
}

module.exports = {
  part1,
  part2,
}
