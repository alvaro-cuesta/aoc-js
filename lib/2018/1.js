const R = require("ramda");
const { parseLines, parseDecimal } = require("../utils");

const parseInput = R.pipe(parseLines, R.map(parseDecimal));

const part1 = R.pipe(parseInput, R.sum);

const part2 = input => {
  const ns = parseInput(input);
  const foundFreqs = { 0: true };
  let i = 0;
  let acc = 0;

  while (true) {
    acc = acc + ns[i];

    if (foundFreqs[acc]) {
      return acc;
    }

    foundFreqs[acc] = true;

    i++;
    i %= ns.length;
  }
};

module.exports = {
  part1,
  part2
};
