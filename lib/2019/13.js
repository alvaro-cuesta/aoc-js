const R = require('ramda')
const intcode = require('./intcode')

const TILES = {
  EMPTY: 0,
  WALL: 1,
  BLOCK: 2,
  PADDLE: 3,
  BALL: 4,
}

const JOYSTICK = {
  LEFT: -1,
  NEUTRAL: 0,
  RIGHT: 1,
}

const runScreenCommand = (screen, [x, y, id]) => {
  screen[x] = screen[x] || {}
  screen[x][y] = id

  return screen
}

const part1 = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  intcode.arrayExecutor([]),
  R.prop('output'),
  R.splitEvery(3),
  R.reduce(runScreenCommand, {}),
  R.values,
  R.chain(R.pipe(R.values, R.filter(R.equals(TILES.BLOCK)))),
  R.length,
)

const analyzeScreen = (screen) => {
  let paddlePos, ballPos

  for (const [xs, row] of Object.entries(screen)) {
    const x = parseInt(xs, 10)

    if (x === -1) {
      continue
    }

    for (const [ys, tile] of Object.entries(row)) {
      const y = parseInt(ys, 10)

      if (tile === TILES.PADDLE) {
        if (paddlePos !== undefined) {
          throw new Error('More than one paddle!')
        }

        paddlePos = [x, y]
      }

      if (tile === TILES.BALL) {
        if (ballPos !== undefined) {
          throw new Error('More than one ball!')
        }

        ballPos = [x, y]
      }
    }
  }

  return {
    paddlePos,
    ballPos,
  }
}

const getScore = (screen) => (screen[-1] ? screen[-1][0] : undefined)

const getJoystickPosition = (lastBallPos, ballPos, paddlePos) => {
  if (lastBallPos) {
    const ballVel = [ballPos[0] - lastBallPos[0], ballPos[1] - lastBallPos[1]]

    if (ballVel[1] > 0) {
      return ballPos[0] < paddlePos[0]
        ? JOYSTICK.LEFT
        : ballPos[0] > paddlePos[0]
        ? JOYSTICK.RIGHT
        : JOYSTICK.NEUTRAL
    } else if (ballVel[1] < 0) {
      return ballVel[0] === -1 ? JOYSTICK.LEFT : JOYSTICK.RIGHT
    }
  } else {
    return JOYSTICK.NEUTRAL
  }
}

const part2 = (input) => {
  const thread = R.pipe(intcode.parseRAM, R.update(0, 2), intcode.spawn)(input)

  let screenBuffer = []
  let screen = {}
  let lastBallPos

  let { value, done } = thread.next()

  for (;;) {
    if (done) {
      return getScore(screen)
    }

    switch (value.type) {
      case 'input': {
        const { ballPos, paddlePos } = analyzeScreen(screen)

        ;({ value, done } = thread.next(
          getJoystickPosition(lastBallPos, ballPos, paddlePos),
        ))

        lastBallPos = ballPos

        continue
      }

      case 'output': {
        screenBuffer.push(value.value)

        if (screenBuffer.length === 3) {
          runScreenCommand(screen, screenBuffer)
          screenBuffer = []
        }

        ;({ value, done } = thread.next())

        continue
      }
    }
  }
}

module.exports = {
  part1,
  part2,
}
