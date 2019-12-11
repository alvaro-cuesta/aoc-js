/*
 * NOTE:
 * Although day 9 requires "The computer should have support for large numbers."
 * it doesn't specify what "large" means. I passed the tests with regular JS
 * integers (53 bits) so bigint support isn't implemented.
 *
 * Number.MAX_SAFE_INTEGER === 9007199254740991 (2**53 - 1, 16 digits but not all 9s)
 *
 * We'll see if this bites me in future days.
 */

const R = require('ramda')
const { parseText, parseDecimal } = require('../utils')

const MODES = {
  POSITION: 'POSITION',
  IMMEDIATE: 'IMMEDIATE',
  RELATIVE: 'RELATIVE',
}

const parseRAM = R.pipe(parseText, R.split(','), R.map(parseDecimal))

const makePointer = ({ ram, ip, base }) => ([value, mode], i) => {
  switch (mode) {
    default:
    case MODES.POSITION:
      return { r: ram[value] || 0, w: value }
    case MODES.IMMEDIATE:
      return { r: value, w: ip + 1 + i }
    case MODES.RELATIVE:
      return { r: ram[base + value] || 0, w: base + value }
  }
}

const makeOpcode = (arity, genFn) =>
  function*(modes, state) {
    const { ram, ip } = state
    const args = ram.slice(ip + 1, ip + 1 + arity)
    const pointers = R.pipe(R.zip, R.addIndex(R.map)(makePointer(state)))(
      args,
      modes,
    )

    const result = yield* genFn(pointers, state)

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
  makeOpcode(3, function* binaryOpOpcode(
    [{ r: a }, { r: b }, { w: o }],
    { ram },
  ) {
    ram[o] = binaryOp(a, b)
    return { ram }
  })

const makeAbsJumpOpcode = (pred) =>
  // eslint-disable-next-line require-yield
  makeOpcode(2, function*([{ r: a }, { r: b }]) {
    return pred(a) ? { ip: b } : {}
  })

const intBoolean = (x) => (x ? 1 : 0)

const opcodes = {
  // add
  1: makeBinaryOpOpcode(R.add),

  // multiply
  2: makeBinaryOpOpcode(R.multiply),

  // input
  3: makeOpcode(1, function* input([{ w: o }], { ram }) {
    ram[o] = yield { type: 'input' }
    return { ram }
  }),

  // output
  4: makeOpcode(1, function* output([{ r: i }]) {
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
  9: makeOpcode(1, function* adjustBase([{ r: i }], { base }) {
    return { base: base + i }
  }),

  // halt
  // eslint-disable-next-line require-yield
  99: makeOpcode(0, function*() {
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

function* spawn(rom) {
  let state = {
    ram: [...rom],
    ip: 0,
    base: 0,
    halted: false,
  }

  while (!state.halted) {
    state = yield* step(state)
  }

  return state
}

const iteratorExecutor = R.curry(function* iteratorExecutor(inputIt, thread) {
  let { value, done } = thread.next()

  for (;;) {
    if (done) {
      return value
    }

    switch (value.type) {
      case 'input': {
        const { value: itValue, done: itDone } = inputIt.next()

        if (itDone) {
          throw new Error('Input underflow')
        }

        ;({ value, done } = thread.next(itValue))

        break
      }

      case 'output': {
        yield value.value
        ;({ value, done } = thread.next())

        break
      }

      default: {
        throw new Error('Unreachable')
      }
    }
  }
})

const arrayExecutor = R.curry((input, thread) => {
  let i = 0
  const output = []

  let { value, done } = thread.next()

  for (;;) {
    if (done) {
      return { ...value, remainingInput: input.slice(i), output }
    }

    switch (value.type) {
      case 'input': {
        if (input.length <= i) {
          throw new Error('Input underflow')
        }

        ;({ value, done } = thread.next(input[i]))
        i++

        break
      }

      case 'output': {
        output.push(value.value)
        ;({ value, done } = thread.next())
        break
      }

      default: {
        throw new Error('Unreachable')
      }
    }
  }
})

const noIOExecutor = (thread) => {
  const { value, done } = thread.next()

  if (done) {
    return value
  }

  switch (value) {
    case 'input': {
      throw new Error('Input underflow')
    }

    case 'output': {
      throw new Error('Output overflow')
    }

    default: {
      throw new Error('Unreachable')
    }
  }
}

module.exports = {
  parseRAM,
  opcodes,
  step,
  spawn,
  iteratorExecutor,
  arrayExecutor,
  noIOExecutor,
}
