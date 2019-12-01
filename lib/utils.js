const R = require("ramda");

const parseLines = R.pipe(R.split("\n"), R.slice(0, -1));

const parseDecimal = x => parseInt(x, 10);

module.exports = {
  parseLines,
  parseDecimal
};
