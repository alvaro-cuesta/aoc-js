const parsePass = (pass) =>
  parseInt(pass.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2)

const part1 = (input) =>
  input
    .trim()
    .split('\n')
    .map(parsePass)
    .reduce((max, id) => Math.max(max, id), -Infinity)

const part2 = (input) => {
  const passCache = input
    .trim()
    .split('\n')
    .map(parsePass)
    .reduce((o, id) => ({ ...o, [id]: true }), {})

  for (let i = 0; i < 1 << 10; i++) {
    if (
      !passCache[i] &&
      passCache[i - 1] === true &&
      passCache[i + 1] === true
    ) {
      return i
    }
  }
}

module.exports = {
  parsePass,
  part1,
  part2,
}
