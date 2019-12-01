const R = require('ramda')
const { parseText } = require('../utils')

const LETTERS = R.split('', 'abcdefghijklmnopqrstuvwxyz')

const REGEX = R.pipe(
  R.map((x) => `${x}${x.toUpperCase()}|${x.toUpperCase()}${x}`),
  R.join('|'),
  (x) => new RegExp(`(${x})`, 'g'),
)(LETTERS)

const react = (input) => {
  let old = input

  while (true) {
    let match = old.replace(REGEX, '')

    if (match === old) {
      return old
    }

    old = match
  }
}

const part1 = R.pipe(parseText, react, R.length)

const part2 = (input) => {
  input = parseText(input)

  return R.pipe(
    R.map(
      R.pipe(
        (letter) =>
          input.replace(
            new RegExp(`[${letter}${letter.toUpperCase()}]`, 'g'),
            '',
          ),
        react,
        R.length,
      ),
    ),
    R.apply(Math.min),
  )(LETTERS)
}

module.exports = {
  react,
  part1,
  part2,
}
