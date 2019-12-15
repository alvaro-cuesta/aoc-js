const R = require('ramda')
const intcode = require('./intcode')
const vec = require('../vec')
const assert = require('assert')

const TILES = {
  WALL: 0,
  OPEN: 1,
  OXYGEN: 2,
}

// Reverse-engineered from program
const getData = (input) => {
  const rom = intcode.parseRAM(input)

  const w = rom[132]
  const h = rom[139]

  assert.equal(rom[146], w - 1)
  assert.equal(rom[153], h - 1)
  assert.equal(rom[196], h - 1)

  const start = [rom[1034], rom[1035]]

  assert.ok(start[0] % 2 === 1)
  assert.ok(start[1] % 2 === 1)
  assert.equal(rom[1036], start[0] % 2 === 0 ? 0 : 1)
  assert.equal(rom[1037], Math.floor(start[1] / 2))
  assert.equal(rom[1038], start[1] % 2 === 0 ? 0 : 1)

  const oxygen = [rom[146], rom[153]]

  assert.ok(oxygen[0] % 2 === 1)
  assert.ok(oxygen[1] % 2 === 1)

  const threshold = rom[212]

  const data = R.slice(252, 252 + (h / 2) * (w - 1), rom)

  return { w, h, start, oxygen, threshold, data }
}

const makeGetTile = ({ w, h, oxygen: [ox, oy], threshold, data }) => ([
  x,
  y,
]) => {
  const evenX = x % 2 === 0
  const evenY = y % 2 === 0

  if (x === 0 || y === 0 || x === w || x === h || (evenX && evenY)) {
    return TILES.WALL
  }

  if (x === ox && y === oy) {
    return TILES.OXYGEN
  }

  if (!evenX && !evenY) {
    return TILES.OPEN
  }

  const tileIdx = Math.floor((y - 1) / 2) * (w - 1) + x - 1

  return data[tileIdx] < threshold ? TILES.OPEN : TILES.WALL
}

const DIRECTIONS = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
]

const makeDijsktra = (data) => {
  const getTile = makeGetTile(data)

  const step = (pos, visited = {}, steps = 0) => {
    const posKey = vec.key(pos)

    if (visited[posKey] === undefined || visited[posKey] > steps) {
      visited = {
        ...visited,
        [posKey]: steps,
      }
    }

    return R.pipe(
      R.map(vec.add(pos)),
      R.filter(
        (newPos) =>
          getTile(newPos) !== TILES.WALL &&
          (visited[newPos] === undefined || visited[newPos] > steps + 1),
      ),
      R.reduce((visited, newPos) => step(newPos, visited, steps + 1), visited),
    )(DIRECTIONS)
  }

  return step
}

const part1 = R.pipe(getData, (data) => {
  const dijkstra = makeDijsktra(data)

  return dijkstra(data.start)[vec.key(data.oxygen)]
})

const part2 = R.pipe(getData, (data) => {
  const dijkstra = makeDijsktra(data)

  return R.pipe(dijkstra, R.values, (x) => x.reduce(R.maxBy(R.identity)))(
    data.oxygen,
  )
})

module.exports = {
  part1,
  part2,
}
