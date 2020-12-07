const R = require('ramda')

const SEPARATOR = ' bags contain '
const EMPTY = 'no other'
const TARGET = 'shiny gold'

const parseBags = R.pipe(
  R.trim(),
  R.split('\n'),
  R.map((line) => {
    const separatorIndex = line.indexOf(SEPARATOR)
    const container = line.slice(0, separatorIndex)
    const contents = line
      .slice(separatorIndex + SEPARATOR.length)
      .split(/ bags?(?:, |\.)/)
      .filter((x) => x !== '' && x !== EMPTY)
      .map((x) => {
        const spaceIndex = x.indexOf(' ')
        return {
          number: parseInt(x.slice(0, spaceIndex), 10),
          name: x.slice(spaceIndex + 1),
        }
      })

    return [container, contents]
  }),
  R.fromPairs,
)

const canContainShiny = (bags, name) =>
  bags[name].some((x) => x.name === TARGET || canContainShiny(bags, x.name))

const part1 = (input) => {
  const parsedBags = parseBags(input)

  return Object.keys(parsedBags).filter((x) => canContainShiny(parsedBags, x))
    .length
}

const countBags = (bags, name) => {
  return (
    1 +
    bags[name].reduce(
      (acc, { number, name }) => acc + number * countBags(bags, name),
      0,
    )
  )
}

const part2 = (input) => countBags(parseBags(input), TARGET) - 1

module.exports = {
  part1,
  part2,
}
