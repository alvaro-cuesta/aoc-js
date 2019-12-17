const R = require('ramda')
const intcode = require('./intcode')
const vec = require('../vec')
const assert = require('assert')

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
        return commands
      } else {
        throw new Error('Ambiguous rotation possibilities')
      }
    }
  }
}

const simplify = ({ commands, routines }) => {
  const routineName =
    routines.A === undefined
      ? 'A'
      : routines.B === undefined
      ? 'B'
      : routines.C === undefined
      ? 'C'
      : null

  // Only 3 routines are allowed
  if (routineName === null) {
    throw new Error('Ran out of routines')
  }

  const commandsString = commands.join(',')
  const candidateIdx = commands.findIndex(
    (x) => x !== 'A' && x !== 'B' && x !== 'C',
  )

  let bestRatio = 0,
    bestCommands,
    bestRoutine

  for (let i = candidateIdx + 1; ; i++) {
    const candidateRoutine = commands.slice(candidateIdx, i)
    const candidateRoutineString = candidateRoutine.join(',')

    // Routines cannot have more than 20 chars
    if (candidateRoutineString.length > 20) {
      break
    }

    // Routines cannot call other routines
    if (
      candidateRoutine.find((x) => x === 'A' || x === 'B' || x === 'C') !==
      undefined
    ) {
      break
    }

    const replacedCommandsString = commandsString.replace(
      new RegExp(candidateRoutineString, 'g'),
      routineName,
    )

    const ratio =
      commandsString.length /
      (candidateRoutineString.length + replacedCommandsString.length)

    if (ratio > bestRatio) {
      bestRatio = ratio
      bestCommands = replacedCommandsString.split(',')
      bestRoutine = candidateRoutineString.split(',')
    }
  }

  return {
    commands: bestCommands,
    routines: {
      ...routines,
      [routineName]: bestRoutine,
    },
  }
}

const getDust = (rom, input) =>
  R.pipe(
    intcode.parseRAM,
    R.update(0, 2),
    intcode.spawn,
    intcode.arrayExecutor(input),
    R.prop('output'),
    R.last,
  )(rom)

const MAX_LENGTH = 20

const part2 = (rom) => {
  const commands = getCommands(rom)

  const { commands: main, routines } = simplify(
    simplify(simplify({ commands, routines: {} })),
  )

  // Main routine only consists of call to routines
  assert.equal(
    main.find((x) => x !== 'A' && x !== 'B' && x !== 'C'),
    undefined,
  )

  const mainString = main.join(',')
  assert.ok(mainString.length <= MAX_LENGTH)

  const aString = routines.A.join(',')
  assert.ok(aString.length <= MAX_LENGTH)

  const bString = routines.B.join(',')
  assert.ok(bString.length <= MAX_LENGTH)

  const cString = routines.C.join(',')
  assert.ok(cString.length <= MAX_LENGTH)

  const robotInput = `${mainString}
${aString}
${bString}
${cString}
n
`
    .split('')
    .map((x) => x.charCodeAt(0))

  return getDust(rom, robotInput)
}

module.exports = {
  part1,
  part2,
}
