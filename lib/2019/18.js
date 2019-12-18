const R = require('ramda')
const { parseLines } = require('../utils')

const parseInput = R.pipe(parseLines, R.map(R.split('')))

const getPlayer = (maze) => {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === '@') {
        return { x, y }
      }
    }
  }

  throw new Error('Player not found')
}

const getCellKey = ({ x, y }) => `(${x},${y})`

const bfs = (board, start, keys) => {
  let candidates = [{ ...start, steps: 0 }],
    visited = {},
    keysTaken = []

  while (candidates.length > 0) {
    const candidate = candidates.splice(0, 1)[0]
    const { x, y, steps } = candidate
    const candidateKey = getCellKey(candidate)

    // Cell was already visited
    if (visited[candidateKey]) {
      continue
    }

    const cell = board[y][x]

    visited[candidateKey] = candidate

    // Cell is a new key, add to map and continue in other paths
    if (/[a-z]/.test(cell) && !keys.includes(cell)) {
      keysTaken.push({ ...candidate, key: cell })
      continue
    }

    // Cell is open, add neighbors to candidates
    candidates.push(
      ...[
        { x: x - 1, y, steps: steps + 1 },
        { x: x + 1, y, steps: steps + 1 },
        { x, y: y - 1, steps: steps + 1 },
        { x, y: y + 1, steps: steps + 1 },
      ].filter(({ x, y }) => {
        const cell = board[y][x]

        return (
          cell !== '#' &&
          (!/[A-Z]/.test(cell) || keys.includes(cell.toLowerCase()))
        )
      }),
    )
  }

  return keysTaken
}

const bfsMultiple = (board, starts, keys) =>
  R.addIndex(R.chain)(
    (start, i) =>
      R.pipe(
        bfs,
        R.map((candidate) => ({ ...candidate, i })),
      )(board, start, keys),
    starts,
  )

const solve = (board, starts, keys = '', visited = {}) => {
  const key = `${starts.map(getCellKey).join('')}${keys}`

  if (visited[key] !== undefined) {
    return visited[key]
  }

  const newKeys = bfsMultiple(board, starts, keys)

  visited[key] =
    newKeys.length === 0
      ? 0
      : R.pipe(
          R.map(({ key, steps, x, y, i }) => {
            const newStarts = [...starts]
            newStarts[i] = { x, y }

            const newKeys = (keys + key)
              .split('')
              .sort()
              .join('')

            return steps + solve(board, newStarts, newKeys, visited)
          }),
          R.apply(Math.min),
        )(newKeys)

  return visited[key]
}

const part1 = (input) => {
  const maze = parseInput(input)
  const player = getPlayer(maze)

  return solve(maze, [player])
}

const part2 = (input) => {
  const maze = parseInput(input)
  const { x, y } = getPlayer(maze)

  maze[y - 1][x - 1] = '@'
  maze[y + 1][x - 1] = '@'
  maze[y + 1][x + 1] = '@'
  maze[y - 1][x + 1] = '@'
  maze[y - 1][x] = '#'
  maze[y + 1][x] = '#'
  maze[y][x - 1] = '#'
  maze[y][x + 1] = '#'
  maze[y][x] = '#'

  return solve(maze, [
    {
      x: x - 1,
      y: y - 1,
    },
    {
      x: x - 1,
      y: y + 1,
    },
    {
      x: x + 1,
      y: y - 1,
    },
    {
      x: x + 1,
      y: y + 1,
    },
  ])
}

module.exports = {
  part1,
  part2,
}
