const R = require('ramda')

const parseRow = (row) => {
  const [patterns, output] = row.split(' | ').map((x) => x.split(' '))

  return {
    patterns,
    output,
  }
}

const parseInput = (input) => input.trim().split('\n').map(parseRow)

const part1 = (input) => {
  const allOutput = parseInput(input).flatMap((x) => x.output)

  const count1 = allOutput.filter((x) => x.length === 2).length
  const count4 = allOutput.filter((x) => x.length === 4).length
  const count7 = allOutput.filter((x) => x.length === 3).length
  const count8 = allOutput.filter((x) => x.length === 7).length

  return count1 + count4 + count7 + count8
}

const findFromEasy = (
  possible,
  { signals1, signals4, signals7, signals8 },
  { in1, in4, in7, in8 },
) => {
  const candidates = possible.filter(
    (x) =>
      signals1.includes(x) === in1 &&
      signals4.includes(x) === in4 &&
      signals7.includes(x) === in7 &&
      signals8.includes(x) === in8,
  )

  const newPossible = possible.filter((x) => !candidates.includes(x))

  return [candidates, newPossible]
}

const findFromTotal = (
  allSignals,
  [candidate1Letter, candidate2Letter],
  [count1, count2],
) => {
  const candidate1Count = allSignals.filter((letters) =>
    letters.includes(candidate1Letter),
  ).length
  const candidate2Count = allSignals.filter((letters) =>
    letters.includes(candidate2Letter),
  ).length

  const segment1 =
    candidate1Count === count1
      ? candidate1Letter
      : candidate2Count === count1
      ? candidate2Letter
      : null

  const segment2 =
    candidate1Count === count2
      ? candidate1Letter
      : candidate2Count === count2
      ? candidate2Letter
      : null

  return [segment1, segment2]
}

const POSSIBLE_SIGNALS = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

const A_EASY_SIGNALS = {
  in1: false,
  in4: false,
  in7: true,
  in8: true,
}
const BD_EASY_SIGNALS = {
  in1: false,
  in4: true,
  in7: false,
  in8: true,
}
const CF_EASY_SIGNALS = {
  in1: true,
  in4: true,
  in7: true,
  in8: true,
}
const TOTAL_E = 4
const TOTAL_G = 7
const TOTAL_C = 8
const TOTAL_F = 9
const TOTAL_B = 6
const TOTAL_D = 7

const findRowSegments = (signals) => {
  const easySignals = {
    signals1: signals.find((x) => x.length === 2),
    signals4: signals.find((x) => x.length === 4),
    signals7: signals.find((x) => x.length === 3),
    signals8: signals.find((x) => x.length === 7),
  }

  // Find "a"
  const [aSegmentCandidates, possibleWithoutA] = findFromEasy(
    POSSIBLE_SIGNALS,
    easySignals,
    A_EASY_SIGNALS,
  )
  if (aSegmentCandidates.length !== 1) {
    throw new Error('Found > 1 candidate for `a` segment')
  }
  const aSegment = aSegmentCandidates[0]

  // Find "b+d"
  const [bdSegments, possibleWithoutABD] = findFromEasy(
    possibleWithoutA,
    easySignals,
    BD_EASY_SIGNALS,
  )
  if (bdSegments.length !== 2) {
    throw new Error('Found > 2 candidates for `bd` segments')
  }

  // Find "c+f"
  // e+g = unknown
  const [cfSegments, egSegments] = findFromEasy(
    possibleWithoutABD,
    easySignals,
    CF_EASY_SIGNALS,
  )
  if (cfSegments.length !== 2) {
    throw new Error('Found > 2 candidates for `cf` segments')
  }
  if (egSegments.length !== 2) {
    throw new Error('Found > 2 candidates for `eg` segments')
  }

  // Find "e" and "g" (7 and 4 times total in signals)
  const [eSegment, gSegment] = findFromTotal(signals, egSegments, [
    TOTAL_E,
    TOTAL_G,
  ])
  if (eSegment === null) {
    throw new Error('Could not find "e" segment')
  }
  if (gSegment === null) {
    throw new Error('Could not find "g" segment')
  }

  // Find "c" and "f" (8 and 9 times total in signals)
  const [cSegment, fSegment] = findFromTotal(signals, cfSegments, [
    TOTAL_C,
    TOTAL_F,
  ])
  if (cSegment === null) {
    throw new Error('Could not find "c" segment')
  }
  if (fSegment === null) {
    throw new Error('Could not find "f" segment')
  }

  // Find "b" and "d" (6 and 7 times total in signals)
  const [bSegment, dSegment] = findFromTotal(signals, bdSegments, [
    TOTAL_B,
    TOTAL_D,
  ])
  if (bSegment === null) {
    throw new Error('Could not find "b" segment')
  }
  if (dSegment === null) {
    throw new Error('Could not find "d" segment')
  }

  return {
    [aSegment]: 'a',
    [bSegment]: 'b',
    [cSegment]: 'c',
    [dSegment]: 'd',
    [eSegment]: 'e',
    [fSegment]: 'f',
    [gSegment]: 'g',
  }
}

const NUMBER_SEGMENTS = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',
}

const makeMapper = (mapping) => (signals) =>
  signals.split('').map((x) => mapping[x])

const decodeNumber = (signalsArray) => {
  const number = Object.entries(NUMBER_SEGMENTS).find(
    ([_, numberSignals]) =>
      numberSignals.length === signalsArray.length &&
      signalsArray.every((signal) => numberSignals.includes(signal)),
  )

  if (number === undefined) {
    throw new Error(`Could not decode number with signals ${signalsArray}`)
  }

  return number[0]
}

const getRowOutput = ({ patterns, output }) => {
  const mapping = findRowSegments(patterns)

  const outputString = output
    .map(makeMapper(mapping))
    .map(decodeNumber)
    .join('')

  return parseInt(outputString, 10)
}

const part2 = (input) => R.sum(parseInput(input).map(getRowOutput))

module.exports = {
  part1,
  part2,
}
