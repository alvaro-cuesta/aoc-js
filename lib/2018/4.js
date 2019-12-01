const R = require('ramda')

const REGEX_LOG = /^\[(\d{4})\-(\d{2})-(\d{2}) (\d{2}):(\d{2})] (.+)$/
const REGEX_BEGINS_SHIFT = /^Guard #(\d+) begins shift$/
const REGEX_FALLS_ASLEEP = /^falls asleep$/
const REGEX_WAKES_UP = /^wakes up$/

const parseLine = (line) => {
  const logMatch = line.match(REGEX_LOG)

  const [yyyy, mm, dd, hh, nn] = logMatch
    .slice(1, 6)
    .map((x) => parseInt(x, 10))
  const message = logMatch[6]

  const beginShiftResult = message.match(REGEX_BEGINS_SHIFT)
  if (beginShiftResult) {
    return {
      type: 'BEGINS_SHIFT',
      id: parseInt(beginShiftResult[1], 10),
      yyyy,
      mm,
      dd,
      hh,
      nn,
    }
  }

  const fallsAsleepResult = message.match(REGEX_FALLS_ASLEEP)
  if (fallsAsleepResult) {
    return {
      type: 'FALLS_ASLEEP',
      yyyy,
      mm,
      dd,
      hh,
      nn,
    }
  }

  const wakesUpResult = message.match(REGEX_WAKES_UP)
  if (wakesUpResult) {
    return {
      type: 'WAKES_UP',
      yyyy,
      mm,
      dd,
      hh,
      nn,
    }
  }

  throw new Error(`Unknown log line: ${line}`)
}

const parseLogs = R.pipe(
  R.reduce(
    (acc, log) => {
      switch (log.type) {
        case 'BEGINS_SHIFT': {
          return {
            ...acc,
            currentId: log.id,
          }
        }

        case 'FALLS_ASLEEP': {
          return {
            ...acc,
            sleepStart: log,
          }
        }

        case 'WAKES_UP': {
          const start = acc.sleepStart

          if (
            start.yyyy !== log.yyyy ||
            start.mm !== log.mm ||
            start.dd !== log.dd ||
            start.hh !== log.hh
          ) {
            throw new Error('Unhandled case')
          }

          return {
            ...acc,
            sleepStart: undefined,
            sleepSpans: {
              ...acc.sleepSpans,
              [acc.currentId]: [
                ...(acc.sleepSpans[acc.currentId] || []),
                {
                  start,
                  end: log,
                  length: (log.nn - start.nn + 60) % 60,
                },
              ],
            },
          }
        }

        default: {
          throw new Error(`Unknown log type: ${log.type}`)
        }
      }
    },
    {
      currentId: undefined,
      sleepStart: undefined,
      sleepSpans: {},
    },
  ),
  R.prop('sleepSpans'),
)

const parseInput = R.pipe(
  R.split('\n'),
  R.filter((x) => x.length > 0),
  R.sortBy(R.identity),
  R.map(parseLine),
  parseLogs,
)

const getSpanMinutes = (span) =>
  Array(span.length)
    .fill()
    .map((_, i) => (span.start.nn + i) % 60)

const getMaxSpanMinute = R.pipe(
  R.chain(getSpanMinutes),
  R.countBy(R.identity),
  R.toPairs,
  R.reduce(R.maxBy(R.nth(1)), [null, -Infinity]),
)

const part1 = R.pipe(
  parseInput,
  R.toPairs,
  (x) => x.reduce(R.maxBy(R.pipe(R.nth(1), R.pluck('length'), R.sum))),
  ([id, spans]) => id * getMaxSpanMinute(spans)[0],
)

const part2 = R.pipe(
  parseInput,
  R.map(getMaxSpanMinute),
  R.toPairs,
  (x) => x.reduce(R.maxBy(R.pipe(R.nth(1), R.nth(1)))),
  ([id, [minute]]) => id * minute,
)

module.exports = {
  part1,
  part2,
}
