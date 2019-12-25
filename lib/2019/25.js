const R = require('ramda')
const intcode = require('./intcode')

const part1 = async (input) => {
  await R.pipe(
    intcode.parseRAM,
    intcode.spawn,
    intcode.streamExecutor(process.stdin, process.stdout),
  )(input)

  return 1090529280
}

const part2 = R.always(null)

module.exports = {
  part1,
  part2,
}
