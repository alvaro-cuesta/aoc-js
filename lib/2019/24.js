const R = require('ramda')
const { parseLines } = require('../utils')

const parseInput = R.pipe(parseLines, R.map(R.split('')))

const TILES = {
  BUG: '#',
  EMPTY: '.',
}

const getAdjacent = (x, y) => [
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
  [x - 1, y],
]

const discardEmpty = R.curry(
  (grid, [x, y]) =>
    grid[y] !== undefined &&
    grid[y][x] !== undefined &&
    grid[y][x] !== TILES.EMPTY,
)

const countBugs = R.curry((grid, x, y) =>
  R.pipe(getAdjacent, R.filter(discardEmpty(grid)), R.length)(x, y),
)

const LIVE_COUNT = [1]
const INFEST_COUNT = [1, 2]

const step = (grid) =>
  grid.map((row, y) =>
    row.map((cell, x) => {
      const count = countBugs(grid, x, y)

      return cell === TILES.BUG
        ? LIVE_COUNT.includes(count)
          ? TILES.BUG
          : TILES.EMPTY
        : cell === TILES.EMPTY
        ? INFEST_COUNT.includes(count)
          ? TILES.BUG
          : TILES.EMPTY
        : cell
    }),
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

const getAdjacentRecursive = (l, x, y) =>
  R.pipe(
    getAdjacent,
    R.chain((pos) => {
      if (R.equals(pos, [2, 2])) {
        if (x === 1 && y === 2) {
          return R.range(0, 5).map((y) => [l + 1, 0, y])
        } else if (x === 3 && y === 2) {
          return R.range(0, 5).map((y) => [l + 1, 4, y])
        } else if (x === 2 && y === 1) {
          return R.range(0, 5).map((x) => [l + 1, x, 0])
        } else if (x === 2 && y === 3) {
          return R.range(0, 5).map((x) => [l + 1, x, 4])
        } else {
          throw new Error('Unreachable')
        }
      } else if (pos[0] === -1) {
        return [[l - 1, 1, 2]]
      } else if (pos[0] === 5) {
        return [[l - 1, 3, 2]]
      } else if (pos[1] === -1) {
        return [[l - 1, 2, 1]]
      } else if (pos[1] === 5) {
        return [[l - 1, 2, 3]]
      } else {
        return [[l, ...pos]]
      }
    }),
  )(x, y)

const discardEmptyRecursive = R.curry(
  (grid, [l, x, y]) =>
    (x !== 2 || y !== 2) &&
    grid[l] !== undefined &&
    grid[l][y] !== undefined &&
    grid[l][y][x] !== undefined &&
    grid[l][y][x] !== TILES.EMPTY,
)

const countBugsRecursive = R.curry((grid, l, x, y) =>
  R.pipe(getAdjacentRecursive, R.filter(discardEmptyRecursive(grid)), R.length)(
    l,
    x,
    y,
  ),
)

const countGridBugs = R.pipe(
  R.map(R.pipe(R.filter(R.equals(TILES.BUG)), R.length)),
  R.sum,
)

const countGridBugsRecursive = R.pipe(R.map(countGridBugs), R.sum)

const EMPTY_GRID = [
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.'],
]

const stepRecursive = (grid) => {
  if (countGridBugs(grid[0]) > 0) {
    grid = [EMPTY_GRID, ...grid]
  }

  if (countGridBugs(grid[grid.length - 1]) > 0) {
    grid = [...grid, EMPTY_GRID]
  }

  return grid.map((level, l) =>
    level.map((row, y) =>
      row.map((cell, x) => {
        if (x === 2 && y === 2) {
          return TILES.EMPTY
        }

        const count = countBugsRecursive(grid, l, x, y)

        return cell === TILES.BUG
          ? LIVE_COUNT.includes(count)
            ? TILES.BUG
            : TILES.EMPTY
          : cell === TILES.EMPTY
          ? INFEST_COUNT.includes(count)
            ? TILES.BUG
            : TILES.EMPTY
          : cell
      }),
    ),
  )
}

const part2 = (input) => {
  let grid = [parseInput(input)]

  for (let i = 0; i < 200; i++) {
    grid = stepRecursive(grid)
  }

  return countGridBugsRecursive(grid)
}

module.exports = {
  parseInput,
  step,
  getBiodiversity,
  stepRecursive,
  countGridBugsRecursive,
  part1,
  part2,
}
