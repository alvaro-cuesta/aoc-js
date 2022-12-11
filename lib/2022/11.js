const R = require('ramda')
const { parseText, regexGroups, timesValue } = require('../utils')

const operate = (monkey, worry) => {
  const rhs = monkey.operatorRHS === 'old' ? worry : monkey.operatorRHS

  switch (monkey.operator) {
    case '+':
      return worry + rhs
    case '*':
      return worry * rhs
    default:
      throw new Error(`Unknown operator ${monkey.operator}`)
  }
}

const getNextMonkey = (monkey, worry) =>
  worry % monkey.testDivisibleBy === 0n ? monkey.ifTrue : monkey.ifFalse

const parseMonkeys = R.pipe(
  parseText,
  R.split('\n\n'),
  R.map(
    R.pipe(
      regexGroups(
        /Monkey (?<id>\d+):\n {2}Starting items: (?<startingItems>(?:\d+(?:, )?)+)\n {2}Operation: new = old (?<operator>.) (?<operatorRHS>[^\n]+)\n {2}Test: divisible by (?<testDivisibleBy>\d+)\n {4}If true: throw to monkey (?<ifTrue>\d+)\n {4}If false: throw to monkey (?<ifFalse>\d+)/m,
      ),
      (monkey) => {
        const operatorRHS =
          monkey.operatorRHS === 'old' ? 'old' : BigInt(monkey.operatorRHS)

        if (operatorRHS !== 'old' && typeof operatorRHS !== 'bigint') {
          throw new Error(`Unknown RHS ${monkey.operatorRHS}`)
        }

        return {
          id: monkey.id,
          items: R.pipe(R.split(', '), R.map(BigInt))(monkey.startingItems),
          operator: monkey.operator,
          operatorRHS: operatorRHS,
          testDivisibleBy: BigInt(monkey.testDivisibleBy),
          ifTrue: monkey.ifTrue,
          ifFalse: monkey.ifFalse,
          inspected: 0,
        }
      },
    ),
  ),
  R.indexBy(R.prop('id')),
  R.map(R.omit(['id'])),
)

const monkeyRoundMut = R.curry((commonMultiple, lowWorry, monkeys) => {
  for (const id of Object.keys(monkeys)) {
    const monkey = monkeys[id]

    const items = monkey.items

    monkey.items = []

    for (const item of items) {
      const newItem =
        (operate(monkey, item) / (lowWorry ? 3n : 1n)) % commonMultiple
      monkeys[getNextMonkey(monkey, newItem)].items.push(newItem)
      monkey.inspected++
    }
  }

  return monkeys
})

const getMonkeyBusiness = R.pipe(
  R.pluck('inspected'),
  R.values,
  R.sort(R.descend(R.identity)),
  R.take(2),
  R.apply(R.multiply),
)

const getCommonMultiple = R.pipe(
  R.pluck('testDivisibleBy'),
  R.values,
  R.reduce(R.multiply, 1n),
)

const makeSolver = R.curry((iters, lowWorry, input) => {
  const monkeys = parseMonkeys(input)
  const commonMultiple = getCommonMultiple(monkeys)
  const iterated = timesValue(
    monkeyRoundMut(commonMultiple, lowWorry),
    iters,
    monkeys,
  )
  return getMonkeyBusiness(iterated)
})

const part1 = makeSolver(20, true)

const part2 = makeSolver(10000, false)

module.exports = {
  part1,
  part2,
}
