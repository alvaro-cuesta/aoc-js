const REGEX_CLAIM = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

const parseClaim = claim => {
  const [id, x, y, w, h] = claim
    .match(REGEX_CLAIM)
    .slice(1, 6)
    .map(x => parseInt(x, 10));

  return { id, x, y, w, h };
};

const parseInput = input =>
  input
    .split("\n")
    .filter(x => x.length > 0)
    .map(parseClaim);

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
