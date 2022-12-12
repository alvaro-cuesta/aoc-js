const R = require('ramda')
const { parseBoard, getAdjacent4 } = require('../utils')
const { key: getKey } = require('../vec')

const bfs = (getNodeKey, initialNode, isEndNode, getNeighbors) => {
  const queue = []

  const initialKey = getNodeKey(initialNode)

  const explored = { [initialKey]: true }
  const parents = { [initialKey]: null }
  const steps = { [initialKey]: 0 }

  queue.push(initialNode)

  while (queue.length > 0) {
    const current = queue.shift()

    if (isEndNode(current)) {
      return { current, explored, parents, steps }
    }

    const currentKey = getNodeKey(current)

    for (const neighbor of getNeighbors(current)) {
      const neighborKey = getNodeKey(neighbor)

      if (explored[neighborKey]) {
        continue
      }

      explored[neighborKey] = true
      parents[neighborKey] = currentKey
      steps[neighborKey] = steps[currentKey] + 1

      queue.push(neighbor)
    }
  }

  throw new Error('Could not reach the end')
}

const getBoardMetadata = (board) => {
  const elevations = []
  const as = []
  let s
  let e

  for (let y = 0; y < board.length; y++) {
    const row = []

    for (let x = 0; x < board[y].length; x++) {
      const cell = board[y][x]

      let elevation

      if (cell === 'S') {
        s = [y, x]
        elevation = 'a'.charCodeAt(0)
      } else if (cell === 'E') {
        e = [y, x]
        elevation = 'z'.charCodeAt(0)
      } else if (cell === 'a') {
        as.push([y, x])
        elevation = cell.charCodeAt(0)
      } else {
        elevation = cell.charCodeAt(0)
      }

      row.push(elevation)
    }

    elevations.push(row)
  }

  return { elevations, as, s, e }
}

const makeGetNeighbors = (elevations) => (node) => {
  const elevation = elevations[node[0]][node[1]]

  return getAdjacent4(node).filter(([ny, nx]) => {
    const nElevation = elevations[ny]?.[nx]

    return nElevation !== undefined && nElevation <= elevation + 1
  })
}

const part1 = (input) => {
  const board = parseBoard(input)
  const { elevations, s, e } = getBoardMetadata(board)

  const endKey = getKey(e)

  const result = bfs(
    getKey,
    s,
    (node) => getKey(node) === endKey,
    makeGetNeighbors(elevations),
  )

  return result.steps[endKey]
}

const part2 = (input) => {
  const board = parseBoard(input)
  const { elevations, as, e } = getBoardMetadata(board)

  const endKey = getKey(e)

  const results = as.map((s) => {
    try {
      const result = bfs(
        getKey,
        s,
        (node) => getKey(node) === endKey,
        makeGetNeighbors(elevations),
      )

      return result.steps[endKey]
    } catch (e) {
      if (e.message === 'Could not reach the end') {
        return +Infinity
      }

      throw e
    }
  })

  return R.reduce(R.min, +Infinity, results)
}

module.exports = {
  part1,
  part2,
}
