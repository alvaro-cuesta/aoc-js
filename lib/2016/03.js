const R = require('ramda')

const parseTriangle = (string) => {
  const match = string.match(/^\s*(\d+)\s+(\d+)\s+(\d+)\s*$/)

  return [match[1], match[2], match[3]].map((x) => parseInt(x))
}

const parseTriangles = (input) => input.trim().split('\n').map(parseTriangle)

const isPossible = ([a, b, c]) => a + b > c && a + c > b && b + c > a

const part1 = (input) => parseTriangles(input).filter(isPossible).length

const part2 = R.pipe(
  parseTriangles,
  R.flatten,
  (x) =>
    x.map(
      (_, i, arr) =>
        arr[Math.floor((i % 9) / 3) + (i % 3) * 3 + Math.floor(i / 9) * 9],
    ),
  R.splitEvery(3),
  R.filter(isPossible),
  R.length,
)

module.exports = {
  part1,
  part2,
}
