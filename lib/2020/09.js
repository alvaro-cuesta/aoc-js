const R = require('ramda')

const isValid = (preamble, number) => {
  for (let i = 0; i < preamble.length; i++) {
    for (let j = i; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] === number) {
        return true
      }
    }
  }

  return false
}

const PREAMBLE_LENGTH = 25

const findInvalidNumber = (numbers) => {
  for (let i = 0; i < numbers.length - PREAMBLE_LENGTH - 1; i++) {
    const preamble = numbers.slice(i, i + PREAMBLE_LENGTH)
    const number = numbers[i + PREAMBLE_LENGTH]

    if (!isValid(preamble, number)) {
      return number
    }
  }

  throw new Error('Invalid number not found')
}

const part1 = (input) => {
  const numbers = input
    .trim()
    .split('\n')
    .map((x) => parseInt(x, 10))

  return findInvalidNumber(numbers)
}

const part2 = (input) => {
  const numbers = input
    .trim()
    .split('\n')
    .map((x) => parseInt(x, 10))

  const target = findInvalidNumber(numbers)

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const slice = numbers.slice(i, j)
      const sum = R.sum(slice)

      if (sum === target) {
        const min = slice.reduce(R.min, +Infinity)
        const max = slice.reduce(R.max, -Infinity)

        return min + max
      }
    }
  }

  throw new Error('Could not find solution')
}

module.exports = {
  part1,
  part2,
}
