const R = require('ramda')

const OPEN_TO_CLOSED = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const CLOSED_TO_PART1_POINTS = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const OPEN_TO_PART2_POINTS = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

const getLineState = (line) => {
  const stack = []

  for (const char of line) {
    // Opening char
    if (OPEN_TO_CLOSED[char] !== undefined) {
      stack.push(char)
    }
    // Closing char
    else {
      const openChar = stack.pop()

      if (OPEN_TO_CLOSED[openChar] !== char) {
        return { stack, points: CLOSED_TO_PART1_POINTS[char] }
      }
    }
  }

  return { stack, points: 0 }
}

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => getLineState(line.split('')))

const part1 = R.pipe(parseInput, R.pluck('points'), R.sum)

const part2 = R.pipe(
  parseInput,
  R.filter(R.propEq('points', 0)),
  R.map((state) =>
    state.stack
      .reverse()
      .reduce((acc, x) => acc * 5 + OPEN_TO_PART2_POINTS[x], 0),
  ),
  R.sortBy(R.identity),
  (x) => x[Math.floor(x.length / 2)],
)

module.exports = {
  part1,
  part2,
}
