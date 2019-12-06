const R = require('ramda')
const { parseLines } = require('../utils')

const REGEX_ORBIT = /^(.+?)\)(.+)$/

const parseOrbit = R.pipe(
  R.match(REGEX_ORBIT),
  R.applySpec({
    center: R.nth(1),
    orbiter: R.nth(2),
  }),
)

const getOrbitersByCenter = R.pipe(
  R.groupBy(R.prop('center')),
  R.map(R.pluck('orbiter')),
)

const getCenterByOrbiter = R.pipe(
  R.indexBy(R.prop('orbiter')),
  R.map(R.prop('center')),
)

const countOrbits = (orbitersByCenter, current = 'COM', depth = 0) => {
  const orbiters = orbitersByCenter[current]

  if (!orbiters) {
    return depth
  }

  const orbitterDepths = R.pipe(
    R.map((orbiter) => countOrbits(orbitersByCenter, orbiter, depth + 1)),
    R.sum,
  )(orbiters)

  return depth + orbitterDepths
}

const countJumps = (from, to) => (orbitersByCenter, centerByOrbiter) => {
  let queue = [[centerByOrbiter[from], 0]]
  const visited = []

  while (queue.length > 0) {
    const [current, depth] = queue.pop()

    if (visited.includes(current)) {
      continue
    }

    visited.push(current)

    if (current === centerByOrbiter[to]) {
      return depth
    }

    const orbiters = orbitersByCenter[current]
    const center = centerByOrbiter[current]

    queue = [
      ...queue,
      ...(orbiters ? orbiters.map((orbiter) => [orbiter, depth + 1]) : []),
      ...(center ? [[center, depth + 1]] : []),
    ]
  }
}

const parseInput = R.pipe(parseLines, R.map(parseOrbit))

const part1 = R.pipe(parseInput, getOrbitersByCenter, countOrbits)

const part2 = R.pipe(
  parseInput,
  R.converge(countJumps('YOU', 'SAN'), [
    getOrbitersByCenter,
    getCenterByOrbiter,
  ]),
)

module.exports = {
  part1,
  part2,
}
