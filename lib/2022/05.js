const R = require('ramda')
const { parseDecimal, parseText } = require('../utils')

const parseStackText = R.pipe(
  R.split('\n'),
  R.init,
  R.map(R.pipe(R.splitEvery(4), R.map(R.replace(/[ [\]]/g, '')))),
  R.transpose,
  R.map(R.pipe(R.reject(R.isEmpty), R.reverse)),
)

const parseInstruction = R.pipe(
  R.match(/move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/),
  R.prop('groups'),
  R.map(parseDecimal),
)

const parseInstructions = R.pipe(R.split('\n'), R.map(parseInstruction))

const applyInstructionPart1 = (stacks, { count, from, to }) => {
  for (let i = 0; i < count; i++) {
    stacks[to - 1].push(stacks[from - 1].pop())
  }

  return stacks
}

const makeSolver = (applyInstructionFn) =>
  R.pipe(
    parseText,
    R.split('\n\n'),
    R.apply(
      R.useWith(R.reduce(applyInstructionFn), [
        parseStackText,
        parseInstructions,
      ]),
    ),
    R.chain(R.last),
    R.join(''),
  )

const part1 = makeSolver(applyInstructionPart1)

const applyInstructionPart2 = (stacks, { count, from, to }) => {
  const moving = stacks[from - 1].slice(-count)

  stacks[from - 1] = stacks[from - 1].slice(0, -count)
  stacks[to - 1] = [...stacks[to - 1], ...moving]

  return stacks
}

const part2 = makeSolver(applyInstructionPart2)

module.exports = {
  parseStackText,
  part1,
  part2,
}
