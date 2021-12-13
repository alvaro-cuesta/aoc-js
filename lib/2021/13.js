const { parseDecimal } = require('../utils')

const parseInput = (input) => {
  const [pointLines, foldLines] = input.trim().split('\n\n')

  const points = pointLines
    .split('\n')
    .map((line) => line.split(',').map(parseDecimal))

  const folds = foldLines.split('\n').map((line) => {
    const [axis, pos] = line.slice(11).split('=')

    return { axis, pos: parseDecimal(pos) }
  })

  const maxX = points.reduce((max, [x, _]) => (x > max ? x : max), -Infinity)
  const maxY = points.reduce((max, [_, y]) => (y > max ? y : max), -Infinity)

  const board = Array(maxY + 1)
    .fill()
    .map(() =>
      Array(maxX + 1)
        .fill()
        .map(() => false),
    )

  for (const [x, y] of points) {
    board[y][x] = true
  }

  return { board, folds }
}

const foldX = (board, x) =>
  board.map((row, by) =>
    row.slice(0, x).map((cell, bx) => cell || board[by]?.[2 * x - bx]),
  )

const foldY = (board, y) =>
  board
    .slice(0, y)
    .map((row, by) => row.map((cell, bx) => cell || board[2 * y - by]?.[bx]))

const applyFold = (board, { axis, pos }) => {
  switch (axis) {
    case 'x':
      return foldX(board, pos)
    case 'y':
      return foldY(board, pos)
    default:
      throw new Error(`Unknown axis ${axis}`)
  }
}

const part1 = (input) => {
  const { board, folds } = parseInput(input)

  return applyFold(board, folds[0]).reduce(
    (total, row) =>
      total + row.reduce((total, cell) => total + (cell ? 1 : 0), 0),
    0,
  )
}

const printBoard = (board) =>
  board.map((row) => row.map((cell) => (cell ? '#' : ' ')).join('')).join('\n')

const part2 = (input) => {
  const { board, folds } = parseInput(input)

  const folded = folds.reduce(applyFold, board)

  return '\n' + printBoard(folded)
}

module.exports = {
  part1,
  part2,
}
