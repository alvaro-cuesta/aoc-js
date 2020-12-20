const R = require('ramda')

const getNeighbors3D = ([x, y, z]) =>
  Array(3)
    .fill()
    .flatMap((_, dz) =>
      Array(3)
        .fill()
        .flatMap((_, dy) =>
          Array(3)
            .fill()
            .map((_, dx) => [x + dx - 1, y + dy - 1, z + dz - 1]),
        ),
    )
    .filter(([nx, ny, nz]) => nx !== x || ny !== y || nz !== z)

const getValue3D = (board, [x, y, z]) => {
  if (board[z] === undefined) return false
  if (board[z][y] === undefined) return false
  if (board[z][y][x] === undefined) return false

  return board[z][y][x]
}

const setValue3D = (board, [x, y, z]) => {
  if (board[z] === undefined) board[z] = {}
  if (board[z][y] === undefined) board[z][y] = {}

  board[z][y][x] = true
}

const getAliveNeighborCount3D = (board, pos) =>
  getNeighbors3D(pos)
    .map((neighborPos) => getValue3D(board, neighborPos))
    .filter((x) => x).length

const step3D = ({ board, minX, maxX, minY, maxY, minZ, maxZ }) => {
  let newBoard = {},
    newMinX = 0,
    newMaxX = 0,
    newMinY = 0,
    newMaxY = 0,
    newMinZ = 0,
    newMaxZ = 0

  for (let z = minZ - 1; z <= maxZ + 1; z++) {
    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let x = minX - 1; x <= maxX + 1; x++) {
        const pos = [x, y, z]
        const value = getValue3D(board, pos)
        const aliveNeighborCount = getAliveNeighborCount3D(board, pos)

        if (
          (value && (aliveNeighborCount === 2 || aliveNeighborCount === 3)) ||
          (!value && aliveNeighborCount === 3)
        ) {
          newMinX = Math.min(x, newMinX)
          newMaxX = Math.max(x, newMaxX)
          newMinY = Math.min(y, newMinY)
          newMaxY = Math.max(y, newMaxY)
          newMinZ = Math.min(z, newMinZ)
          newMaxZ = Math.max(z, newMaxZ)
          setValue3D(newBoard, pos)
        }
      }
    }
  }

  return {
    board: newBoard,
    minX: newMinX,
    maxX: newMaxX,
    minY: newMinY,
    maxY: newMaxY,
    minZ: newMinZ,
    maxZ: newMaxZ,
  }
}

const countAlive3D = (board) =>
  Object.values(board).reduce(
    (a, plane) =>
      a +
      Object.values(plane).reduce(
        (b, row) =>
          b + Object.values(row).reduce((c, cell) => c + (cell ? 1 : 0), 0),
        0,
      ),
    0,
  )

const parseInput3D = (input) => {
  const rows = input.trim().split('\n')

  return {
    board: {
      0: R.fromPairs(
        rows.map((row, y) => [
          y,
          R.fromPairs(
            row
              .split('')
              .map((cell, x) => [x, cell === '#'])
              .filter(([_, x]) => x),
          ),
        ]),
      ),
    },
    minX: 0,
    maxX: rows[0].length - 1,
    minY: 0,
    maxY: rows.length - 1,
    minZ: 0,
    maxZ: 0,
  }
}

const part1 = (input) =>
  countAlive3D(
    step3D(step3D(step3D(step3D(step3D(step3D(parseInput3D(input))))))).board,
  )

const getNeighbors4D = ([x, y, z, w]) =>
  Array(3)
    .fill()
    .flatMap((_, dw) =>
      Array(3)
        .fill()
        .flatMap((_, dz) =>
          Array(3)
            .fill()
            .flatMap((_, dy) =>
              Array(3)
                .fill()
                .map((_, dx) => [
                  x + dx - 1,
                  y + dy - 1,
                  z + dz - 1,
                  w + dw - 1,
                ]),
            ),
        ),
    )
    .filter(([nx, ny, nz, nw]) => nx !== x || ny !== y || nz !== z || nw !== w)

const getValue4D = (board, [x, y, z, w]) => {
  if (board[w] === undefined) return false
  if (board[w][z] === undefined) return false
  if (board[w][z][y] === undefined) return false
  if (board[w][z][y][x] === undefined) return false

  return board[w][z][y][x]
}

const setValue4D = (board, [x, y, z, w]) => {
  if (board[w] === undefined) board[w] = {}
  if (board[w][z] === undefined) board[w][z] = {}
  if (board[w][z][y] === undefined) board[w][z][y] = {}

  board[w][z][y][x] = true
}

const getAliveNeighborCount4D = (board, pos) =>
  getNeighbors4D(pos)
    .map((neighborPos) => getValue4D(board, neighborPos))
    .filter((x) => x).length

const step4D = ({ board, minX, maxX, minY, maxY, minZ, maxZ, minW, maxW }) => {
  let newBoard = {},
    newMinX = 0,
    newMaxX = 0,
    newMinY = 0,
    newMaxY = 0,
    newMinZ = 0,
    newMaxZ = 0,
    newMinW = 0,
    newMaxW = 0

  for (let w = minW - 1; w <= maxW + 1; w++) {
    for (let z = minZ - 1; z <= maxZ + 1; z++) {
      for (let y = minY - 1; y <= maxY + 1; y++) {
        for (let x = minX - 1; x <= maxX + 1; x++) {
          const pos = [x, y, z, w]
          const value = getValue4D(board, pos)
          const aliveNeighborCount = getAliveNeighborCount4D(board, pos)

          if (
            (value && (aliveNeighborCount === 2 || aliveNeighborCount === 3)) ||
            (!value && aliveNeighborCount === 3)
          ) {
            newMinX = Math.min(x, newMinX)
            newMaxX = Math.max(x, newMaxX)
            newMinY = Math.min(y, newMinY)
            newMaxY = Math.max(y, newMaxY)
            newMinZ = Math.min(z, newMinZ)
            newMaxZ = Math.max(z, newMaxZ)
            newMinW = Math.min(w, newMinW)
            newMaxW = Math.max(w, newMaxW)
            setValue4D(newBoard, pos)
          }
        }
      }
    }
  }

  return {
    board: newBoard,
    minX: newMinX,
    maxX: newMaxX,
    minY: newMinY,
    maxY: newMaxY,
    minZ: newMinZ,
    maxZ: newMaxZ,
    minW: newMinW,
    maxW: newMaxW,
  }
}

const countAlive4D = (board) =>
  Object.values(board).reduce(
    (a, cube) =>
      a +
      Object.values(cube).reduce(
        (b, plane) =>
          b +
          Object.values(plane).reduce(
            (c, row) =>
              c + Object.values(row).reduce((d, cell) => d + (cell ? 1 : 0), 0),
            0,
          ),
        0,
      ),
    0,
  )

const parseInput4D = (input) => {
  const rows = input.trim().split('\n')

  return {
    board: {
      0: {
        0: R.fromPairs(
          rows.map((row, y) => [
            y,
            R.fromPairs(
              row
                .split('')
                .map((cell, x) => [x, cell === '#'])
                .filter(([_, x]) => x),
            ),
          ]),
        ),
      },
    },
    minX: 0,
    maxX: rows[0].length - 1,
    minY: 0,
    maxY: rows.length - 1,
    minZ: 0,
    maxZ: 0,
    minW: 0,
    maxW: 0,
  }
}

const part2 = (input) =>
  countAlive4D(
    step4D(step4D(step4D(step4D(step4D(step4D(parseInput4D(input))))))).board,
  )

module.exports = {
  part1,
  part2,
}
