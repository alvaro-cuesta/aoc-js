const R = require('ramda')
const { parseText, parseDecimal } = require('../utils')

const MODES = {
  POSITION: 'POSITION',
  IMMEDIATE: 'IMMEDIATE',
  RELATIVE: 'RELATIVE',
}

const parseRAM = R.pipe(parseText, R.split(','), R.map(parseDecimal))

const fetchArgument = (ram, base, outArgIndices = []) => ([value, mode], i) => {
  const isOutput = outArgIndices.includes(i)

  if (isOutput) {
    switch (mode) {
      default:
      case MODES.POSITION:
        return value
      case MODES.IMMEDIATE:
        throw new Error('Cannot output in immediate mode')
      case MODES.RELATIVE:
        return base + value
    }
  } else {
    switch (mode) {
      default:
      case MODES.POSITION:
        return ram[value] || 0
      case MODES.IMMEDIATE:
        return value
      case MODES.RELATIVE:
        return ram[base + value] || 0
    }
  }
}

const makeOpcode = (arity, outArgIndices, genFn) =>
  function*(modes, state) {
    const { ram, ip, base } = state
    const args = ram.slice(ip + 1, ip + 1 + arity)
    const fetchedArgs = R.pipe(
      R.zip,
      R.addIndex(R.map)(fetchArgument(ram, base, outArgIndices)),
    )(args, modes)

    const result = yield* genFn(fetchedArgs, state)

    return {
      ...state,
      ...result,
      ip:
        result.ip !== undefined
          ? result.ip
          : // The halt instruction would increase the instruction pointer by 1,
          // but it halts the program instead.
          !result.halted
          ? ip + 1 + arity
          : ip,
    }
  }

const makeBinaryOpOpcode = (binaryOp) =>
  // eslint-disable-next-line require-yield
  makeOpcode(3, [2], function* binaryOpOpcode([a, b, o], { ram }) {
    ram[o] = binaryOp(a, b)
    return { ram }
  })

const makeAbsJumpOpcode = (pred) =>
  // eslint-disable-next-line require-yield
  makeOpcode(2, [], function*([a, b]) {
    return pred(a) ? { ip: b } : {}
  })

const intBoolean = (x) => (x ? 1 : 0)

const opcodes = {
  // add
  1: makeBinaryOpOpcode(R.add),

  // multiply
  2: makeBinaryOpOpcode(R.multiply),

  // input
  3: makeOpcode(1, [0], function* input([o], { ram }) {
    ram[o] = yield { type: 'input' }
    return { ram }
  }),

  // output
  4: makeOpcode(1, [], function* output([i]) {
    yield { type: 'output', value: i }
    return {}
  }),

  // jump-if-true
  5: makeAbsJumpOpcode(R.complement(R.identical)(0)),

  // jump-if-false
  6: makeAbsJumpOpcode(R.identical(0)),

  // less than
  7: makeBinaryOpOpcode(R.pipe(R.lt, intBoolean)),

  // equals
  8: makeBinaryOpOpcode(R.pipe(R.identical, intBoolean)),

  // adjust-base
  // eslint-disable-next-line require-yield
  9: makeOpcode(1, [], function* adjustBase([i], { base }) {
    return { base: base + i }
  }),

  // halt
  // eslint-disable-next-line require-yield
  99: makeOpcode(0, [], function*() {
    return { halted: true }
  }),
}

const decodeMode = (mode) => {
  switch (mode) {
    case '0':
      return MODES.POSITION
    case '1':
      return MODES.IMMEDIATE
    case '2':
      return MODES.RELATIVE
    default:
      throw new Error(`Unknown mode ${mode}`)
  }
}

const decodeOpcode = R.pipe(
  R.toString,
  (x) => x.padStart(5, '0'),
  R.applySpec({
    opcode: R.pipe(R.slice(3, +Infinity), parseDecimal),
    modes: R.pipe(R.slice(0, 3), R.split(''), R.reverse, R.map(decodeMode)),
  }),
)

function* step(state) {
  const { opcode, modes } = decodeOpcode(state.ram[state.ip])

  return yield* opcodes[opcode](modes, state)
}

function* spawn(ram) {
  let state = {
    ram: [...ram],
    ip: 0,
    base: 0,
    halted: false,
  }

  while (!state.halted) {
    state = yield* step(state)
  }

  return state
}

const runToHalt = R.curry((input, ram) => {
  const thread = spawn(ram)

  let i = 0
  let output = []
  let nextInput = undefined

  for (;;) {
    const { value, done } = thread.next(nextInput)

    nextInput = undefined

    if (done) {
      return { ...value, input: input.slice(i), output }
    }

    switch (value.type) {
      case 'input': {
        if (input.length <= i) {
          throw new Error('Input underflow')
        }

        nextInput = input[i]

        i++
        break
      }

      case 'output': {
        output = [...output, value.value]
        break
      }

      default: {
        throw new Error('Unreachable')
      }
    }
  }
})

module.exports = {
  parseRAM,
  opcodes,
  step,
  spawn,
  runToHalt,
}
