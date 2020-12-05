const parsePasswords = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => {
      const match = x.match(/(\d+)-(\d+) (\w): (.+)/)

      return {
        a: parseInt(match[1], 10),
        b: parseInt(match[2], 10),
        letter: match[3],
        password: match[4],
      }
    })

const isValid1 = ({ a: min, b: max, letter, password }) => {
  const count = password.split('').filter((x) => x === letter).length

  return count >= min && count <= max
}

const part1 = (input) => parsePasswords(input).filter(isValid1).length

const isValid2 = ({ a, b, letter, password }) => {
  const aValid = password[a - 1] === letter
  const bValid = password[b - 1] === letter

  return !!(aValid ^ bValid)
}

const part2 = (input) => parsePasswords(input).filter(isValid2).length

module.exports = {
  part1,
  part2,
}
