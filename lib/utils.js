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

module.exports = {
  parseLines,
  parseText,
  parseDecimal,
  inspect,
  logInspect,
  permutations,
  applyN,
}
