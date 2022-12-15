const R = require('ramda')
const util = require('util')
const vec = require('./vec')

const parseLines = R.pipe(R.split('\n'), R.slice(0, -1))

const parseText = R.slice(0, -1)

const parseDecimal = (x) => parseInt(x, 10)

const inspect = (x) => util.inspect(x, false, +Infinity, false)

const logInspect = R.pipe(inspect, console.log)

const permutations = (array) => {
  if (array.length === 1) {
    return [array]
  }

  return R.pipe(
    R.length,
    R.range(0),
    R.chain((i) =>
      R.pipe(
        R.remove,
        permutations,
        R.map((perm) => [R.nth(i, array), ...perm]),
      )(i, 1, array),
    ),
  )(array)
}

const applyN = R.compose(R.reduceRight(R.compose, R.identity), R.repeat)

const gcd = (a, b) => {
  while (a !== b) {
    if (a > b) {
      a -= b
    } else if (a < b) {
      b -= a
    }
  }

  return a
}

const lcm = R.converge(R.divide, [R.multiply, gcd])

const frequency = (x) =>
  R.reduce(
    (freqs, x) => {
      freqs[x] = (freqs[x] || 0) + 1
      return freqs
    },
    {},
    x,
  )

const sortedFrequency = R.pipe(
  frequency,
  R.toPairs,
  R.sortWith([R.descend(R.nth(1)), R.ascend(R.identity)]),
)

const matchAllOverlapping = function* matchAllOverlapping(str, fromRE) {
  const re = new RegExp(fromRE)

  let match

  while ((match = re.exec(str)) !== null) {
    re.lastIndex = match.index + 1
    yield match
  }
}

const parseBoard = (input) => parseLines(input).map((line) => line.split(''))

const getAdjacent4 = ([x, y]) => [
  [x + 1, y],
  [x - 1, y],
  [x, y + 1],
  [x, y - 1],
]

const getAdjacent8 = ([x, y]) => [
  [x + 1, y],
  [x + 1, y + 1],
  [x + 1, y - 1],
  [x, y + 1],
  [x, y - 1],
  [x - 1, y],
  [x - 1, y + 1],
  [x - 1, y - 1],
]

const mapBoard = R.curry((fn, board) =>
  board.map((line, y) => line.map((cell, x) => fn(cell, [x, y], board, line))),
)

const reduceAssumeInitial = R.curry((fn, array) => array.reduce(fn))

const unfoldValue = R.curry((f, value) => {
  for (;;) {
    const ret = f(value)

    if (ret === STOP) {
      return value
    }

    value = ret
  }
})

const STOP = Symbol('STOP')

const timesValue = R.curry((f, n, value) => {
  for (let i = 0; i < n; i++) {
    value = f(value)
  }

  return value
})

const regexGroups = R.curry((regex, string) => {
  const match = string.match(regex)

  if (match === null) {
    throw new Error(`Match did not succeed for:\n\n${string}`)
  }

  return match.groups
})

const enumerate = R.addIndex(R.map)((x, i) => [i + 1, x])

function* iterateStraightLines([x0, y0], [x1, y1]) {
  if (x0 === x1) {
    if (y0 < y1) {
      for (let y = y0; y <= y1; y++) {
        yield [x0, y]
      }
    } else {
      for (let y = y0; y >= y1; y--) {
        yield [x0, y]
      }
    }
  } else if (y0 === y1) {
    if (x0 < x1) {
      for (let x = x0; x <= x1; x++) {
        yield [x, y0]
      }
    } else {
      for (let x = x0; x >= x1; x--) {
        yield [x, y0]
      }
    }
  } else {
    throw new Error(
      `Cannot make straight lines from [${x0}, ${y0}] to [${x1}, ${y1}]`,
    )
  }
}

const debugKeyedBoard = (board, [x0, y0], [x1, y1]) => {
  let out = ''

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      out += board[vec.key([x, y])] ?? ' '
    }
    out += '\n'
  }

  console.log(out)
}

module.exports = {
  parseLines,
  parseText,
  parseDecimal,
  inspect,
  logInspect,
  permutations,
  applyN,
  gcd,
  lcm,
  frequency,
  sortedFrequency,
  matchAllOverlapping,
  parseBoard,
  getAdjacent4,
  getAdjacent8,
  mapBoard,
  reduceAssumeInitial,
  unfoldValue,
  STOP,
  timesValue,
  regexGroups,
  enumerate,
  iterateStraightLines,
  debugKeyedBoard,
}
