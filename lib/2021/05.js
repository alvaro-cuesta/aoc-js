const parseCoord = (coord) => coord.split(',').map((x) => parseInt(x, 10))

const parseLine = (line) => line.split(' -> ').map(parseCoord)

const parseInput = (input) => input.trim().split('\n').map(parseLine)

const from0To = (to) => {
  const n = Math.abs(to) + 1
  const min = Math.min(to, 0)

  return Array(n)
    .fill()
    .map((_, i) => min + i)
}

const linePoints = ([[fx, fy], [tx, ty]]) => {
  if (fx === tx) {
    return from0To(ty - fy).map((d) => [fx, fy + d])
  } else if (fy === ty) {
    return from0To(tx - fx).map((d) => [fx + d, fy])
  } else if (fx - tx === fy - ty) {
    return from0To(tx - fx).map((d) => [fx + d, fy + d])
  } else if (fx - tx === ty - fy) {
    return from0To(tx - fx).map((d) => [fx + d, fy - d])
  } else {
    throw new Error('Line is not horizontal or vertical or diagonal')
  }
}

const countCrosses = (points) => {
  const crosses = points.reduce((acc, point) => {
    acc[point] = (acc[point] || 0) + 1

    return acc
  }, {})

  return Object.values(crosses).filter((x) => x > 1).length
}

const part1 = (input) => {
  const points = parseInput(input)
    .filter(([[fx, fy], [tx, ty]]) => fx === tx || fy === ty)
    .flatMap(linePoints)

  return countCrosses(points)
}

const part2 = (input) => {
  const points = parseInput(input).flatMap(linePoints)

  return countCrosses(points)
}

module.exports = {
  part1,
  part2,
}
