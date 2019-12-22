const R = require('ramda')
const bigInt = require('big-integer')
const { parseLines } = require('../utils')

const getIndex = R.curry((i, m, [a, b]) =>
  bigInt(a)
    .multiply(i)
    .add(b)
    .mod(m)
    .add(m)
    .mod(m),
)

const newDeck = R.pipe(R.range(0), R.map(bigInt))

const newStackCoeffs = R.curry((length, [a, b]) => [
  bigInt(a)
    .multiply(-1)
    .mod(length),
  bigInt(b)
    .subtract(a)
    .mod(length),
])

const newStack = R.curry((deck) =>
  deck.map(
    (_, i) =>
      deck[getIndex(i, deck.length, newStackCoeffs(deck.length, [1, 0]))],
  ),
)

const cutNCoeffs = R.curry((n, length, [a, b]) => [
  a,
  bigInt(b)
    .add(bigInt(n).multiply(a))
    .mod(length),
])

const cutN = R.curry((n, deck) =>
  deck.map(
    (_, i) =>
      deck[getIndex(i, deck.length, cutNCoeffs(n, deck.length, [1, 0]))],
  ),
)

const dealIncNCoeffs = R.curry((n, length, [a, b]) => [
  bigInt(a)
    .multiply(bigInt(n).modInv(length))
    .mod(length),
  b,
])

const dealIncN = R.curry((n, deck) =>
  deck.map(
    (_, i) =>
      deck[getIndex(i, deck.length, dealIncNCoeffs(n, deck.length, [1, 0]))],
  ),
)

const REGEX_NEW_STACK = /^deal into new stack$/
const REGEX_CUT_N = /^cut (-?\d+)$/
const REGEX_DEAL_INC = /^deal with increment (\d+)$/

const compileLine = (line) => {
  let match

  if ((match = line.match(REGEX_NEW_STACK)) !== null) {
    return newStackCoeffs
  }

  if ((match = line.match(REGEX_CUT_N)) !== null) {
    return cutNCoeffs(match[1])
  }

  if ((match = line.match(REGEX_DEAL_INC)) !== null) {
    return dealIncNCoeffs(match[1])
  }

  throw new Error(`Could not parse ${line}`)
}

const inputCoeffs = R.pipe((length, input, [a, b]) =>
  R.pipe(
    parseLines,
    R.map(compileLine),
    R.reduce((acc, f) => f(length, acc), [a, b]),
  )(input),
)

const shuffleDeck = R.curry((length, input) =>
  R.pipe(
    newDeck,
    R.map((i) => getIndex(i, length, inputCoeffs(length, input, [1, 0]))),
  )(length),
)

const PART1_LENGTH = 10007
const PART1_ITEM = bigInt(2019)

const part1 = R.pipe(shuffleDeck(PART1_LENGTH), R.indexOf(PART1_ITEM))

const powCoeffs = R.curry((e, length, [a, b]) => {
  const newa = a.modPow(e, length)
  const newb = b
    .multiply(bigInt(1).subtract(newa))
    .multiply(
      bigInt(1)
        .subtract(a)
        .mod(length)
        .modInv(length)
        .mod(length),
    )
    .mod(length)

  return [newa, newb]
})

const PART2_LENGTH = bigInt('119315717514047')
const PART2_ITERS = bigInt('101741582076661')
const PART2_INDEX = 2020

const part2 = R.pipe(
  (input) => inputCoeffs(PART2_LENGTH, input, [1, 0]),
  powCoeffs(PART2_ITERS, PART2_LENGTH),
  getIndex(PART2_INDEX, PART2_LENGTH),
  R.toString,
)

module.exports = {
  newDeck,
  newStack,
  cutN,
  dealIncN,
  shuffleDeck,
  part1,
  part2,
}
