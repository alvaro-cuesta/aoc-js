const parseInput = input =>
  input
    .split("\n")
    .filter(x => x.length > 0)
    .map(line => parseInt(line, 10));

const part1 = input => parseInput(input).reduce((acc, n) => acc + n, 0);

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
