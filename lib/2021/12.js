const { parseLines } = require('../utils')

const parsePaths = (input) =>
  parseLines(input)
    .map((line) => line.split('-'))
    .reduce((acc, [from, to]) => {
      acc[from] = [...(acc[from] ?? []), to]
      acc[to] = [...(acc[to] ?? []), from]

      return acc
    }, {})

const isBigCave = (cave) => cave.toUpperCase() === cave
const isSmallCave = (cave) => cave.toLowerCase() === cave

const solve = (paths, adjacencyCheck) => {
  const remaining = [['start']]
  const finished = []

  while (remaining.length > 0) {
    const current = remaining.shift()
    const currentFrom = current[current.length - 1]

    if (currentFrom === 'end') {
      finished.push(current)
      continue
    }

    const adjacent = (paths[currentFrom] ?? [])
      .filter((to) => adjacencyCheck(current, to))
      .map((cave) => [...current, cave])

    remaining.push(...adjacent)
  }

  return finished
}

const part1AdjacencyCheck = (current, to) =>
  isBigCave(to) || !current.includes(to)

const part1 = (input) => solve(parsePaths(input), part1AdjacencyCheck).length

const part2AdjacencyCheck = (current, to) =>
  isBigCave(to) ||
  !current.includes(to) ||
  (to !== 'start' &&
    current
      .filter(isSmallCave)
      .every((cave) => current.filter((x) => x === cave).length === 1))

const part2 = (input) => solve(parsePaths(input), part2AdjacencyCheck).length

module.exports = {
  part1,
  part2,
}
