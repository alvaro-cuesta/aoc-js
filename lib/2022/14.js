const R = require('ramda')
const { parseLines, parseDecimal, iterateStraightLines } = require('../utils')
const vec = require('../vec')

const parseInput = R.pipe(
  parseLines,
  R.map(
    R.pipe(
      R.split('\n'),
      R.chain(
        R.pipe(
          R.split(' -> '),
          R.map(R.pipe(R.split(','), R.map(parseDecimal))),
        ),
      ),
    ),
  ),
)

const boardFromInput = R.converge(
  R.reduce((acc, row) => {
    for (const [from, to] of R.aperture(2, row)) {
      for (const pos of iterateStraightLines(from, to)) {
        acc[vec.key(pos)] = '#'
      }
    }

    return acc
  }),
  [R.empty, R.identity],
)

const maxHeightInInput = R.reduce(
  (acc, row) => R.max(acc, R.reduce(R.max, -Infinity, R.map(R.last, row))),
  -Infinity,
)

const moveSand = (board, pos, solidFloorHeight) => {
  if (solidFloorHeight && pos[1] === solidFloorHeight - 1) {
    return pos
  }

  const posKey = vec.key(pos)

  if (board[posKey] !== 'o') {
    throw new Error('Expected sand')
  }

  const [x, y] = pos

  const downKey = vec.keyArgs(x, y + 1)
  if (!board[downKey]) {
    board[posKey] = undefined
    board[downKey] = 'o'
    return [x, y + 1]
  }

  const downLeftKey = vec.keyArgs(x - 1, y + 1)
  if (!board[downLeftKey]) {
    board[posKey] = undefined
    board[downLeftKey] = 'o'
    return [x - 1, y + 1]
  }

  const downRightKey = vec.keyArgs(x + 1, y + 1)
  if (!board[downRightKey]) {
    board[posKey] = undefined
    board[downRightKey] = 'o'
    return [x + 1, y + 1]
  }

  return false
}

const SAND_SPAWN = [500, 0]

const spawnAndMoveUntilRestOrReachStart = (board, floorHeight, solidFloor) => {
  let pos = SAND_SPAWN

  if (board[vec.key(pos)]) {
    throw new Error('Trying to spawn in an occupied place')
  }

  board[vec.key(pos)] = 'o'

  for (let i = 0; i < floorHeight; i++) {
    const maybeNewPos = moveSand(board, pos, solidFloor ? floorHeight : false)

    if (maybeNewPos) {
      if (R.equals(maybeNewPos, SAND_SPAWN)) {
        return SAND_SPAWN
      }

      pos = maybeNewPos
    } else {
      return pos
    }
  }

  return false
}

const iterateUntilNoRest = (board, maxHeightInInput) => {
  for (let i = 0; ; i++) {
    const didItRest = spawnAndMoveUntilRestOrReachStart(
      board,
      maxHeightInInput + 2,
      false,
    )

    if (!didItRest) {
      return i
    }
  }
}

const iterateUntilRestInSpawn = (board, maxHeightInInput) => {
  for (let i = 0; ; i++) {
    const restPosition = spawnAndMoveUntilRestOrReachStart(
      board,
      maxHeightInInput + 2,
      true,
    )

    if (R.equals(restPosition, SAND_SPAWN)) {
      return i + 1
    }
  }
}

const part1 = R.pipe(
  parseInput,
  R.converge(iterateUntilNoRest, [boardFromInput, maxHeightInInput]),
)

const part2 = R.pipe(
  parseInput,
  R.converge(iterateUntilRestInSpawn, [boardFromInput, maxHeightInInput]),
)

module.exports = {
  part1,
  part2,
}
