const ROTATE = {
  N: {
    R: 'E',
    L: 'W',
  },
  E: {
    R: 'S',
    L: 'N',
  },
  S: {
    R: 'W',
    L: 'E',
  },
  W: {
    R: 'N',
    L: 'S',
  },
}

const MOVE = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
}

const parseSteps = (input) => input.trim().split(', ')

const applyStep = ({ position, direction }, step) => {
  direction = ROTATE[direction][step[0]]

  const [x, y] = position
  const [xd, yd] = MOVE[direction]
  const d = parseInt(step.slice(1), 10)

  position = [x + xd * d, y + yd * d]

  return { position, direction }
}

const getManhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y)

const part1 = (input) => {
  const { position } = parseSteps(input).reduce(applyStep, {
    position: [0, 0],
    direction: 'N',
  })

  return getManhattanDistance(position)
}

const hashPosition = ([x, y]) => `${x}-${y}`

const part2 = (input) => {
  const steps = parseSteps(input)
  const visited = {}
  let state = { position: [0, 0], direction: 'N' }

  for (const step of steps) {
    state.direction = ROTATE[state.direction][step[0]]

    const [xd, yd] = MOVE[state.direction]
    const d = parseInt(step.slice(1), 10)

    for (let i = 0; i < d; i++) {
      const hash = hashPosition(state.position)

      if (visited[hash]) {
        return getManhattanDistance(state.position)
      }

      visited[hash] = true

      const [x, y] = state.position
      state.position = [x + xd, y + yd]
    }
  }

  throw new Error('Solution not found')
}

module.exports = {
  part1,
  part2,
}
