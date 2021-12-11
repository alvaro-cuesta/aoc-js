const R = require('ramda')
const { parseBoard, mapBoard } = require('../utils')

const energize = ([x, y], board) => {
  const cell = board[y]?.[x]

  if (cell === undefined) {
    return board
  }

  cell.energy += 1

  if (cell.energy > 9 && !cell.flashed) {
    cell.flashed = true

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx !== 0 || dy !== 0) {
          energize([x + dx, y + dy], board)
        }
      }
    }
  }

  return board
}

const step = (board) => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x]
      cell.flashed = false
    }
  }

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      energize([x, y], board)
    }
  }

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x]

      if (cell.flashed) {
        cell.energy = 0
      }
    }
  }

  return board
}

const parseOctopi = R.pipe(
  parseBoard,
  mapBoard((cell) => ({ energy: parseInt(cell, 10), flashed: false })),
)

const part1 = (input) => {
  const board = parseOctopi(input)

  let count = 0

  for (let i = 0; i < 100; i++) {
    step(board)

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x].flashed) {
          count++
        }
      }
    }
  }

  return count
}

const part2 = (input) => {
  const board = parseOctopi(input)

  for (let i = 0; ; i++) {
    step(board)

    let count = 0
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x].flashed) {
          count++
        }
      }
    }

    if (count === 100) {
      return i + 1
    }
  }
}

module.exports = {
  part1,
  part2,
}
