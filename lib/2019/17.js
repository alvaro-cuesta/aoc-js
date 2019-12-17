const R = require('ramda')
const {} = require('../utils')
const intcode = require('./intcode')

const parseInput = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  intcode.arrayExecutor([]),
  R.prop('output'),
  R.map(String.fromCharCode),
  R.join(''),
  R.split('\n'),
)

const getChecksum = (photo) => {
  let checksum = 0

  for (let y = 0; y < photo.length; y++) {
    for (let x = 0; x < photo[y].length; x++) {
      if (
        photo[y][x] === TILES.SCAFFOLD &&
        photo[y - 1] &&
        photo[y - 1][x] === TILES.SCAFFOLD &&
        photo[y + 1] &&
        photo[y + 1][x] === TILES.SCAFFOLD &&
        photo[y][x - 1] === TILES.SCAFFOLD &&
        photo[y][x + 1] === TILES.SCAFFOLD
      ) {
        checksum += x * y
      }
    }
  }

  return checksum
}

const TILES = {
  SCAFFOLD: '#',
  OPEN: '.',
  ROBOT_UP: '^',
  ROBOT_DOWN: 'v',
  ROBOT_LEFT: '<',
  ROBOT_RIGHT: '>',
  ROBOT_TUMBLING: 'X',
}

const part1 = R.pipe(parseInput, getChecksum)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
