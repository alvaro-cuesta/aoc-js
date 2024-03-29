const R = require('ramda')
const { matchAllOverlapping } = require('../utils')

const parseInput = (input) => input.trim().split('\n')

const supportsTLS = (address) => {
  let hasAbba = false

  for (const match of matchAllOverlapping(address, /(.)(.)\2\1/g)) {
    if (match[1] === match[2]) continue

    const previous = address.slice(0, match.index)
    const lastOpen = previous.lastIndexOf('[')
    const lastClose = previous.lastIndexOf(']')

    if (lastOpen > lastClose) {
      return false
    }

    if (lastClose >= lastOpen) {
      hasAbba = true
      continue
    }
  }

  return hasAbba
}

const part1 = R.pipe(parseInput, R.filter(supportsTLS), R.length)

const supportsSSL = (address) => {
  let abas = []
  let babs = []

  for (const match of matchAllOverlapping(address, /(.)(.)\1/g)) {
    if (match[1] === match[2]) continue

    const previous = address.slice(0, match.index)
    const lastOpen = previous.lastIndexOf('[')
    const lastClose = previous.lastIndexOf(']')

    if (lastClose >= lastOpen) {
      abas.push(match[1] + match[2] + match[1])
    } else {
      babs.push(match[2] + match[1] + match[2])
    }
  }

  return abas.some((x) => babs.includes(x))
}

const part2 = R.pipe(parseInput, R.filter(supportsSSL), R.length)

module.exports = {
  supportsTLS,
  part1,
  supportsSSL,
  part2,
}
