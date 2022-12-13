const R = require('ramda')
const { parseText, parseLines, enumerate } = require('../utils')

const parsePacket = (packet) => {
  return JSON.parse(packet)
}

const comparePackets = (left, right) => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      return -1
    }

    if (left > right) {
      return 1
    }

    return 0
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    const len = Math.max(left.length, right.length)

    for (let i = 0; i < len; i++) {
      if (left[i] === undefined) {
        return -1
      }

      if (right[i] === undefined) {
        return 1
      }

      const compared = comparePackets(left[i], right[i])

      if (compared !== 0) {
        return compared
      }
    }

    return 0
  }

  if (typeof left === 'number') {
    return comparePackets([left], right)
  }

  if (typeof right === 'number') {
    return comparePackets(left, [right])
  }

  return 0
}

const part1 = R.pipe(
  parseText,
  R.split('\n\n'),
  R.map(R.pipe(R.split('\n'), R.map(parsePacket), R.apply(comparePackets))),
  enumerate,
  R.filter(R.propEq(1, -1)),
  R.map(R.head),
  R.sum,
)

const DIVIDER_0 = [[2]]
const DIVIDER_1 = [[6]]

const part2 = R.pipe(
  parseLines,
  R.reject(R.isEmpty),
  R.map(parsePacket),
  R.concat([DIVIDER_0, DIVIDER_1]),
  R.sort(comparePackets),
  enumerate,
  R.filter(R.pipe(R.last, R.either(R.equals(DIVIDER_0), R.equals(DIVIDER_1)))),
  R.map(R.head),
  R.apply(R.multiply),
)

module.exports = {
  part1,
  part2,
}
