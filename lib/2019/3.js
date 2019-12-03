const R = require('ramda')
const { parseLines, parseDecimal } = require('../utils')

const REGEX_DIRECTION = /([URDL])(\d+)/

const parseDirection = R.pipe(
  R.match(REGEX_DIRECTION),
  R.applySpec({
    direction: R.nth(1),
    steps: R.pipe(R.nth(2), parseDecimal),
  }),
)

const parseDirections = R.pipe(R.split(','), R.map(parseDirection))

const parseInput = R.pipe(parseLines, R.map(parseDirections))

const makeSegments = R.pipe(
  R.reduce(
    ({ segments, position, stepsTaken }, { direction, steps }) => {
      const [x, y] = position

      const newPosition =
        direction === 'U'
          ? [x, y + steps]
          : direction === 'R'
          ? [x + steps, y]
          : direction === 'D'
          ? [x, y - steps]
          : direction === 'L'
          ? [x - steps, y]
          : undefined

      const commonNewSegment = { x, y, stepsTaken }

      const newSegment =
        direction === 'U' || direction === 'D'
          ? {
              ...commonNewSegment,
              orientation: 'V',
              fromY: Math.min(y, newPosition[1]),
              toY: Math.max(y, newPosition[1]),
            }
          : {
              ...commonNewSegment,
              orientation: 'H',
              fromX: Math.min(x, newPosition[0]),
              toX: Math.max(x, newPosition[0]),
            }

      return {
        segments: [...segments, newSegment],
        position: newPosition,
        stepsTaken: stepsTaken + Math.abs(steps),
      }
    },
    {
      segments: [],
      position: [0, 0],
      stepsTaken: 0,
    },
  ),

  R.prop('segments'),
)

const intersectSegments = (a, b) => {
  if (a.orientation === 'V' && b.orientation === 'V') {
    if (a.x !== b.x || (a.fromY > b.toY && a.toY > b.fromY)) {
      return []
    }

    return R.map(
      (y) => ({
        position: [a.x, y],
        stepsTakenA: a.stepsTaken + Math.abs(y - a.y),
        stepsTakenB: b.stepsTaken + Math.abs(y - b.y),
      }),
      R.range(Math.max(a.fromY, b.fromY), Math.min(a.toY, b.toY) + 1),
    )
  } else if (a.orientation === 'H' && b.orientation === 'H') {
    if (a.y !== b.y || (a.fromX > b.toX && a.toX > b.fromX)) {
      return []
    }

    return R.map(
      (x) => ({
        position: [x, a.y],
        stepsTakenA: a.stepsTaken + Math.abs(x - a.x),
        stepsTakenB: b.stepsTaken + Math.abs(x - b.x),
      }),
      R.range(Math.max(a.fromX, b.fromX), Math.min(a.toX, b.toX) + 1),
    )
  } else if (a.orientation === 'H' && b.orientation === 'V') {
    if (a.y < b.fromY || a.y > b.toY || b.x < a.fromX || b.x > a.toX) {
      return []
    }

    return [
      {
        position: [b.x, a.y],
        stepsTakenA: a.stepsTaken + Math.abs(b.x - a.x),
        stepsTakenB: b.stepsTaken + Math.abs(a.y - b.y),
      },
    ]
  } else if (a.orientation === 'V' && b.orientation === 'H') {
    if (a.x < b.fromX || a.x > b.toX || b.y < a.fromY || b.y > a.toY) {
      return []
    }

    return [
      {
        position: [a.x, b.y],
        stepsTakenA: a.stepsTaken + Math.abs(b.y - a.y),
        stepsTakenB: b.stepsTaken + Math.abs(a.x - b.x),
      },
    ]
  }
}

const findIntersections = R.pipe(
  parseInput,
  R.map(makeSegments),
  R.apply(R.xprod),
  R.chain(R.pipe(R.apply(intersectSegments))),
  R.reject(R.propEq('position', [0, 0])),
)

const manhattanDistance = R.pipe(R.map(Math.abs), R.sum)

const part1 = R.pipe(
  findIntersections,
  R.map(R.prop('position')),
  (x) => x.reduce(R.minBy(manhattanDistance)),
  manhattanDistance,
)

const part2 = R.pipe(
  findIntersections,
  (x) => x.reduce(R.minBy((x) => x.stepsTakenA + x.stepsTakenB)),
  (x) => x.stepsTakenA + x.stepsTakenB,
)

module.exports = {
  part1,
  part2,
}
