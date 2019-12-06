const R = require('ramda')
const { parseLines } = require('../utils')

const REGEX_ORBIT = /^(.+?)\)(.+)$/

const parseOrbit = R.pipe(
  R.match(REGEX_ORBIT),
  R.applySpec({
    around: R.nth(1),
    object: R.nth(2),
  }),
)

const getOrbitsByOrbited = R.pipe(
  R.groupBy(R.prop('around')),
  R.map(R.pluck('object')),
)

const getOrbitsByOrbiter = R.pipe(
  R.indexBy(R.prop('object')),
  R.map(R.prop('around')),
)

const countOrbits = (orbitsByOrbited, current = 'COM', depth = 0) => {
  const orbiters = orbitsByOrbited[current]

  if (!orbiters) {
    return depth
  }

  const orbitterDepths = R.pipe(
    R.map((orbiter) => countOrbits(orbitsByOrbited, orbiter, depth + 1)),
    R.sum,
  )(orbiters)

  return depth + orbitterDepths
}

const countJumps = (from, to) => (orbitsByOrbited, orbitsByOrbiter) => {
  let queue = [[orbitsByOrbiter[from], 0]]
  const visited = []

  while (queue.length > 0) {
    const [current, depth] = queue.pop()

    if (visited.includes(current)) {
      continue
    }

    visited.push(current)

    if (current === orbitsByOrbiter[to]) {
      return depth
    }

    const orbiters = orbitsByOrbited[current]
    const orbited = orbitsByOrbiter[current]

    queue = [
      ...queue,
      ...(orbiters ? orbiters.map((orbiter) => [orbiter, depth + 1]) : []),
      ...(orbited ? [[orbited, depth + 1]] : []),
    ]
  }
}

const parseInput = R.pipe(parseLines, R.map(parseOrbit))

const part1 = R.pipe(parseInput, getOrbitsByOrbited, countOrbits)

const part2 = R.pipe(
  parseInput,
  R.converge(countJumps('YOU', 'SAN'), [
    getOrbitsByOrbited,
    getOrbitsByOrbiter,
  ]),
)

module.exports = {
  part1,
  part2,
}
