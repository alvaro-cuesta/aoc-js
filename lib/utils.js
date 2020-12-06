const R = require('ramda')
const util = require('util')

const parseLines = R.pipe(R.split('\n'), R.slice(0, -1))

const parseText = R.slice(0, -1)

const parseDecimal = (x) => parseInt(x, 10)

const inspect = (x) => util.inspect(x, false, +Infinity, false)

const logInspect = R.pipe(inspect, console.log)

const permutations = (array) => {
  if (array.length === 1) {
    return [array]
  }

  return R.pipe(
    R.length,
    R.range(0),
    R.chain((i) =>
      R.pipe(
        R.remove,
        permutations,
        R.map((perm) => [R.nth(i, array), ...perm]),
      )(i, 1, array),
    ),
  )(array)
}

const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat)

const gcd = (a, b) => {
  while (a !== b) {
    if (a > b) {
      a -= b
    } else if (a < b) {
      b -= a
    }
  }

  return a
}

const lcm = R.converge(R.divide, [R.multiply, gcd])

const frequency = (x) =>
  R.reduce(
    (freqs, x) => {
      freqs[x] = (freqs[x] || 0) + 1
      return freqs
    },
    {},
    x,
  )

const sortedFrequency = R.pipe(
  frequency,
  R.toPairs,
  R.sortWith([R.descend(R.nth(1)), R.ascend(R.identity)]),
)

const matchAllOverlapping = function* matchAllOverlapping(str, fromRE) {
  const re = new RegExp(fromRE)

  let match

  while ((match = re.exec(str)) !== null) {
    re.lastIndex = match.index + 1
    yield match
  }
}

module.exports = {
  parseLines,
  parseText,
  parseDecimal,
  inspect,
  logInspect,
  permutations,
  applyN,
  gcd,
  lcm,
  frequency,
  sortedFrequency,
  matchAllOverlapping,
}
