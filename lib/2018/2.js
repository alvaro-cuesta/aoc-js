const parseInput = input => input.split("\n").filter(x => x.length > 0);

const countLetters = string =>
  string.split("").reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;
    return acc;
  }, {});

const matchingLetters = string => {
  const letterValues = Object.values(countLetters(string));

  return {
    2: letterValues.includes(2),
    3: letterValues.includes(3)
  };
};

const part1 = input => {
  const matchingLettersInput = parseInput(input).map(matchingLetters);

  const with2 = matchingLettersInput.filter(x => x[2]).length;
  const with3 = matchingLettersInput.filter(x => x[3]).length;

  return with2 * with3;
};

const part2 = input => {
  throw new Error("Not implemented");
};

module.exports = {
  part1,
  part2
};
