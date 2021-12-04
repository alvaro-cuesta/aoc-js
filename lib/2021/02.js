const parseEntries = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const [command, value] = x.split(' ')
      return [command, parseInt(value, 10)]
    })

const part1 = (input) => {
  const entries = parseEntries(input)

  let depth = 0,
    horizontal = 0

  for (const [command, value] of entries) {
    switch (command) {
      case 'forward':
        horizontal += value
        break
      case 'down':
        depth += value
        break
      case 'up':
        depth -= value
        break
      default:
    }
  }

  return depth * horizontal
}

const part2 = (input) => {
  const entries = parseEntries(input)

  let depth = 0,
    horizontal = 0,
    aim = 0

  for (const [command, value] of entries) {
    switch (command) {
      case 'forward':
        horizontal += value
        depth += aim * value
        break
      case 'down':
        aim += value
        break
      case 'up':
        aim -= value
        break
      default:
    }
  }

  return depth * horizontal
}

module.exports = {
  part1,
  part2,
}
