const R = require('ramda')
const intcode = require('./intcode')

const TILES = {
  EMPTY: 0,
  WALL: 1,
  BLOCK: 2,
  PADDLE: 3,
  BALL: 4,
}

const parseScreen = (output) => {
  const screen = R.pipe(
    R.splitEvery(3),
    R.reduce((screen, [x, y, id]) => {
      screen[x] = screen[x] || {}
      screen[x][y] = id

      return screen
    }, {}),
  )(output)

  return {
    screen,
    score: screen[-1] ? screen[-1][0] : undefined,
  }
}

const part1 = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  intcode.arrayExecutor([]),
  R.prop('output'),
  parseScreen,
  R.prop('screen'),
  R.values,
  R.chain(R.pipe(R.values, R.filter(R.equals(TILES.BLOCK)))),
  R.length,
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
