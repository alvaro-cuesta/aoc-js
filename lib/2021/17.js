const INPUT_REGEX =
  /^target area: x=(?<xmin>-?\d+)..(?<xmax>-?\d+), y=(?<ymin>-?\d+)..(?<ymax>-?\d+)\n$/

const parseInput = (input) => {
  const result = INPUT_REGEX.exec(input)

  if (result === null) {
    throw new Error('Could not parse input')
  }

  const { xmin, xmax, ymin, ymax } = result.groups

  return {
    xmin: parseInt(xmin, 10),
    xmax: parseInt(xmax, 10),
    ymin: parseInt(ymin, 10),
    ymax: parseInt(ymax, 10),
  }
}

const xAfterSteps = (vx0, i) => {
  const xsgn = Math.sign(vx0)
  const xsteps = Math.min(i, Math.abs(vx0))

  return (vx0 - ((xsteps - 1) / 2) * xsgn) * xsteps
}

const yAfterSteps = (vy0, i) => (vy0 - (i - 1) / 2) * i

const yPeak = (vy0) => {
  if (vy0 <= 0) return 0

  return ((vy0 + 1) * vy0) / 2
}

const part1 = (input) => {
  const { ymin } = parseInput(input)

  return yPeak(Math.abs(ymin + 1))
}

const part2 = (input) => {
  const { xmin, xmax, ymin, ymax } = parseInput(input)

  const goodYs = []

  for (let y0 = ymin - 1; y0 < Math.abs(ymin) + 1; y0++) {
    for (let i = 0; ; i++) {
      const y = yAfterSteps(y0, i)

      if (y >= ymin && y <= ymax) {
        goodYs.push(y0)
        break
      } else if (y < ymin) {
        break
      }
    }
  }

  const goodXs = []

  for (let x0 = 0; x0 < xmax + 1; x0++) {
    for (let i = 0; i <= x0; i++) {
      const x = xAfterSteps(x0, i)

      if (x >= xmin && x <= xmax) {
        goodXs.push(x0)
        break
      } else if (x > xmax) {
        break
      }
    }
  }

  let found = 0

  for (const x0 of goodXs) {
    for (const y0 of goodYs) {
      for (let i = 0; ; i++) {
        const x = xAfterSteps(x0, i)
        const y = yAfterSteps(y0, i)

        if (x >= xmin && x <= xmax && y >= ymin && y <= ymax) {
          found++
          break
        } else if (x > xmax) {
          break
        } else if (y < ymin) {
          break
        }
      }
    }
  }

  return found
}

module.exports = {
  part1,
  part2,
  xAfterSteps,
  yAfterSteps,
  yPeak,
}
