const R = require('ramda')
const {
  parseLines,
  parseDecimal,
  logInspect,
  inspect,
  gcd,
} = require('../utils')

const REGEX_REACTION = /(\d+) ([^, ]+)/g

const parseReaction = R.pipe(
  (x) => Array.from(x.matchAll(REGEX_REACTION)),
  R.map((x) => [x[2], parseDecimal(x[1])]),
  R.applySpec({
    id: (x) => x[x.length - 1][0],
    amount: (x) => x[x.length - 1][1],
    from: (x) => x.slice(0, -1),
  }),
)

const parseReactions = R.pipe(
  R.map(parseReaction),
  R.indexBy(R.prop('id')),
  R.map((x) =>
    x.from.map(([id, amount]) => ({
      id,
      numerator: amount,
      denominator: x.amount,
    })),
  ),
)

const parseInput = R.pipe(parseLines, parseReactions)

const groupSameMaterial =

const calculate = (reactions) => (remaning) => {

}

const part1 = R.pipe(
  parseInput,
  R.tap(logInspect),
  calculate([{ id: 'FUEL', numerator: 1, denominator: 1 }]),
  R.tap(logInspect),
  R.tap(logInspect),
  //calculateNeeded([['FUEL', 1]])
)

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
