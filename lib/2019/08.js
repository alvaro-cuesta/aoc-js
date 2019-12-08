const R = require('ramda')
const { parseText } = require('../utils')

const W = 25
const H = 6

const parseLayers = R.pipe(parseText, R.split(''), R.splitEvery(W * H))

const part1 = R.pipe(
  parseLayers,
  R.map(R.countBy(R.identity)),
  (x) => x.reduce(R.minBy(R.prop(0))),
  (count) => count[1] * count[2],
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
