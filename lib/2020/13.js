const R = require('ramda')

const part1 = (input) => {
  const lines = input.trim().split('\n')

  const ts = parseInt(lines[0], 10)
  const earliestBus = lines[1]
    .split(',')
    .filter((x) => x !== 'x')
    .map((x) => {
      const id = parseInt(x, 10)

      return {
        id,
        mustWait: id - (ts % id),
      }
    })
    .reduce((acc, x) => (x.mustWait < acc.mustWait ? x : acc))

  return earliestBus.id * earliestBus.mustWait
}

const part2 = (input) => {
  const congruences = input
    .trim()
    .split('\n')[1]
    .split(',')
    .map((x, i) => {
      if (x === 'x') return null

      const mod = parseInt(x, 10)

      return {
        rem: BigInt(R.mathMod(-i, mod)),
        mod: BigInt(mod),
      }
    })
    .filter((x) => x !== null)

  return chineseRemainder(congruences)
}

const chineseRemainder = (arr) => {
  let sum = 0n

  const prod = arr.reduce((acc, x) => acc * x.mod, 1n)

  for (const { rem, mod } of arr) {
    const p = prod / mod
    sum += rem * mulInv(p, mod) * p
  }

  return sum % prod
}

const mulInv = (a, b) => {
  if (b === 1n) return 1n

  const b0 = b
  let x0 = 0n,
    x1 = 1n

  while (a > 1n) {
    const q = a / b
    ;[a, b] = [b, a % b]
    ;[x0, x1] = [x1 - q * x0, x0]
  }

  if (x1 < 0n) {
    x1 += b0
  }

  return x1
}

module.exports = {
  part1,
  part2,
}
