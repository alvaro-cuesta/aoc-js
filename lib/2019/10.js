const R = require('ramda')
const { parseLines } = require('../utils')

const BET_ASTEROID_NTH = 200

const parseMap = R.pipe(
  parseLines,
  R.addIndex(R.chain)((row, y) =>
    R.pipe(
      R.split(''),
      R.addIndex(R.map)((e, x) => ({ e, x, y })),
      R.filter(R.propEq('e', '#')),
      R.map(R.omit(['e'])),
    )(row),
  ),
)

const findBestLocationVisibleByAngle = (asteroids) =>
  R.pipe(
    R.addIndex(R.map)(({ x, y }, i) =>
      R.pipe(
        R.remove(i, 1),
        R.map(({ x: ox, y: oy }) => {
          const dx = ox - x
          const dy = oy - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const angle = Math.PI - Math.atan2(dx, dy)

          return { x, y, ox, oy, distance, angle }
        }),
        R.groupBy(R.prop('angle')),
      )(asteroids),
    ),
    (x) => x.reduce(R.maxBy(R.pipe(R.keys, R.length))),
  )(asteroids)

const part1 = R.pipe(parseMap, findBestLocationVisibleByAngle, R.keys, R.length)

const part2 = R.pipe(
  parseMap,
  findBestLocationVisibleByAngle,
  R.toPairs,
  R.sort(R.ascend(R.nth(0))),
  R.map(R.pipe(R.nth(1), R.sort(R.ascend(R.prop('distance'))))),
  R.transpose,
  R.flatten,
  R.nth(BET_ASTEROID_NTH - 1),
  ({ ox, oy }) => ox * 100 + oy,
)

module.exports = {
  part1,
  part2,
}
