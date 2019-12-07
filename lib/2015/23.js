const R = require('ramda')
const { parseLines } = require('../utils')

const REGEX_INST_HLF = /^hlf (?<reg>[ab])$/
const REGEX_INST_TPL = /^tpl (?<reg>[ab])$/
const REGEX_INST_INC = /^inc (?<reg>[ab])$/
const REGEX_INST_JMP = /^jmp (?<off>[+-]\d+)$/
const REGEX_INST_JIE = /^jie (?<reg>[ab]), (?<off>[+-]\d+)$/
const REGEX_INST_JIO = /^jio (?<reg>[ab]), (?<off>[+-]\d+)$/

const makeParseOp = (regex, fn) => (instruction) => {
  const match = instruction.match(regex)

  if (!match) return

  const reg = match.groups.reg

  return ({ [reg]: v }) => ({ [reg]: fn(v) })
}

const makeParseJmp = (regex, pred = undefined) => (instruction) => {
  const match = instruction.match(regex)

  if (!match) return

  const reg = match.groups.reg
  const off = parseInt(match.groups.off, 10)

  return pred && reg
    ? ({ [reg]: v, ip }) => (pred(v) ? { ip: ip + off } : {})
    : ({ ip }) => ({ ip: ip + off })
}

const parseHlf = makeParseOp(REGEX_INST_HLF, (v) => Math.floor(v / 2))
const parseTpl = makeParseOp(REGEX_INST_TPL, (v) => v * 3)
const parseInc = makeParseOp(REGEX_INST_INC, (v) => v + 1)
const parseJmp = makeParseJmp(REGEX_INST_JMP)
const parseJie = makeParseJmp(REGEX_INST_JIE, (v) => v % 2 === 0)
const parseJio = makeParseJmp(REGEX_INST_JIO, (v) => v === 1)

const parseInstruction = (instruction) =>
  parseHlf(instruction) ||
  parseTpl(instruction) ||
  parseInc(instruction) ||
  parseJmp(instruction) ||
  parseJie(instruction) ||
  parseJio(instruction)

const compile = R.pipe(parseLines, R.map(parseInstruction))

const DEFAULT_STATE = {
  ip: 0,
  a: 0,
  b: 0,
}

const makeRunner = (state = DEFAULT_STATE) => (compiled) => {
  while (state.ip >= 0 && state.ip < compiled.length) {
    const newState = compiled[state.ip](state)

    state = {
      ...state,
      ...newState,
      ip: newState.ip ? newState.ip : state.ip + 1,
    }
  }

  return state
}

const part1 = R.pipe(compile, makeRunner(), R.prop('b'))

const part2 = R.pipe(
  compile,
  makeRunner({ ...DEFAULT_STATE, a: 1 }),
  R.prop('b'),
)

module.exports = {
  compile,
  makeRunner,
  part1,
  part2,
}
