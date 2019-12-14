const fs = require('fs')
const R = require('ramda')
const intcode = require('../lib/2019/intcode')

R.pipe(
  (path) => fs.readFileSync(path, { encoding: 'utf8', flag: 'r' }),
  intcode.parseRAM,
  intcode.disassemble,
  R.join('\n'),
  console.log,
)(process.argv[2])
