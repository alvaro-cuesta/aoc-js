const R = require('ramda')
const { parseLines, parseDecimal } = require('../utils')

const REGEX_REACTION = /(\d+) ([^, ]+)/g

const parseReaction = R.pipe(
  (x) => Array.from(x.matchAll(REGEX_REACTION)),
  R.map((x) => [x[2], parseDecimal(x[1])]),
  R.applySpec({
    id: (x) => x[x.length - 1][0],
    produces: (x) => x[x.length - 1][1],
    needs: (x) => x.slice(0, -1),
  }),
)

const parseReactions = R.pipe(
  R.map(parseReaction),
  R.indexBy(R.prop('id')),
  R.map((x) => ({
    ...x,
    needs: x.needs.map(([id, amount]) => ({ id, amount })),
  })),
)

const parseInput = R.pipe(parseLines, parseReactions)

// NOTE: leftOvers is mutable here :( seemed easier to write; review alternatives
const getOre = R.curry((oreId, id, quantity, reactions, leftOvers = {}) => {
  let neededQuantity

  if (!leftOvers[id] || leftOvers[id] === 0) {
    neededQuantity = quantity
    leftOvers[id] = 0
  } else if (leftOvers[id] > quantity) {
    neededQuantity = 0
    leftOvers[id] -= quantity
  } else {
    neededQuantity = quantity - leftOvers[id]
    leftOvers[id] = 0
  }

  if (neededQuantity === 0) {
    return 0
  }

  const reactionTimes = Math.ceil(neededQuantity / reactions[id].produces)
  leftOvers[id] += reactionTimes * reactions[id].produces - neededQuantity

  return R.pipe(
    R.map(({ id, amount }) =>
      id === oreId
        ? amount * reactionTimes
        : getOre(oreId, id, amount * reactionTimes, reactions, leftOvers),
    ),
    R.sum,
  )(reactions[id].needs)
})

const part1 = R.pipe(parseInput, getOre('ORE', 'FUEL', 1))

const binarySearchFuel = R.curry((ore, reactions) => {
  let min = 0,
    max = ore,
    current = Math.floor((max + min) / 2)

  for (;;) {
    const res = getOre('ORE', 'FUEL', current, reactions)

    if (Math.abs(max - min) <= 1) {
      return min
    }

    if (res < ore) {
      min = current
    } else if (res > ore) {
      max = current
    }

    current = Math.floor((max + min) / 2)
  }
})

const part2 = R.pipe(parseInput, binarySearchFuel(1000000000000))

module.exports = {
  part1,
  part2,
}
