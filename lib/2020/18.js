const R = require('ramda')

const operate = (a, operator, b) => {
  switch (operator) {
    case '+':
      return a + b
    case '*':
      return a * b
    default:
      throw new Error(`Unknown operator ${operator}`)
  }
}

const findMatchingParen = (string, startParenIndex) => {
  let nesting = 1

  for (let i = startParenIndex + 1; i < string.length; i++) {
    if (string[i] === '(') {
      nesting++
    } else if (string[i] === ')') {
      nesting--

      if (nesting === 0) {
        return i
      }
    }
  }

  throw new Error('Unmatched parenthesis')
}

const calculate1 = (remaining) => {
  let acc = 0
  let operator = '+'

  while (remaining.length > 0) {
    const x = remaining[0]
    const rest = remaining.slice(1)

    if (x === ' ') {
      remaining = remaining.slice(1)
    } else if (x >= '0' && x <= '9') {
      const value = parseInt(x, 10)

      acc = operate(acc, operator, value)
      remaining = rest
    } else if (x === '(') {
      const endParenIndex = findMatchingParen(remaining, 0)
      const expression = remaining.slice(1, endParenIndex)
      const newRemaining = remaining.slice(endParenIndex + 1)
      const value = calculate1(expression)

      acc = operate(acc, operator, value)
      remaining = newRemaining
    } else if (x === '+' || x === '*') {
      operator = x
      remaining = rest
    } else {
      throw new Error('Unexpected token')
    }
  }

  return acc
}

const part1 = R.pipe(R.trim, R.split('\n'), R.map(calculate1), R.sum)

const calculate2 = (remaining) => {
  let startParenIndex = remaining.indexOf('(')
  if (startParenIndex !== -1) {
    const endParenIndex = findMatchingParen(remaining, startParenIndex)

    const left = remaining.slice(0, startParenIndex)
    const inner = remaining.slice(startParenIndex + 1, endParenIndex)
    const right = remaining.slice(endParenIndex + 1)

    return calculate2(`${left}${calculate2(inner)}${right}`)
  }

  let productIndex = remaining.indexOf('*')
  if (productIndex !== -1) {
    const left = remaining.slice(0, productIndex).trim()
    const right = remaining.slice(productIndex + 1).trim()

    return calculate2(left) * calculate2(right)
  }

  let sumIndex = remaining.indexOf('+')
  if (sumIndex !== -1) {
    const left = remaining.slice(0, sumIndex).trim()
    const right = remaining.slice(sumIndex + 1).trim()

    return calculate2(left) + calculate2(right)
  }

  return parseInt(remaining.trim(), 10)
}

const part2 = R.pipe(R.trim, R.split('\n'), R.map(calculate2), R.sum)

module.exports = {
  part1,
  part2,
}
