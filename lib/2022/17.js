const R = require('ramda')
const { parseText, logInspect } = require('../utils')

const ROCKS = [
  // ####
  [[true, true, true, true]],
  // .#.
  // ###
  // .#.
  [
    [false, true, false],
    [true, true, true],
    [false, true, false],
  ],
  // ..#
  // ..#
  // ###
  [
    [true, true, true],
    [false, false, true],
    [false, false, true],
  ],
  // #
  // #
  // #
  // #
  [[true], [true], [true], [true]],
  // ##
  // ##
  [
    [true, true],
    [true, true],
  ],
]

const moveRock = (chamber, rock, rockPos, [dx, dy]) => {
  const newRockPos = [rockPos[0] + dx, rockPos[1] + dy]
  const [x, y] = newRockPos

  for (let ry = 0; ry < rock.length; ry++) {
    for (let rx = 0; rx < rock[ry].length; rx++) {
      if (!rock[ry][rx]) {
        continue
      }

      const [wx, wy] = [x + rx, y + ry]

      // console.log('Checking', [wx, wy])

      if (wx < 0 || wx >= 7 || wy < 0 || chamber[wy]?.[wx]) {
        // console.log({ rockPos, dx, dy, wx, wy, atChamber: chamber[wy]?.[wy] })
        return [true, rockPos]
      }
    }
  }

  return [false, newRockPos]
}

const throwRock = (moves, chamber, rock, startingJet) => {
  let rockPos = [2, chamber.length + 3]

  // console.log('Start at', rockPos)

  for (let didSettle = false; !didSettle; startingJet++) {
    const jetDX = moves[startingJet % moves.length] === '<' ? -1 : 1

    // console.log('Checking jet dx', rockPos, [jetDX, 0])
    rockPos = moveRock(chamber, rock, rockPos, [jetDX, 0])[1]
    // console.log('Jetted to', rockPos)
    ;[didSettle, rockPos] = moveRock(chamber, rock, rockPos, [0, -1])
    // console.log('Fallen to', rockPos)
  }

  // console.log('Settled at', rockPos)

  const [x, y] = rockPos

  for (let ry = 0; ry < rock.length; ry++) {
    const wy = y + ry

    chamber[wy] = chamber[wy] ?? [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]

    for (let rx = 0; rx < rock[ry].length; rx++) {
      const atRock = rock[ry][rx]

      if (!atRock) {
        continue
      }

      const wx = x + rx
      chamber[wy][wx] = true
    }
  }

  // logInspect(chamber)

  return startingJet
}

const part1 = (input) => {
  const moves = parseText(input)

  const chamber = []

  let startingJet = 0

  for (let i = 0; i < 2022; i++) {
    startingJet = throwRock(
      moves,
      chamber,
      ROCKS[i % ROCKS.length],
      startingJet,
    )
  }

  return chamber.length
}

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
