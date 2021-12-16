const { parseBoard, parseDecimal } = require('../utils')
const vec = require('../vec')
const PriorityQueue = require('../PriorityQueue')

const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
]

const dijkstra = (board, from, to) => {
  const nodes = {}

  let queue = new PriorityQueue((a, b) => a[0] < b[0])

  for (const [y, row] of board.entries()) {
    for (const [x, cost] of row.entries()) {
      const key = vec.key([x, y])

      const dist = x === from[0] && y === from[1] ? 0 : +Infinity

      nodes[key] = {
        dist,
        prev: undefined,
        cost,
        visited: false,
      }

      queue.push([dist, [x, y]])
    }
  }

  const toNode = nodes[vec.key(to)]

  while (queue.size() > 0) {
    const min = queue.pop()[1]

    const currentNode = nodes[vec.key(min)]

    currentNode.visited = true

    if (currentNode === toNode) {
      return toNode.dist
    }

    const neighbors = DIRECTIONS.map((dir) => vec.add(min, dir))

    for (const neighbor of neighbors) {
      const neighborNode = nodes[vec.key(neighbor)]

      if (neighborNode === undefined || neighborNode.visited) {
        continue
      }

      const dist = currentNode.dist + neighborNode.cost

      if (dist < neighborNode.dist) {
        neighborNode.dist = dist
        neighborNode.prev = min

        queue.push([neighborNode.dist, neighbor])
      }
    }
  }

  throw new Error('Did not reach destination')
}

const part1 = (input) => {
  const board = parseBoard(input).map((line) =>
    line.map((cell) => parseDecimal(cell)),
  )

  return dijkstra(board, [0, 0], [board[0].length - 1, board.length - 1])
}

const addWithWrap = (a) => (b) => ((b - 1 + a) % 9) + 1

const extendLineRight = (line) => [
  ...line,
  ...line.map(addWithWrap(1)),
  ...line.map(addWithWrap(2)),
  ...line.map(addWithWrap(3)),
  ...line.map(addWithWrap(4)),
]

const extendBoardDown = (board) => [
  ...board,
  ...board.map((line) => line.map(addWithWrap(1))),
  ...board.map((line) => line.map(addWithWrap(2))),
  ...board.map((line) => line.map(addWithWrap(3))),
  ...board.map((line) => line.map(addWithWrap(4))),
]

const part2 = (input) => {
  const board = extendBoardDown(
    parseBoard(input)
      .map((line) => line.map((cell) => parseDecimal(cell)))
      .map(extendLineRight),
  )

  return dijkstra(board, [0, 0], [board[0].length - 1, board.length - 1])
}

module.exports = {
  part1,
  part2,
}
