const R = require("ramda");
const { parseLines, parseDecimal } = require("../utils");

const REGEX_CLAIM = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

const parseClaim = R.pipe(
  R.match(REGEX_CLAIM),
  R.slice(1, 6),
  R.map(parseDecimal),
  ([id, x, y, w, h]) => ({ id, x, y, w, h })
);

const parseInput = R.pipe(parseLines, R.map(parseClaim));

const applyClaim = (board, { x, y, w, h }) => {
  for (let i = 0; i < w; i++) {
    const row = (board[x + i] = board[x + i] || []);

    for (let j = 0; j < h; j++) {
      row[y + j] = (row[y + j] || 0) + 1;
    }
  }

  return board;
};

const part1 = input =>
  parseInput(input)
    .reduce(applyClaim, [])
    .reduce(
      (acc, row) => acc + row.reduce((acc, x) => (x >= 2 ? acc + 1 : acc), 0),
      0
    );

const part2 = input => {
  const claims = parseInput(input);
  const board = claims.reduce(applyClaim, []);

  claims: for (const { id, x, y, w, h } of claims) {
    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        if (board[x + i][y + j] > 1) {
          continue claims;
        }
      }
    }

    return id;
  }

  throw new Error("Untouched claim not found");
};

module.exports = {
  part1,
  part2
};
