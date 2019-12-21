const R = require('ramda')
const { parseLines } = require('../utils')

const getCellKey = ({ x, y }) => `(${x},${y})`

const TILES = {
  WALL: '#',
  FLOOR: '.',
  EMPTY: ' ',
}

const isMazeTile = (tile) => tile === TILES.WALL || tile === TILES.FLOOR

const isGridTile = (tile) =>
  isMazeTile(tile || TILES.EMPTY) || tile === TILES.EMPTY

const isPortal = (tile) => !isGridTile(tile)

const mutablyParsePortals = (grid) => {
  let portalPositions = {}

  for (let y = 0; y < grid.length; y++) {
    const rowUp = grid[y - 1] || []
    const row = grid[y]
    const rowDown = grid[y + 1] || []
    const rowDown2 = grid[y + 2] || []

    for (let x = 0; x < row.length; x++) {
      if (!isPortal(row[x])) {
        continue
      }

      let totalPortal, portalPosition

      if (isPortal(rowDown[x])) {
        totalPortal = `${row[x]}${rowDown[x]}`

        if (isMazeTile(rowUp[x])) {
          portalPosition = { x, y: y - 1 }
        } else if (isMazeTile(rowDown2[x])) {
          portalPosition = { x, y: y + 2 }
        } else {
          throw new Error(`Unreachable vertical ${x}, ${y}`)
        }

        row[x] = TILES.EMPTY
        rowDown[x] = TILES.EMPTY
      } else if (isPortal(row[x + 1])) {
        totalPortal = `${row[x]}${row[x + 1]}`

        if (isMazeTile(row[x - 1])) {
          portalPosition = { x: x - 1, y }
        } else if (isMazeTile(row[x + 2])) {
          portalPosition = { x: x + 2, y }
        } else {
          throw new Error(`Unreachable horizontal ${x}, ${y}`)
        }

        row[x] = TILES.EMPTY
        row[x + 1] = TILES.EMPTY
      } else {
        continue
      }

      grid[portalPosition.y][portalPosition.x] = totalPortal
      portalPositions[totalPortal] = [
        ...(portalPositions[totalPortal] || []),
        portalPosition,
      ]
    }
  }

  return { grid, portalPositions }
}

const parseGrid = R.pipe(parseLines, R.map(R.split('')), mutablyParsePortals)

const bfs = (board, portalPositions, start, end) => {
  let candidates = [{ ...start, steps: 0 }],
    visited = {}

  while (candidates.length > 0) {
    const candidate = candidates.splice(0, 1)[0]
    const { x, y, steps } = candidate
    const candidateKey = getCellKey(candidate)

    if (visited[candidateKey]) {
      continue
    }

    const tile = board[y][x]

    if (tile === end) {
      return candidate.steps
    }

    visited[candidateKey] = candidate

    candidates.push(
      ...[
        { x: x - 1, y, steps: steps + 1 },
        { x: x + 1, y, steps: steps + 1 },
        { x, y: y - 1, steps: steps + 1 },
        { x, y: y + 1, steps: steps + 1 },
      ]
        .map((pos) => {
          const tile = board[pos.y][pos.x]

          if (isPortal(tile) && portalPositions[tile].length === 2) {
            const newPosition = portalPositions[tile].filter(
              (pos2) => pos.x !== pos2.x && pos.y !== pos2.y,
            )[0]

            return { ...newPosition, steps: pos.steps + 1 }
          }

          return pos
        })
        .filter(({ x, y }) => {
          const tile = board[y][x]

          return tile !== TILES.WALL && tile !== TILES.EMPTY
        }),
    )
  }

  throw new Error('Not reached')
}

const part1 = (input) => {
  const { grid, portalPositions } = parseGrid(input)

  return bfs(grid, portalPositions, portalPositions.AA[0], 'ZZ')
}

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
