const R = require('ramda')
const util = require('util')

const parseLines = R.pipe(R.split('\n'), R.slice(0, -1))

const parseText = R.slice(0, -1)

const parseDecimal = (x) => parseInt(x, 10)

const inspect = (x) => util.inspect(x, false, +Infinity, true)

module.exports = {
  parseLines,
  parseText,
  parseDecimal,
  inspect,
}
