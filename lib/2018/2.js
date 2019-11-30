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
  const inputLines = parseInput(input);

  for (let i = 0; i < inputLines.length; i++) {
    other: for (let j = i + 1; j < inputLines.length; j++) {
      const a = inputLines[i];
      const b = inputLines[j];
      let differentK;

      for (let k = 0; k < a.length; k++) {
        if (a[k] !== b[k]) {
          if (differentK !== undefined) {
            continue other;
          }

          differentK = k;
        }
      }

      if (differentK !== undefined) {
        return a.slice(0, differentK) + a.slice(differentK + 1);
      }
    }
  }

  throw new Error("Boxes not found");
};

module.exports = {
  part1,
  part2
};
