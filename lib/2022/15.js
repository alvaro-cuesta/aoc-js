const R = require('ramda')
const {
  parseLines,
  regexGroups,
  logInspect,
  parseDecimal,
} = require('../utils')

const manhattanDist = ([x0, y0], [x1, y1]) =>
  Math.abs(x0 - x1) + Math.abs(y0 - y1)

const parseSensors = R.pipe(
  parseLines,
  R.map(
    R.pipe(
      regexGroups(
        /Sensor at x=(?<sX>-?\d+), y=(?<sY>-?\d+): closest beacon is at x=(?<bX>-?\d+), y=(?<bY>-?\d+)/,
      ),
      R.map(parseDecimal),
      (s) => ({
        ...s,
        d: manhattanDist([s.sX, s.sY], [s.bX, s.bY]),
      }),
    ),
  ),
)

const solvePart1 = R.curry((y, input) => {
  const sensors = parseSensors(input)

  let acc = 0

  const minX = sensors.map((s) => s.sX - s.d).reduce(R.min, +Infinity)
  const maxX = sensors.map((s) => s.sX + s.d).reduce(R.max, -Infinity)

  for (let x = minX; x < maxX; x++) {
    const inRangeOfAnySensor = sensors.some(
      (s) => manhattanDist([s.sX, s.sY], [x, y]) <= s.d,
    )

    const isBeacon = sensors.some((s) => s.bX === x && s.bY === y)

    if (inRangeOfAnySensor && !isBeacon) {
      acc++
    }
  }

  return acc
})

const part1 = solvePart1(2000000)

const solvePart2 = R.curry((max, input) => {
  const sensors = parseSensors(input)

  for (let x = 0; x <= max; x++) {
    for (let y = 0; y <= max; y++) {
      const inRangeOfAnySensor = sensors.some(
        (s) => manhattanDist([s.sX, s.sY], [x, y]) <= s.d,
      )

      const isBeacon = sensors.some((s) => s.bX === x && s.bY === y)

      if (!inRangeOfAnySensor && !isBeacon) {
        return x * 4000000 + y
      }
    }
  }

  throw new Error('Not found')
})

const part2 = solvePart2(4000000)

module.exports = {
  solvePart1,
  solvePart2,
  part1,
  part2,
}
