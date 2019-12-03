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
    ({ segments, position }, { direction, steps }) => {
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

      const newSegment =
        direction === 'U' || direction === 'D'
          ? {
              from: position,
              to: newPosition,
              orientation: 'V',
              x,
              fromY: Math.min(y, newPosition[1]),
              toY: Math.max(y, newPosition[1]),
            }
          : {
              from: position,
              to: newPosition,
              orientation: 'H',
              y,
              fromX: Math.min(x, newPosition[0]),
              toX: Math.max(x, newPosition[0]),
            }

      return {
        segments: [...segments, newSegment],
        position: newPosition,
      }
    },
    {
      segments: [],
      position: [0, 0],
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
      (y) => [a.x, y],
      R.range(Math.max(a.fromY, b.fromY), Math.min(a.toY, b.toY) + 1),
    )
  } else if (a.orientation === 'H' && b.orientation === 'H') {
    if (a.y !== b.y || (a.fromX > b.toX && a.toX > b.fromX)) {
      return []
    }

    return R.map(
      (x) => [x, a.y],
      R.range(Math.max(a.fromX, b.fromX), Math.min(a.toX, b.toX) + 1),
    )
  } else if (a.orientation === 'H' && b.orientation === 'V') {
    if (a.y < b.fromY || a.y > b.toY || b.x < a.fromX || b.x > a.toX) {
      return []
    }

    return [[b.x, a.y]]
  } else if (a.orientation === 'V' && b.orientation === 'H') {
    if (a.x < b.fromX || a.x > b.toX || b.y < a.fromY || b.y > a.toY) {
      return []
    }

    return [[a.x, b.y]]
  }
}

const manhattanDistance = R.pipe(R.map(Math.abs), R.sum)

const part1 = R.pipe(
  parseInput,
  R.map(makeSegments),
  R.apply(R.xprod),
  R.chain(R.apply(intersectSegments)),
  R.reject(R.equals([0, 0])),
  (x) => x.reduce(R.minBy(manhattanDistance)),
  manhattanDistance,
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  intersectSegments,
  part1,
  part2,
}
