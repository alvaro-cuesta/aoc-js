const R = require('ramda')
const { parseText } = require('../utils')

const W = 25
const H = 6
const TRANSPARENT = '2'

const parseLayers = (w, h) =>
  R.pipe(parseText, R.split(''), R.splitEvery(w * h))

const part1 = R.pipe(
  parseLayers(W, H),
  R.map(R.countBy(R.identity)),
  (x) => x.reduce(R.minBy(R.prop(0))),
  (count) => count[1] * count[2],
)

const part2Result = R.pipe(
  R.transpose,
  R.map(R.find(R.complement(R.equals(TRANSPARENT)))),
  R.join(''),
)
const paintImage = R.pipe(
  R.map((x) => (x === '1' ? '#' : ' ')),
  R.splitEvery(W),
  R.map(R.join('')),
  R.prepend(''),
  R.join('\n'),
)

const part2 = R.pipe(parseLayers(W, H), part2Result, paintImage)

module.exports = {
  parseLayers,
  part2Result,
  part1,
  part2,
}
