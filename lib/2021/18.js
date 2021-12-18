const add = (a, b) => [a, b]

const addOnLeft = (pairOrNumber, number) => {
  if (typeof pairOrNumber === 'number') {
    return pairOrNumber + number
  }

  const [a, b] = pairOrNumber

  return [addOnLeft(a, number), b]
}

const addOnRight = (pairOrNumber, number) => {
  if (typeof pairOrNumber === 'number') {
    return pairOrNumber + number
  }

  const [a, b] = pairOrNumber

  return [a, addOnRight(b, number)]
}

const explode = (pair, depth = 0) => {
  const [a, b] = pair

  if (typeof a === 'number' && typeof b === 'number' && depth >= 4) {
    return [0, pair]
  }

  if (Array.isArray(a)) {
    const maybeAExplosion = explode(a, depth + 1)

    if (maybeAExplosion !== null) {
      const [exploded, [pendingA, pendingB]] = maybeAExplosion

      return [
        [exploded, addOnLeft(b, pendingB)],
        [pendingA, null],
      ]
    }
  }

  if (Array.isArray(b)) {
    const maybeBExplosion = explode(b, depth + 1)

    if (maybeBExplosion !== null) {
      const [exploded, [pendingA, pendingB]] = maybeBExplosion

      return [
        [addOnRight(a, pendingA), exploded],
        [null, pendingB],
      ]
    }
  }

  return null
}

const split = (n) => [Math.floor(n / 2), Math.ceil(n / 2)]

const splitDeep = ([a, b]) => {
  if (typeof a === 'number' && a >= 10) {
    return [split(a), b]
  }

  if (Array.isArray(a)) {
    const maybeSplit = splitDeep(a)

    if (maybeSplit !== null) {
      return [maybeSplit, b]
    }
  }

  if (typeof b === 'number' && b >= 10) {
    return [a, split(b)]
  }

  if (Array.isArray(b)) {
    const maybeSplit = splitDeep(b)

    if (maybeSplit !== null) {
      return [a, maybeSplit]
    }
  }

  return null
}

const addReducing = (a, b) => {
  let c = add(a, b)

  for (;;) {
    let maybeExplosion
    while ((maybeExplosion = explode(c)) !== null) {
      c = maybeExplosion[0]
    }

    let maybeSplit = splitDeep(c)

    if (maybeSplit !== null) {
      c = maybeSplit
    } else {
      break
    }
  }

  return c
}

const addAllReducing = (list) => list.reduce(addReducing)

const getMagnitude = (pairOrNumber) => {
  if (typeof pairOrNumber === 'number') {
    return pairOrNumber
  }

  const [a, b] = pairOrNumber

  return 3 * getMagnitude(a) + 2 * getMagnitude(b)
}

const parseInput = (input) => input.trim().split('\n').map(JSON.parse)

const part1 = (input) => getMagnitude(addAllReducing(parseInput(input)))

const part2 = (input) => {
  const pairs = parseInput(input)

  let max = -Infinity

  for (let i = 0; i < pairs.length; i++) {
    for (let j = 0; j < pairs.length; j++) {
      const result = getMagnitude(addReducing(pairs[i], pairs[j]))

      if (result > max) {
        max = result
      }
    }
  }

  return max
}

module.exports = {
  part1,
  part2,

  add,
  explode,
  split,
  splitDeep,
  addReducing,
  addAllReducing,
  getMagnitude,
}
