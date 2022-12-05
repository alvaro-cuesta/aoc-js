const R = require('ramda')
const { parseLines } = require('../utils')

const PART1_SHAPE_SCORE = {
  X: 1,
  Y: 2,
  Z: 3,
}

const PART1_MATCH_SCORE = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
}

const getPart1RoundScore = (them, me) =>
  PART1_SHAPE_SCORE[me] + PART1_MATCH_SCORE[them][me]

const part1 = R.pipe(
  parseLines,
  R.map(R.pipe(R.split(' '), R.apply(getPart1RoundScore))),
  R.sum,
)

const PART2_MATCH_SCORE = {
  X: 0,
  Y: 3,
  Z: 6,
}

const PART2_SHAPE_SCORE = {
  A: {
    X: PART1_SHAPE_SCORE.Z,
    Y: PART1_SHAPE_SCORE.X,
    Z: PART1_SHAPE_SCORE.Y,
  },
  B: {
    X: PART1_SHAPE_SCORE.X,
    Y: PART1_SHAPE_SCORE.Y,
    Z: PART1_SHAPE_SCORE.Z,
  },
  C: {
    X: PART1_SHAPE_SCORE.Y,
    Y: PART1_SHAPE_SCORE.Z,
    Z: PART1_SHAPE_SCORE.X,
  },
}

const getPart2RoundScore = (them, outcome) =>
  PART2_MATCH_SCORE[outcome] + PART2_SHAPE_SCORE[them][outcome]

const part2 = R.pipe(
  parseLines,
  R.map(R.pipe(R.split(' '), R.apply(getPart2RoundScore))),
  R.sum,
)

module.exports = {
  part1,
  part2,
}
