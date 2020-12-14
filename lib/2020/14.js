const R = require('ramda')

const REGEX_MASK = /^mask = (?<mask>[01X]{36})$/
const REGEX_MEM = /^mem\[(?<addr>\d+)] = (?<value>\d+)$/

const part1 = R.pipe(
  R.trim,
  R.split('\n'),
  R.reduce(
    ({ mem, mask }, line) => {
      let match

      if ((match = line.match(REGEX_MASK)) !== null) {
        return { mem, mask: match.groups.mask.split('') }
      }

      if ((match = line.match(REGEX_MEM)) !== null) {
        const binaryValue = parseInt(match.groups.value, 10)
          .toString(2)
          .padStart(36, '0')
          .split('')

        const maskedValue = mask
          .reduce(
            (acc, x, i) =>
              x === 'X' ? acc : [...acc.slice(0, i), x, ...acc.slice(i + 1)],
            binaryValue,
          )
          .join('')

        mem = {
          ...mem,
          [match.groups.addr]: parseInt(maskedValue, 2),
        }

        return { mem, mask }
      }
    },
    {
      mem: {},
      mask: Array(36)
        .fill()
        .map((_) => 'X')
        .join(''),
    },
  ),
  R.prop('mem'),
  R.values,
  R.sum,
)

const part2 = R.pipe(
  R.trim,
  R.split('\n'),
  R.reduce(
    ({ mem, mask }, line) => {
      let match

      if ((match = line.match(REGEX_MASK)) !== null) {
        return { mem, mask: match.groups.mask.split('') }
      }

      if ((match = line.match(REGEX_MEM)) !== null) {
        const value = parseInt(match.groups.value, 10)

        const binaryAddr = parseInt(match.groups.addr, 10)
          .toString(2)
          .padStart(36, '0')
          .split('')

        const addrs = mask
          .reduce(
            (acc, x, i) =>
              x === '0'
                ? acc
                : x === '1'
                ? acc.map((x) => [...x.slice(0, i), 1, ...x.slice(i + 1)])
                : acc.flatMap((x) => [
                    [...x.slice(0, i), 0, ...x.slice(i + 1)],
                    [...x.slice(0, i), 1, ...x.slice(i + 1)],
                  ]),
            [binaryAddr],
          )
          .map((addr) => [parseInt(addr.join(''), 2), value])

        mem = {
          ...mem,
          ...R.fromPairs(addrs),
        }

        return { mem, mask }
      }
    },
    {
      mem: {},
      mask: Array(36)
        .fill()
        .map((_) => 'X')
        .join(''),
    },
  ),
  R.prop('mem'),
  R.values,
  R.sum,
)

module.exports = {
  part1,
  part2,
}
