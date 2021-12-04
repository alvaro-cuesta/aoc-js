const parseEntries = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => parseInt(x, 10))

const part1 = (input) => {
  const parsed = parseEntries(input)

  let count = 0

  for (let i = 0; i < parsed.length - 1; i++) {
    if (parsed[i] < parsed[i + 1]) count++
  }

  return count
}

const part2 = (input) => {
  const parsed = parseEntries(input)

  let count = 0

  for (let i = 0; i < parsed.length - 3; i++) {
    if (parsed[i] < parsed[i + 3]) count++
  }

  return count
}

module.exports = {
  part1,
  part2,
}
