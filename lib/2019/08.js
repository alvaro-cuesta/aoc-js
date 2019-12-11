const R = require('ramda')
const { parseText, parseDecimal } = require('../utils')
const image = require('./image')

const W = 25
const H = 6

const parseLayers = (w, h) =>
  R.pipe(parseText, R.split(''), R.map(parseDecimal), R.splitEvery(w * h))

const part1 = R.pipe(
  parseLayers(W, H),
  R.map(R.countBy(R.identity)),
  (x) => x.reduce(R.minBy(R.prop(0))),
  (count) => count[1] * count[2],
)

const part2Result = R.pipe(
  R.transpose,
  R.map(R.find(R.complement(R.equals(image.COLORS.TRANSPARENT)))),
  R.join(''),
)

const part2 = R.pipe(
  parseLayers(W, H),
  part2Result,
  R.splitEvery(W),
  image.paint,
)

module.exports = {
  parseLayers,
  part2Result,
  part1,
  part2,
}
