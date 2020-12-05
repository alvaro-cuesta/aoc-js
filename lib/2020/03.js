const parseField = (input) => input.trim().split('\n')

const getCell = (field, x, y) => {
  const row = field[y]

  return row[x % row.length]
}

const TREE = '#'

const countTreesBySlope = (field, dx, dy) => {
  let trees = 0,
    x = 0,
    y = 0

  while (y < field.length) {
    const isTree = getCell(field, x, y) === TREE

    if (isTree) trees++

    x += dx
    y += dy
  }

  return trees
}

const part1 = (input) => {
  const field = parseField(input)

  return countTreesBySlope(field, 3, 1)
}

const part2 = (input) => {
  const field = parseField(input)

  return (
    countTreesBySlope(field, 1, 1) *
    countTreesBySlope(field, 3, 1) *
    countTreesBySlope(field, 5, 1) *
    countTreesBySlope(field, 7, 1) *
    countTreesBySlope(field, 1, 2)
  )
}

module.exports = {
  part1,
  part2,
}
