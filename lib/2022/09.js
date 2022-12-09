const R = require('ramda')
const {
  parseLines,
  parseDecimal,
  timesValue,
  regexGroups,
} = require('../utils')
const { add, sub, key } = require('../vec')

const parseSteps = R.pipe(
  parseLines,
  R.map(
    R.pipe(
      regexGroups(/(?<dir>[URDL]) (?<count>\d+)/),
      R.modify('steps', parseDecimal),
    ),
  ),
)

const DIR_TO_H_DELTA = {
  U: [0, -1],
  R: [1, 0],
  L: [-1, 0],
  D: [0, 1],
}

const DIFF_TO_DELTA = {
  [key([-1, -1])]: [0, 0],
  [key([0, -1])]: [0, 0],
  [key([1, -1])]: [0, 0],
  [key([-1, 0])]: [0, 0],
  [key([0, 0])]: [0, 0],
  [key([1, 0])]: [0, 0],
  [key([-1, 1])]: [0, 0],
  [key([0, 1])]: [0, 0],
  [key([1, 1])]: [0, 0],
  // U
  [key([-1, 2])]: [1, -1],
  [key([0, 2])]: [0, -1],
  [key([1, 2])]: [-1, -1],
  // R
  [key([-2, -1])]: [1, 1],
  [key([-2, 0])]: [1, 0],
  [key([-2, 1])]: [1, -1],
  // L
  [key([2, -1])]: [-1, 1],
  [key([2, 0])]: [-1, 0],
  [key([2, 1])]: [-1, -1],
  // D
  [key([-1, -2])]: [1, 1],
  [key([0, -2])]: [0, 1],
  [key([1, -2])]: [-1, 1],
  //
  [key([-2, -2])]: [1, 1],
  [key([2, -2])]: [-1, 1],
  [key([-2, 2])]: [1, -1],
  [key([2, 2])]: [-1, -1],
}

const applyKnotFollow = (dir, a, b) => {
  const d = sub(b, a)
  const dKey = key(d)
  const bMove = DIFF_TO_DELTA[dKey]

  if (!bMove) {
    throw new Error(`Could not find DIFF_TO_DELTA for ${dKey}`)
  }

  return add(b, bMove)
}

const applyDir = R.curry((dir, state) => {
  const knots = [add(state.knots[0], DIR_TO_H_DELTA[dir])]

  for (let i = 1; i < state.knots.length; i++) {
    knots.push(applyKnotFollow(dir, knots[i - 1], state.knots[i]))
  }

  return {
    knots,
    tVisited: { ...state.tVisited, [key(R.last(knots))]: true },
  }
})

const applyStep = (state, { dir, count }) =>
  timesValue(applyDir(dir), count, state)

const makeInitialState = (knotCount) => ({
  knots: R.map(R.always([0, 0]), R.range(0, knotCount)),
  tVisited: {},
})

const makeSolver = (knotCount) =>
  R.pipe(
    parseSteps,
    R.reduce(applyStep, makeInitialState(knotCount)),
    R.prop('tVisited'),
    R.values,
    R.length,
  )

const part1 = makeSolver(2)

const part2 = makeSolver(10)

module.exports = {
  part1,
  part2,
}
