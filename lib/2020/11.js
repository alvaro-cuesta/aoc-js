const CELLS = {
  FLOOR: '.',
  EMPTY: 'L',
  OCCUPIED: '#',
}

const parseBoard = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(''))

const occupiedAdjacent = (board, x, y) => {
  let occupied = 0

  for (let dy = -1; dy <= +1; dy++) {
    for (let dx = -1; dx <= +1; dx++) {
      const xx = x + dx,
        yy = y + dy

      if (
        (dx === 0 && dy === 0) ||
        xx < 0 ||
        yy < 0 ||
        yy >= board.length ||
        xx >= board[yy].length
      ) {
        continue
      }

      if (board[yy][xx] === CELLS.OCCUPIED) {
        occupied++
      }
    }
  }

  return occupied
}

const step = (board, getOccupiedNeighbors, leaveThreshold) => {
  let hasChanged

  const newBoard = board.map((row, y) =>
    row.map((cell, x) => {
      const alive = getOccupiedNeighbors(board, x, y)

      if (cell === CELLS.EMPTY && alive === 0) {
        hasChanged = true
        return CELLS.OCCUPIED
      } else if (cell === CELLS.OCCUPIED && alive >= leaveThreshold) {
        hasChanged = true
        return CELLS.EMPTY
      }

      return cell
    }),
  )

  return [newBoard, hasChanged]
}

const countOccupied = (board) =>
  board.reduce(
    (acc, row) =>
      acc +
      row.reduce((acc, cell) => acc + (cell === CELLS.OCCUPIED ? 1 : 0), 0),
    0,
  )

const makeSolver = (getOccupiedNeighbors, leaveThreshold) => (input) => {
  let board = parseBoard(input),
    hasChanged = true

  while (hasChanged) {
    ;[board, hasChanged] = step(board, getOccupiedNeighbors, leaveThreshold)
  }

  return countOccupied(board)
}

const part1 = makeSolver(occupiedAdjacent, 4)

const occupiedVisible = (board, x, y) => {
  let occupied = 0

  for (let dy = -1; dy <= +1; dy++) {
    for (let dx = -1; dx <= +1; dx++) {
      if (dx === 0 && dy === 0) continue

      for (
        let xx = x + dx, yy = y + dy;
        xx >= 0 && yy >= 0 && yy < board.length && xx < board[yy].length;
        xx += dx, yy += dy
      ) {
        if (board[yy][xx] === CELLS.OCCUPIED) {
          occupied++
          break
        } else if (board[yy][xx] === CELLS.EMPTY) {
          break
        }
      }
    }
  }

  return occupied
}

const part2 = makeSolver(occupiedVisible, 5)

module.exports = {
  part1,
  part2,
}
