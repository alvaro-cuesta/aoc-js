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

const parseInput = R.pipe(parseLines, R.map(parseOrbit))

const part1 = R.pipe(parseInput, getOrbitsByOrbited, countOrbits)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
