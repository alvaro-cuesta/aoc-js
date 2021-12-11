const R = require('ramda')
const { parseBoard, getAdjacent4, parseDecimal } = require('../utils')

const getLowPoints = (board) =>
  board.flatMap((row, y) =>
    row
      .map((h, x) => ({ h, x, y }))
      .filter(({ h, x }) => {
        const adjacent = getAdjacent4([x, y])
          .map(([x, y]) => board[y]?.[x])
          .filter((x) => x !== undefined)

        return adjacent.every((aHeight) => aHeight > h)
      }),
  )

const part1 = (input) => {
  const board = parseBoard(input).map((row) => row.map(parseDecimal))
  const lowPoints = getLowPoints(board)

  return R.sum(lowPoints.map(({ h }) => h + 1))
}

const visitedKey = ([x, y]) => `${x}-${y}`

const getBasin = (
  board,
  remaining,
  visited = remaining.map(visitedKey),
  inBasin = [],
) => {
  if (remaining.length === 0) {
    return inBasin
  }

  const current = remaining[0]

  const adjacentInBasin = getAdjacent4(current).filter(
    ([x, y]) =>
      !visited.includes(visitedKey([x, y])) &&
      board[y]?.[x] !== undefined &&
      board[y][x] < 9,
  )

  return getBasin(
    board,
    [...remaining.slice(1), ...adjacentInBasin],
    [...visited, ...adjacentInBasin.map(visitedKey)],
    [...inBasin, current],
  )
}

const part2 = (input) => {
  const board = parseBoard(input).map((row) => row.map(parseDecimal))

  return R.pipe(
    getLowPoints,
    R.map(({ x, y }) => getBasin(board, [[x, y]]).length),
    R.sort(R.descend(R.identity)),
    R.take(3),
    R.product,
  )(board)
}

module.exports = {
  part1,
  part2,
}
