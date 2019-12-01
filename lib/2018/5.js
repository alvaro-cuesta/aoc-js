const R = require("ramda");
const { parseText } = require("../utils");

const LETTERS = "abcdefghijklmnopqrstuvwxyz";

const REGEX = R.pipe(
  R.split(""),
  R.map(x => `${x}${x.toUpperCase()}|${x.toUpperCase()}${x}`),
  R.join("|"),
  x => new RegExp(`(${x})`, "g")
)(LETTERS);

const react = input => {
  let old = input;

  while (true) {
    let match = old.replace(REGEX, "");

    if (match === old) {
      return old;
    }

    old = match;
  }
};

const part1 = R.pipe(parseText, react, R.length);

const part2 = input => {
  throw new Error("Not implemented");
};

module.exports = {
  react,
  part1,
  part2
};