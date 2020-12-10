const R = require('ramda')

const getAdapters = (input) => {
  const sorted = R.pipe(
    R.trim,
    R.split('\n'),
    R.map((x) => parseInt(x, 10)),
    R.sort(R.ascend(R.identity)),
  )(input)

  return [0, ...sorted, sorted[sorted.length - 1] + 3]
}

const part1 = (input) => {
  const adapters = getAdapters(input)

  const differences = R.pipe(
    R.aperture(2),
    R.map(([a, b]) => b - a),
  )(adapters)

  const diff1 = differences.filter((x) => x === 1).length
  const diff3 = differences.filter((x) => x === 3).length

  return diff1 * diff3
}

const chainsOf = (canConnectTo, cache = {}, value = 0) => {
  const children = canConnectTo[value]

  if (children.length === 0) {
    cache[value] = 1
    return 1
  }

  const total = R.sum(
    children.map((x) => cache[x] || chainsOf(canConnectTo, cache, x)),
  )

  cache[value] = total

  return total
}

const part2 = (input) => {
  const adapters = getAdapters(input)

  const canConnectTo = R.pipe(
    R.map((x) => [x, adapters.filter((y) => y > x && y - x <= 3)]),
    R.fromPairs,
  )(adapters)

  return chainsOf(canConnectTo)
}

module.exports = {
  part1,
  part2,
}
