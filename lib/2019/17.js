const R = require('ramda')
const intcode = require('./intcode')
const vec = require('../vec')

const parseInput = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  intcode.arrayExecutor([]),
  R.prop('output'),
  R.map(String.fromCharCode),
  R.join(''),
  R.split('\n'),
)

const getTile = R.curry((photo, [x, y]) =>
  photo[y] === undefined ? undefined : photo[y][x],
)

const getAdjacent = ([x, y]) => [
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
  [x - 1, y],
]

const getChecksum = (photo) => {
  let checksum = 0

  for (let y = 0; y < photo.length; y++) {
    for (let x = 0; x < photo[y].length; x++) {
      const pos = [x, y]

      if (
        getTile(photo, pos) === TILES.SCAFFOLD &&
        getAdjacent(pos)
          .map(getTile(photo))
          .every((tile) => tile === TILES.SCAFFOLD)
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

const ROBOT_TILES = [
  TILES.ROBOT_UP,
  TILES.ROBOT_DOWN,
  TILES.ROBOT_LEFT,
  TILES.ROBOT_RIGHT,
]

const part1 = R.pipe(parseInput, getChecksum)

const getRobotPos = (photo) => {
  for (let y = 0; y < photo.length; y++) {
    for (let x = 0; x < photo[y].length; x++) {
      if (ROBOT_TILES.includes(photo[y][x])) {
        return [[x, y], photo[y][x]]
      }
    }
  }

  throw new Error('Robot not found')
}

const getExits = (photo, pos) =>
  getAdjacent(pos).filter((newPos) => getTile(photo, newPos) === TILES.SCAFFOLD)

const ROTATIONS = {
  '^': { '^': '', '<': 'L', '>': 'R' },
  '>': { '>': '', '^': 'L', v: 'R' },
  v: { v: '', '>': 'L', '<': 'R' },
  '<': { '<': '', v: 'L', '^': 'R' },
}

const UNROTATIONS = {
  '^': { '': '^', L: '<', R: '>' },
  '>': { '': '>', L: '^', R: 'v' },
  v: { '': 'v', L: '>', R: '<' },
  '<': { '': '<', L: 'v', R: '^' },
}

const DIRECTIONS = {
  '^': [0, -1],
  '>': [1, 0],
  v: [0, 1],
  '<': [-1, 0],
}

const getRotationToFace = R.curry(([x, y], dir, [faceX, faceY]) => {
  const d = [faceX - x, faceY - y]

  if (R.equals(d, [0, -1])) {
    return ROTATIONS[dir]['^']
  } else if (R.equals(d, [1, 0])) {
    return ROTATIONS[dir]['>']
  } else if (R.equals(d, [0, 1])) {
    return ROTATIONS[dir]['v']
  } else if (R.equals(d, [-1, 0])) {
    return ROTATIONS[dir]['<']
  } else {
    throw new Error('Wrong delta')
  }
})

const getCommands = (input) => {
  const photo = parseInput(input)

  let [pos, dir] = getRobotPos(photo)
  let moving = 0
  let commands = []

  for (;;) {
    const exits = getExits(photo, pos)

    const forwardPos = vec.add(pos, DIRECTIONS[dir])

    if (getTile(photo, forwardPos) === TILES.SCAFFOLD) {
      moving += 1
      pos = forwardPos
    } else {
      const rotations = exits
        .map(getRotationToFace(pos, dir))
        .filter((x) => x !== undefined)

      if (rotations.includes('')) {
        throw new Error('I should have moved forward')
      } else if (rotations.length === 1) {
        const rotation = rotations[0]

        if (moving !== 0) {
          commands.push(moving)
        }
        commands.push(rotation)
        dir = UNROTATIONS[dir][rotation]
        moving = 0
      } else if (rotations.length === 0) {
        commands.push(moving)
        return commands.join(',')
      } else {
        throw new Error('Ambiguous rotation possibilities')
      }
    }
  }
}

const part2 = (input) => {
  const commands = getCommands(input)

  /*
    For my input, commands are:

    L,4,L,10,L,6,L,4,L,10,L,6,L,6,L,4,R,8,R,8,L,6,R,8,L,10,L,8,L,8,L,4,L,10,L,6,L,6,R,8,L,10,L,8,L,8,L,6,L,4,R,8,R,8,L,6,R,8,L,10,L,8,L,8,L,4,L,10,L,6,L,6,L,4,R,8,R,8

    Which I manually simplified to this robot input.

    TODO: Automatic simplification
  */

  const robotInput = `A,A,B,C,A,C,B,C,A,B
L,4,L,10,L,6
L,6,L,4,R,8,R,8
L,6,R,8,L,10,L,8,L,8
n
`
    .split('')
    .map((x) => x.charCodeAt(0))

  const dust = R.pipe(
    intcode.parseRAM,
    R.update(0, 2),
    intcode.spawn,
    intcode.arrayExecutor(robotInput),
    R.prop('output'),
    R.last,
  )(input)

  return `${commands}
${dust}`
}

module.exports = {
  part1,
  part2,
}
