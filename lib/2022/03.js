const R = require('ramda')
const { parseLines, reduceAssumeInitial } = require('../utils')

const halfLength = R.pipe(R.length, R.flip(R.divide)(2))

const splitAtHalf = R.converge(R.splitAt, [halfLength, R.identity])

const getPriority = (element) =>
  element.charCodeAt(0) +
  (element >= 'a' && element <= 'z'
    ? 1 - 'a'.charCodeAt(0)
    : 27 - 'A'.charCodeAt(0))

const part1 = R.pipe(
  parseLines,
  R.chain(R.pipe(splitAtHalf, R.apply(R.intersection))),
  R.map(getPriority),
  R.sum,
)

const part2 = R.pipe(
  parseLines,
  R.splitEvery(3),
  R.chain(reduceAssumeInitial(R.intersection)),
  R.map(getPriority),
  R.sum,
)

module.exports = {
  part1,
  part2,
}
