const R = require('ramda')
const { parseLines } = require('../utils')

const parseInput = R.pipe(parseLines, R.map(R.split('')))

const TILES = {
  BUG: '#',
  EMPTY: '.',
}

const countBugs = (grid, x, y) =>
  [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ].filter(
    ([x, y]) =>
      grid[y] !== undefined &&
      grid[y][x] !== undefined &&
      grid[y][x] !== TILES.EMPTY,
  ).length

const LIVE_COUNT = [1]
const INFEST_COUNT = [1, 2]

const step = (grid) =>
  grid.map((row, y) =>
    row.map((cell, x) =>
      cell === TILES.BUG
        ? LIVE_COUNT.includes(countBugs(grid, x, y))
          ? TILES.BUG
          : TILES.EMPTY
        : cell === TILES.EMPTY
        ? INFEST_COUNT.includes(countBugs(grid, x, y))
          ? TILES.BUG
          : TILES.EMPTY
        : cell,
    ),
  )

const getBiodiversity = (grid) =>
  R.pipe(
    R.map(R.join('')),
    R.join(''),
    R.addIndex(R.map)((cell, i) => (cell === TILES.BUG ? 1 << i : 0)),
    R.sum,
  )(grid)

const part1 = (input) => {
  let grid = parseInput(input)

  const cache = {
    [getBiodiversity(grid)]: true,
  }

  for (;;) {
    grid = step(grid)

    const biodiversity = getBiodiversity(grid)

    if (cache[biodiversity]) {
      return biodiversity
    }

    cache[biodiversity] = true
  }
}

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  parseInput,
  step,
  getBiodiversity,
  part1,
  part2,
}
