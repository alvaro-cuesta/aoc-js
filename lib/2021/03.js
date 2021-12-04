const R = require('ramda')

const parseInput = (input) =>
  R.pipe(R.trim, R.split('\n'), R.map(R.split('')))(input)

const countItem = (item, array) =>
  R.pipe(R.filter(R.equals(item)), R.length)(array)

const part1Inner = (counts0, counts1, fn) =>
  R.pipe(
    R.zip,
    R.map(([count0, count1]) => fn(count0, count1)),
    R.join(''),
    (x) => parseInt(x, 2),
  )(counts0, counts1)

const mostCommon = (count0, count1) => (count0 > count1 ? '0' : '1')

const leastCommon = (count0, count1) => (count0 > count1 ? '1' : '0')

const part1 = (input) => {
  const numbers = parseInput(input)

  const columns = R.transpose(numbers)
  const counts0 = R.map((column) => countItem('0', column))(columns)
  const counts1 = R.map((column) => countItem('1', column))(columns)

  const gamma = part1Inner(counts0, counts1, mostCommon)
  const epsilon = part1Inner(counts0, counts1, leastCommon)

  return gamma * epsilon
}

const part2Inner = (numbers, fn) => {
  for (let i = 0; i < numbers[0].length && numbers.length > 1; i++) {
    const columns = R.transpose(numbers)
    const count0 = countItem('0', columns[i])
    const count1 = countItem('1', columns[i])

    const bit = fn(count0, count1)

    numbers = numbers.filter((x) => x[i] === bit)
  }

  return parseInt(numbers[0].join(''), 2)
}

const part2 = (input) => {
  const numbers = parseInput(input)

  const oxygen = part2Inner(numbers, mostCommon)
  const co2 = part2Inner(numbers, leastCommon)

  return oxygen * co2
}

module.exports = {
  part1,
  part2,
}
