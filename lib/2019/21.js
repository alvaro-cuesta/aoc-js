const R = require('ramda')
const I = require('iter-tools')
const intcode = require('./intcode')

// d && !(a && b && c)
const WALK_SCRIPT = `OR A J
AND B J
AND C J
NOT J J
AND D J
WALK
`

// d && !(a && b && c) && (e || h)

const RUN_SCRIPT = `OR A J
AND B J
AND C J
NOT J J
AND D J
OR E T
OR H T
AND T J
RUN
`

const runScript = R.curry((script, input) =>
  R.pipe(
    intcode.parseRAM,
    intcode.spawn,
    intcode.iteratorExecutor(
      script
        .split('')
        .map((x) => x.charCodeAt(0))
        .values(),
    ),
    I.toArray,
  )(input),
)

const getHullDamage = R.curryN(2, R.pipe(runScript, R.last))

const part1 = getHullDamage(WALK_SCRIPT)

const part2 = getHullDamage(RUN_SCRIPT)

module.exports = {
  part1,
  part2,
}
