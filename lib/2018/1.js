const part1 = input =>
  input.split("\n").reduce((acc, line) => {
    const n = parseInt(line, 10);

    return isNaN(n) ? acc : acc + n;
  }, 0);

module.exports = {
  part1
};
