const parseEntries = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => parseInt(x, 10))

const part1 = (input) => {
  const entries = parseEntries(input)

  for (let i = 0; i < entries.length; i++) {
    const a = entries[i]

    for (let j = i + 1; j < entries.length; j++) {
      const b = entries[j]

      if (a + b === 2020) {
        return a * b
      }
    }
  }
}

const part2 = (input) => {
  const entries = parseEntries(input)

  for (let i = 0; i < entries.length; i++) {
    const a = entries[i]

    for (let j = i + 1; j < entries.length; j++) {
      const b = entries[j]

      for (let k = j + 1; k < entries.length; k++) {
        const c = entries[k]

        if (a + b + c === 2020) {
          return a * b * c
        }
      }
    }
  }
}

module.exports = {
  part1,
  part2,
}
