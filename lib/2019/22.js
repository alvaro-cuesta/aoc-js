const R = require('ramda')
const { parseLines, parseDecimal } = require('../utils')

const newDeck = R.range(0)

const newStackIndex = R.curry((length, i) => length - 1 - i)

const newStack = R.curry((deck) =>
  deck.map((_, i) => deck[newStackIndex(deck.length, i)]),
)

const cutNIndex = R.curry((n, length, i) => (i + n + length) % length)

const cutN = R.curry((n, deck) =>
  deck.map((_, i) => deck[cutNIndex(n, deck.length, i)]),
)

const modInverse = (a, m) => {
  const m0 = m
  let y = 0,
    x = 1

  if (m === 1) return 0

  while (a > 1) {
    // q is quotient
    const q = Math.floor(a / m)
    let t = m

    // m is remainder now, process same as
    // Euclid's algo
    m = a % m
    a = t
    t = y

    // Update y and x
    y = x - q * y
    x = t
  }

  // Make x positive
  if (x < 0) x += m0

  return x
}

const dealIncNIndex = R.curry(
  (n, length, i) => (i * modInverse(n, length)) % length,
)

const dealIncN = R.curry((n, deck) =>
  deck.map((_, i) => deck[dealIncNIndex(n, deck.length, i)]),
)

const REGEX_NEW_STACK = /^deal into new stack$/
const REGEX_CUT_N = /^cut (-?\d+)$/
const REGEX_DEAL_INC = /^deal with increment (\d+)$/

const compileLine = (line) => {
  let match

  if ((match = line.match(REGEX_NEW_STACK)) !== null) {
    return newStackIndex
  }

  if ((match = line.match(REGEX_CUT_N)) !== null) {
    return cutNIndex(parseDecimal(match[1]))
  }

  if ((match = line.match(REGEX_DEAL_INC)) !== null) {
    return dealIncNIndex(parseDecimal(match[1]))
  }

  throw new Error(`Could not parse ${line}`)
}

const compileInput = R.pipe(parseLines, R.map(compileLine))

const shuffleDeck = R.curry((n, input) => {
  const fns = compileInput(input).map((x) => x(n))

  return R.range(0, n).map((i) => R.compose(...fns)(i))
})

const part1 = R.pipe(shuffleDeck(10007), R.indexOf(2019))

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  newDeck,
  newStack,
  cutN,
  dealIncN,
  shuffleDeck,
  part1,
  part2,
}
