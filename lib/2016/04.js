const R = require('ramda')

const parseRoom = (str) => {
  const match = str.match(/^([a-z-]+)-(\d+)\[([a-z]{5})\]$/)

  if (match === null) {
    console.error(str)
    throw new Error('Invalid room match')
  }

  return {
    name: match[1],
    sector: parseInt(match[2], 10),
    checksum: match[3],
  }
}

const isValidRoom = ({ name, checksum }) => {
  const occurrences = {}

  for (const letter of name.split('')) {
    if (letter === '-') continue
    occurrences[letter] = (occurrences[letter] || 0) + 1
  }

  const mostFrequent = R.pipe(
    R.toPairs,
    R.sortWith([R.descend(R.nth(1)), R.ascend(R.identity)]),
    R.take(5),
    R.map(R.nth(0)),
    R.join(''),
  )(occurrences)

  return mostFrequent === checksum
}

const parseInput = (input) =>
  input.trim().split('\n').map(parseRoom).filter(isValidRoom)

const part1 = (input) =>
  parseInput(input).reduce((sum, { sector }) => sum + sector, 0)

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

const decipherName = ({ name, sector }) =>
  name
    .split('')
    .map((x) => {
      if (x === '-') return ' '

      return ALPHABET[(ALPHABET.indexOf(x) + sector) % ALPHABET.length]
    })
    .join('')

const part2 = (input) =>
  parseInput(input).find((x) => decipherName(x) === 'northpole object storage')
    .sector

module.exports = {
  parseRoom,
  isValidRoom,
  part1,
  decipherName,
  part2,
}
