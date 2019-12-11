const R = require('ramda')
const intcode = require('./intcode')
const image = require('./image')
const { parseDecimal } = require('../utils')

const BLACK = 0
const WHITE = 1

const getHullColor = (hull, [x, y]) => (!hull[x] || !hull[x][y] ? BLACK : WHITE)

const setHullColor = (hull, [x, y], color) => {
  if (!hull[x]) {
    hull[x] = {}
  }

  hull[x][y] = color
}

const cw = (dir) => {
  if (R.equals(dir, [0, -1])) return [1, 0]
  if (R.equals(dir, [1, 0])) return [0, 1]
  if (R.equals(dir, [0, 1])) return [-1, 0]
  if (R.equals(dir, [-1, 0])) return [0, -1]
  throw new Error(`Unknown dir ${dir}`)
}

const ccw = (dir) => {
  if (R.equals(dir, [0, -1])) return [-1, 0]
  if (R.equals(dir, [-1, 0])) return [0, 1]
  if (R.equals(dir, [0, 1])) return [1, 0]
  if (R.equals(dir, [1, 0])) return [0, -1]
  throw new Error(`Unknown dir ${dir}`)
}

const v2add = ([xa, ya], [xb, yb]) => [xa + xb, ya + yb]

const paintHull = R.curry((initialColor, thread) => {
  const hull = { 0: { 0: initialColor } }
  let pos = [0, 0]
  let dir = [0, -1]

  const hullIt = (function*() {
    for (;;) {
      yield getHullColor(hull, pos)
    }
  })()

  const brain = intcode.iteratorExecutor(hullIt, thread)

  for (;;) {
    {
      const { value: color, done } = brain.next()

      if (done) {
        return hull
      }

      setHullColor(hull, pos, color)
    }

    {
      const { value: rotation, done } = brain.next()

      if (done) {
        throw new Error('Expected rotation')
      }

      dir = rotation === 1 ? cw(dir) : ccw(dir)
      pos = v2add(pos, dir)
    }
  }
})

const part1 = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  paintHull(BLACK),
  R.map(R.pipe(R.keys, R.length)),
  R.values,
  R.sum,
)

const hullToImage = (hull) => {
  const xs = R.pipe(Object.keys, R.map(parseDecimal))(hull)
  const ys = R.pipe(
    Object.values,
    R.chain(R.pipe(Object.keys, R.map(parseDecimal))),
  )(hull)

  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)

  const w = 1 + maxX - minX
  const h = 1 + maxY - minY

  return Array(w)
    .fill()
    .map((_, x) =>
      Array(h)
        .fill()
        .map((_, y) => getHullColor(hull, [x + minX, y + minY])),
    )
}

const part2 = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  paintHull(WHITE),
  hullToImage,
  R.transpose,
  image.paint,
)

module.exports = {
  part1,
  part2,
}
