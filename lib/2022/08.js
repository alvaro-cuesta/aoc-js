const R = require('ramda')
const { parseBoard } = require('../utils')

const isVisibleDir = R.curry(([xf, yf], grid, [x, y]) => {
  for (let i = 1; ; i++) {
    const currentHeight = grid[y + i * yf]?.[x + i * xf]

    if (currentHeight === undefined) {
      return true
    }

    if (currentHeight >= grid[y][x]) {
      return false
    }
  }
})

const isVisible = R.anyPass([
  isVisibleDir([0, 1]),
  isVisibleDir([0, -1]),
  isVisibleDir([1, 0]),
  isVisibleDir([-1, 0]),
])

const part1 = (input) => {
  const grid = parseBoard(input)

  return R.pipe(
    R.converge(R.xprod, [
      R.pipe(R.prop(0), R.length, R.range(0)),
      R.pipe(R.length, R.range(0)),
    ]),
    R.filter(isVisible(grid)),
    R.length,
  )(grid)
}

const getViewDistance = R.curry(([xf, yf], grid, [x, y]) => {
  for (let i = 1; ; i++) {
    const currentHeight = grid[y + yf * i]?.[x + xf * i]

    if (currentHeight === undefined) {
      return i - 1
    }

    if (currentHeight >= grid[y][x]) {
      return i
    }
  }
})

const getScenicScore = R.curryN(
  2,
  R.converge(R.unapply(R.reduce(R.multiply, 1)), [
    getViewDistance([0, 1]),
    getViewDistance([0, -1]),
    getViewDistance([1, 0]),
    getViewDistance([-1, 0]),
  ]),
)

const part2 = (input) => {
  const grid = parseBoard(input)

  return R.pipe(
    R.converge(R.xprod, [
      R.pipe(R.prop(0), R.pipe(R.length, R.flip(R.subtract)(1)), R.range(1)),
      R.pipe(R.pipe(R.length, R.flip(R.subtract)(1)), R.range(1)),
    ]),
    R.reduce(R.useWith(R.max, [R.identity, getScenicScore(grid)]), -Infinity),
  )(grid)
}

module.exports = {
  part1,
  part2,
}
