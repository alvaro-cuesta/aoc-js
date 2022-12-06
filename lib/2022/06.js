const R = require('ramda')
const { parseText } = require('../utils')

const makeMarkerFinder = (length) =>
  R.pipe(
    parseText,
    R.aperture(length),
    R.findIndex(R.pipe(R.countBy(R.identity), R.values, R.all(R.equals(1)))),
    R.add(length),
  )

const part1 = makeMarkerFinder(4)

const part2 = makeMarkerFinder(14)

module.exports = {
  part1,
  part2,
}
