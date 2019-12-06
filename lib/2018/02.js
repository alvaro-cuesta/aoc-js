const R = require('ramda')
const { parseLines } = require('../utils')

const countLetters = R.pipe(R.split(''), R.countBy(R.identity))

const matchingLetters = R.pipe(
  countLetters,
  R.values,
  R.applySpec({
    2: R.includes(2),
    3: R.includes(3),
  }),
)

const part1 = R.pipe(
  parseLines,
  R.map(matchingLetters),
  R.converge(R.multiply, [
    R.pipe(R.filter(R.nth(2)), R.length),
    R.pipe(R.filter(R.nth(3)), R.length),
  ]),
)

const part2 = (input) => {
  const inputLines = parseLines(input)

  for (let i = 0; i < inputLines.length; i++) {
    other: for (let j = i + 1; j < inputLines.length; j++) {
      const a = inputLines[i]
      const b = inputLines[j]
      let differentK

      for (let k = 0; k < a.length; k++) {
        if (a[k] !== b[k]) {
          if (differentK !== undefined) {
            continue other
          }

          differentK = k
        }
      }

      if (differentK !== undefined) {
        return a.slice(0, differentK) + a.slice(differentK + 1)
      }
    }
  }

  throw new Error('Boxes not found')
}

module.exports = {
  part1,
  part2,
}
