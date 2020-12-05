const { sortedFrequency } = require('../utils')

const part1 = (input) => {
  const messages = input.trim().split('\n')

  return Array(messages[0].length)
    .fill()
    .map((_, i) => sortedFrequency(messages.map((m) => m[i]))[0][0])
    .join('')
}

const part2 = (input) => {
  const messages = input.trim().split('\n')

  return Array(messages[0].length)
    .fill()
    .map((_, i) => {
      const frequencies = sortedFrequency(messages.map((m) => m[i]))
      return frequencies[frequencies.length - 1][0]
    })
    .join('')
}

module.exports = {
  part1,
  part2,
}
