const R = require('ramda')

const getBoardScore = (board, drawn) =>
  board
    .flat()
    .filter((n) => !drawn.includes(n))
    .reduce((a, b) => a + b, 0) * drawn[drawn.length - 1]

const isWinner = (board, drawn) => {
  if (board.some((line) => line.every((n) => drawn.includes(n)))) {
    return true
  }

  const transposed = R.transpose(board)

  if (transposed.some((column) => column.every((n) => drawn.includes(n)))) {
    return true
  }

  return false
}

const parseInput = (input) => {
  const [drawsData, ...boardsData] = input.trim().split('\n\n')

  const draws = drawsData.split(',').map((x) => parseInt(x, 10))
  const boards = boardsData.map((board) =>
    board.split('\n').map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((x) => parseInt(x, 10)),
    ),
  )

  return { draws, boards }
}

const part1 = (input) => {
  const { draws, boards } = parseInput(input)

  for (let i = 1; i <= draws.length; i++) {
    const drawn = draws.slice(0, i)
    const winner = boards.find((board) => isWinner(board, drawn))

    if (winner) {
      return getBoardScore(winner, drawn)
    }
  }
}

const part2 = (input) => {
  let { draws, boards } = parseInput(input)

  for (let i = 1; i <= draws.length && boards.length > 0; i++) {
    const drawn = draws.slice(0, i)

    if (boards.length > 1) {
      boards = boards.filter((board) => !isWinner(board, drawn))
    } else if (isWinner(boards[0], drawn)) {
      return getBoardScore(boards[0], drawn)
    }
  }
}

module.exports = {
  part1,
  part2,
}
