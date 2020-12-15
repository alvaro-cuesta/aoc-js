const solve = (input, target) => {
  const numbers = input
    .trim()
    .split(',')
    .map((x) => parseInt(x, 10))

  const spokenAt = {}

  for (let i = 0; i < target; i++) {
    spokenAt[i] = []
  }

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i]
    spokenAt[number][0] = i + 1
  }

  let lastSpoken = numbers[numbers.length - 1]

  for (let turn = numbers.length + 1; turn < target + 1; turn++) {
    const lastSpokenAt = spokenAt[lastSpoken]

    const currentSpoken =
      lastSpokenAt.length < 2 ? 0 : Math.abs(lastSpokenAt[0] - lastSpokenAt[1])

    const currentSpokenAt = spokenAt[currentSpoken]

    if (currentSpokenAt.length === 0) {
      currentSpokenAt[0] = turn
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
