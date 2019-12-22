const R = require('ramda')
const { parseLines, parseDecimal } = require('../utils')

const newDeck = R.range(0)

const newStack = R.reverse

const cutN = R.curry((n, deck) => [
  ...deck.slice(n, deck.length),
  ...deck.slice(0, n),
])

const dealIncN = R.curry((n, deck) => {
  const acc = []

  for (let i = 0; i < deck.length; i++) {
    acc[(i * n) % deck.length] = deck[i]
  }

  return acc
})

const REGEX_NEW_STACK = /^deal into new stack$/
const REGEX_CUT_N = /^cut (-?\d+)$/
const REGEX_DEAL_INC = /^deal with increment (\d+)$/

const compileLine = (line) => {
  let match

  if ((match = line.match(REGEX_NEW_STACK)) !== null) {
    return newStack
  }

  if ((match = line.match(REGEX_CUT_N)) !== null) {
    return cutN(parseDecimal(match[1]))
  }

  if ((match = line.match(REGEX_DEAL_INC)) !== null) {
    return dealIncN(parseDecimal(match[1]))
  }

  throw new Error(`Could not parse ${line}`)
}

const compileInput = R.pipe(parseLines, R.map(compileLine), (x) => R.pipe(...x))

const shuffleDeck = R.curry((n, input) => compileInput(input)(newDeck(n)))

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
