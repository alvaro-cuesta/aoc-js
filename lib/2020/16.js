const R = require('ramda')

const parseValues = (line) => line.split(',').map((x) => parseInt(x, 10))

const parseInput = (input) => {
  const [fieldsString, myString, nearbyString] = input.trim().split('\n\n')

  const fields = fieldsString.split('\n').map((field) => {
    const { name, aMin, aMax, bMin, bMax } = field.match(
      /^(?<name>[^:]+): (?<aMin>\d+)-(?<aMax>\d+) or (?<bMin>\d+)-(?<bMax>\d+)$/,
    ).groups

    return {
      name,
      aMin: parseInt(aMin, 10),
      aMax: parseInt(aMax, 10),
      bMin: parseInt(bMin, 10),
      bMax: parseInt(bMax, 10),
    }
  })

  const mine = parseValues(myString.split('\n')[1])

  const nearby = nearbyString.split('\n').slice(1).map(parseValues)

  return { fields, mine, nearby }
}

const numberFitsField = ({ aMin, aMax, bMin, bMax }, number) =>
  (number >= aMin && number <= aMax) || (number >= bMin && number <= bMax)

const numberFitsSomeField = (fields, number) =>
  fields.some((field) => numberFitsField(field, number))

const part1 = (input) => {
  const { fields, nearby } = parseInput(input)

  const invalidValues = nearby.flatMap((line) =>
    line.filter((number) => !numberFitsSomeField(fields, number)),
  )

  return R.sum(invalidValues)
}

const part2 = (input) => {
  const { fields, mine, nearby } = parseInput(input)

  const nearbyValid = nearby.filter((line) =>
    line.every((number) => numberFitsSomeField(fields, number)),
  )

  const valuesByColumn = R.transpose(nearbyValid).map((v, i) => [i, v])

  const initialConstraints = fields.map((field) => ({
    name: field.name,
    possible: valuesByColumn
      .filter(([_, v]) => v.every((number) => numberFitsField(field, number)))
      .map(([i, _]) => i),
  }))

  const columns = findFieldColumns(initialConstraints)
    .filter(({ name }) => name.startsWith('departure'))
    .map(({ column }) => mine[column])

  return R.product(columns)
}

const findFieldColumns = (
  constraints,
  available = Array(constraints.length)
    .fill()
    .map((_, i) => i),
) => {
  if (constraints.some((constraint) => constraint.possible.length === 0)) {
    return false
  }

  if (available.length === 0) {
    return constraints.map((constraint) => ({
      ...constraint,
      column: constraint.possible[0],
    }))
  }

  const value = available[0]
  const rest = available.slice(1)

  for (let i = 0; i < constraints.length; i++) {
    const newConstraints = constraints.map((constraint, j) => ({
      ...constraint,
      possible: constraint.possible.filter((n) =>
        i === j ? n === value : n !== value,
      ),
    }))

    const solution = findFieldColumns(newConstraints, rest)

    if (solution) {
      return solution
    }
  }

  return false
}

module.exports = {
  part1,
  part2,
}
