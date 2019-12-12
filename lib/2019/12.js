const R = require('ramda')
const { parseLines, parseDecimal, applyN } = require('../utils')

const REGEX_MOON = /^<x=(-?\d+), y=(-?\d+), z=(-?\d+)>$/

const parseMoon = R.pipe(
  R.match(REGEX_MOON),
  R.slice(1, 4),
  R.map(parseDecimal),
  (pos) => ({
    pos,
    vel: [0, 0, 0],
  }),
)

const parseMoons = R.pipe(
  parseLines,
  R.map(parseMoon),
  R.addIndex(R.map)((x, i) => ({ ...x, i })),
)

const getPairGravity = ([{ pos: a }, { pos: b }]) =>
  R.pipe(
    R.zip,
    R.map(
      R.apply(
        R.cond([
          [R.lt, R.always(+1)],
          [R.gt, R.always(-1)],
          [R.equals, R.always(0)],
        ]),
      ),
    ),
  )(a, b)

const getPairsGravity = R.pipe(R.map(getPairGravity), (x) =>
  x.reduce(R.pipe(R.zip, R.map(R.apply(R.add)))),
)

const getGravities = R.pipe(
  R.converge(R.xprod, [R.identity, R.identity]),
  R.filter(([{ i: a }, { i: b }]) => a !== b),
  R.groupBy(R.path([0, 'i'])),
  R.values,
  R.map(getPairsGravity),
)

const v3add = ([x0, y0, z0], [x1, y1, z1]) => [x0 + x1, y0 + y1, z0 + z1]

const applyGravities = R.pipe(
  R.converge(R.zip, [R.identity, getGravities]),
  R.map(([x, g]) => ({
    ...x,
    vel: v3add(x.vel, g),
  })),
)

const applyVelocities = R.map((x) => ({ ...x, pos: v3add(x.pos, x.vel) }))

const step = R.pipe(applyGravities, applyVelocities)

const propEnergy = (prop) => R.pipe(R.prop(prop), R.map(Math.abs), R.sum)

const getMoonEnergy = R.converge(R.multiply, [
  propEnergy('pos'),
  propEnergy('vel'),
])

const getEnergy = R.pipe(R.map(getMoonEnergy), R.sum)

const part1 = R.pipe(parseMoons, applyN(step, 1000), getEnergy)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  parseMoons,
  step,
  getEnergy,
  part1,
  part2,
}
