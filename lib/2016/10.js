const R = require('ramda')

const REGEX_VALUE = /^value (?<value>\d+) goes to bot (?<botId>\d+)$/
const REGEX_GIVE = /^bot (?<fromId>\d+) gives low to (?<lowType>bot|output) (?<lowId>\d+) and high to (?<highType>bot|output) (?<highId>\d+)$/

const parse = (input) => {
  const instructions = input.trim().split('\n')

  const tree = {
    inputs: {},
    bots: {},
    outputs: {},
  }

  for (const instruction of instructions) {
    let match

    if ((match = instruction.match(REGEX_VALUE)) !== null) {
      const { value, botId } = match.groups

      tree.inputs[value] = { type: 'bot', id: botId }

      continue
    }

    if ((match = instruction.match(REGEX_GIVE)) !== null) {
      const { fromId, lowType, lowId, highType, highId } = match.groups

      tree.bots[fromId] = {
        lowTo: { type: lowType, id: lowId },
        highTo: { type: highType, id: highId },
      }

      continue
    }

    throw new Error(`Unknown instruction ${instruction}`)
  }

  const moveValue = (value, { type, id }) => {
    const into = tree[`${type}s`]

    into[id] = into[id] || {}
    into[id].values = [...(into[id].values || []), value]

    if (into[id].values.length === 2) {
      into[id].low = Math.min(...into[id].values)
      into[id].high = Math.max(...into[id].values)

      moveValue(into[id].low, into[id].lowTo)
      moveValue(into[id].high, into[id].highTo)
    }
  }

  for (const [value, move] of Object.entries(tree.inputs)) {
    moveValue(value, move)
  }

  return tree
}

const part1 = R.pipe(
  parse,
  R.prop('bots'),
  R.toPairs,
  R.find(([_, { low, high }]) => low === 17 && high === 61),
  R.head,
)

const part2 = (input) => {
  const { outputs } = parse(input)

  return outputs[0].values[0] * outputs[1].values[0] * outputs[2].values[0]
}

module.exports = {
  part1,
  part2,
}
