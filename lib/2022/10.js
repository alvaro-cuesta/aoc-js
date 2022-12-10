const R = require('ramda')
const { parseDecimal, parseLines } = require('../utils')

const parseInstruction = (instruction) =>
  instruction === 'noop' ? [null] : [null, parseDecimal(instruction.slice(5))]

const runInstruction = R.curry((cb, state, instruction, cycle) => ({
  ...state,
  regX: state.regX + instruction ?? 0,
  acc: state.acc + cb(state.regX, cycle),
}))

const makeSolver = (initialAcc, cb) =>
  R.pipe(
    parseLines,
    R.chain(parseInstruction),
    R.addIndex(R.reduce)(runInstruction(cb), { regX: 1, acc: initialAcc }),
    R.prop('acc'),
  )

const READ_CYCLES = [20, 60, 100, 140, 180, 220]
const part1 = makeSolver(0, (regX, cycle) =>
  READ_CYCLES.includes(cycle + 1) ? (cycle + 1) * regX : 0,
)

const CRT_WIDTH = 40
const part2 = makeSolver('', (regX, cycle) => {
  const x = cycle % CRT_WIDTH

  return (
    (Math.abs(regX - x) < 2 ? '#' : ' ') + (x === CRT_WIDTH - 1 ? '\n' : '')
  )
})

module.exports = {
  part1,
  part2,
}
