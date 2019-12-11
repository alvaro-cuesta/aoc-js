const R = require('ramda')

const COLORS = {
  BLACK: 0,
  WHITE: 1,
  TRANSPARENT: 2,
}

const CHARS = {
  [COLORS.BLACK]: ' ',
  [COLORS.WHITE]: '█',
  [COLORS.TRANSPARENT]: '-',
  [undefined]: '?',
}

const paint = R.pipe(
  R.map(
    R.pipe(
      R.map((x) => CHARS[x] || CHARS[undefined]),
      R.join(''),
    ),
  ),
  R.prepend(''),
  R.join('\n'),
)

module.exports = {
  COLORS,
  paint,
}
