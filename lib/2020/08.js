const R = require('ramda')

const REGEX_INSTRUCTION = /^(?<op>[a-z]{3}) (?<arg>[+-]\d+)$/

const parseInstruction = (instruction) => {
  const match = REGEX_INSTRUCTION.exec(instruction)

  if (!match) return null

  return {
    op: match.groups.op,
    arg: parseInt(match.groups.arg, 10),
  }
}

const parseCode = (input) => input.trim().split('\n').map(parseInstruction)

const step = ({ ip, acc }, { op, arg }) => {
  switch (op) {
    case 'jmp':
      return {
        ip: ip + arg,
        acc,
      }
    case 'acc':
      return {
        ip: ip + 1,
        acc: acc + arg,
      }
    case 'nop':
      return {
        ip: ip + 1,
        acc,
      }
    default:
      throw new Error(`Unknown op ${op}`)
  }
}

const runToEnd = (code) => {
  let state = { ip: 0, acc: 0 }
  const visited = {}

  while (!visited[state.ip] && state.ip < code.length) {
    visited[state.ip] = true
    state = step(state, code[state.ip])
  }

  return state
}

const part1 = (input) => runToEnd(parseCode(input)).acc

const part2 = (input) => {
  const code = parseCode(input)

  for (let i = 0; i < code.length; i++) {
    if (code[i].op === 'acc') continue

    const fixedCode = R.adjust(
      i,
      ({ op, arg }) => ({
        op: op === 'nop' ? 'jmp' : 'nop',
        arg,
      }),
      code,
    )

    const endState = runToEnd(fixedCode)

    if (endState.ip === code.length) {
      return endState.acc
    }
  }

  throw new Error('Solution not found')
}

module.exports = {
  part1,
  part2,
}
