const R = require('ramda')
const { parseRAM, runToHalt } = require('./intcode')
const { permutations } = require('../utils')

const NUM_AMPLIFIERS = 5

const runPhases = (ram) => (phases) => {
  let input = 0

  for (const phase of phases) {
    input = runToHalt([phase, input], [...ram]).output[0]
  }

  return input
}

const part1 = (input) => {
  const pipelineRunner = R.pipe(parseRAM, runPhases)(input)

  const phaseCombinations = R.pipe(
    R.range(0),
    permutations,
    R.map(pipelineRunner),
    (x) => x.reduce(R.max),
  )(NUM_AMPLIFIERS)

  return phaseCombinations
}

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
