const R = require('ramda')
const intcode = require('./intcode')
const { permutations } = require('../utils')
const assert = require('assert')

const NUM_AMPLIFIERS = 5

const runPhases = (ram) => (phases) => {
  let input = 0

  for (const phase of phases) {
    input = intcode.runToHalt([phase, input], [...ram]).output[0]
  }

  return input
}

const spawnAmplifier = R.curry(function*(ram, phase) {
  const thread = intcode.spawn(ram)

  let lastOutput

  assert.deepStrictEqual(
    thread.next(),
    { done: false, value: { type: 'input' } },
    'Expected request for phase',
  )

  for (;;) {
    const input = yield lastOutput

    {
      const { value, done } = thread.next(phase)

      if (done) {
        return lastOutput
      }

      assert.strictEqual(value.type, 'input', 'Expected request for input')
    }

    {
      const { value, done } = thread.next(input)
      assert.strictEqual(done, false, 'Expected output')
      assert.strictEqual(value.type, 'output', 'Expected output')

      lastOutput = value.value
    }
  }
})

const runFeedbackPhases = (ram) => (phases) => {
  const amplifiers = R.map(spawnAmplifier(ram), phases)

  for (const amplifier of amplifiers) {
    assert.deepStrictEqual(
      amplifier.next(),
      { done: false, value: undefined },
      'Expected start of amplifier',
    )
  }

  let input = 0

  for (;;) {
    for (const amplifier of amplifiers) {
      const { value, done } = amplifier.next(input)

      if (done) {
        return input
      }

      input = value
    }
  }
}

const part1 = (input) => {
  const pipelineRunner = R.pipe(intcode.parseRAM, runPhases)(input)

  const phaseCombinations = R.pipe(
    R.range(0),
    permutations,
    R.map(pipelineRunner),
    (x) => x.reduce(R.max),
  )(NUM_AMPLIFIERS)

  return phaseCombinations
}

const part2 = (input) => {
  const pipelineRunner = R.pipe(intcode.parseRAM, runFeedbackPhases)(input)

  const phaseCombinations = R.pipe(
    R.range(0),
    R.map(R.add(5)),
    permutations,
    R.map(pipelineRunner),
    (x) => x.reduce(R.max),
  )(NUM_AMPLIFIERS)

  return phaseCombinations
}

module.exports = {
  part1,
  part2,
}
