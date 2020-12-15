const solve = (input, target) => {
  const numbers = input
    .trim()
    .split(',')
    .map((x) => parseInt(x, 10))

  const spokenAt = new Map()

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    spokenAt.set(number, [i + 1])
  }

  let lastSpoken = numbers[numbers.length - 1]

  for (let turn = numbers.length + 1; turn < target + 1; turn++) {
    const lastSpokenAt = spokenAt.get(lastSpoken)

    const currentSpoken =
      lastSpokenAt.length < 2 ? 0 : Math.abs(lastSpokenAt[0] - lastSpokenAt[1])

    const currentSpokenAt = spokenAt.get(currentSpoken)

    if (!currentSpokenAt) {
      spokenAt.set(currentSpoken, [turn])
    } else if (currentSpokenAt.length === 1) {
      currentSpokenAt[1] = turn
    } else {
      currentSpokenAt[0] = currentSpokenAt[1]
      currentSpokenAt[1] = turn
    }

    lastSpoken = currentSpoken
  }

  return lastSpoken
}

const part1 = (input) => solve(input, 2020)

const part2 = (input) => solve(input, 30000000)

module.exports = {
  part1,
  part2,
}
