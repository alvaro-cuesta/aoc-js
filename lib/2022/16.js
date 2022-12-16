const R = require('ramda')
const { parseLines, regexGroups, parseDecimal } = require('../utils')
const { Queue } = require('@datastructures-js/queue')

const PERFORMANCE_DEBUG = false

const parseValves = R.pipe(
  parseLines,
  R.map(
    R.pipe(
      regexGroups(
        /Valve (?<valve>..) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<tunnels>.+)/,
      ),
      R.evolve({
        rate: parseDecimal,
        tunnels: R.split(', '),
      }),
    ),
  ),
  R.indexBy(R.prop('valve')),
)

const candidateToKey = ({ current, openValves, steps }) =>
  `${current}@${steps}-${openValves.sort().join(',')}`

const part1 = (input) => {
  const valves = parseValves(input)

  const nextOpen = (candidate) => ({
    ...candidate,
    openValves: [...candidate.openValves, candidate.current],
    rate: candidate.rate + valves[candidate.current].rate,
    totalReleased: candidate.totalReleased + candidate.rate,
    steps: candidate.steps + 1,
  })

  const nextMove = (candidate, moveTo) => ({
    ...candidate,
    current: moveTo,
    totalReleased: candidate.totalReleased + candidate.rate,
    steps: candidate.steps + 1,
  })

  const initial = {
    current: 'AA',
    openValves: [],
    rate: 0,
    totalReleased: 0,
    steps: 0,
  }

  const queue = Queue.fromArray([initial])
  const visited = {}

  let i = 0,
    steps = 0

  while (!queue.isEmpty()) {
    const candidate = queue.dequeue()

    if (PERFORMANCE_DEBUG) {
      if (candidate.steps > steps) {
        steps = candidate.steps
      }

      if (i % 10000 === 0) {
        console.log(i, steps, queue.size())
      }

      i++
    }

    const candidateKey = candidateToKey(candidate)

    if (
      visited[candidateKey] !== undefined &&
      visited[candidateKey].totalReleased >= candidate.totalReleased
    ) {
      continue
    }

    visited[candidateKey] = candidate

    if (candidate.steps === 30) {
      continue
    }

    for (let i = 1; i <= 30 - candidate.steps; i++) {
      const virtualCandidate = {
        ...candidate,
        totalReleased: candidate.totalReleased + candidate.rate * i,
        steps: candidate.steps + i,
      }
      const virtualCandidateKey = candidateToKey(virtualCandidate)
      if (
        !visited[virtualCandidateKey] ||
        visited[candidateKey].totalReleased < virtualCandidate.totalReleased
      ) {
        visited[virtualCandidateKey] = virtualCandidate
      }
    }

    if (
      !candidate.openValves.includes(candidate.current) &&
      valves[candidate.current].rate > 0
    ) {
      queue.enqueue(nextOpen(candidate))
    }

    for (const tunnel of valves[candidate.current].tunnels) {
      queue.enqueue(nextMove(candidate, tunnel))
    }
  }

  return Object.values(visited).reduce(R.maxBy(R.prop('totalReleased')))
    .totalReleased
}

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
