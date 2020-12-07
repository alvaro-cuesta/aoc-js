const R = require('ramda')

const W = 50
const H = 6

const makeScreen = (w, h) =>
  Array(h)
    .fill()
    .map(() =>
      Array(w)
        .fill()
        .map(() => false),
    )

const countLit = (screen) =>
  screen.reduce(
    (lit, row) =>
      lit + row.reduce((rowLit, cell) => rowLit + (cell ? 1 : 0), 0),
    0,
  )

const setRect = (screen, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      screen[y][x] = true
    }
  }
}

const rotateRow = (screen, y, by) => {
  screen[y] = screen[y].map(
    (_, x) => screen[y][R.mathMod(x - by, screen[y].length)],
  )
}

const rotateColumn = (screen, x, by) => {
  const origColumn = screen.map((row) => row[x])

  for (let y = 0; y < screen.length; y++) {
    screen[y][x] = origColumn[R.mathMod(y - by, origColumn.length)]
  }
}

const applyInstructions = (screen, instructions) => {
  for (const instruction of instructions) {
    const matchRect = instruction.match(/rect (\d+)x(\d+)/)
    if (matchRect !== null) {
      const w = parseInt(matchRect[1], 10)
      const h = parseInt(matchRect[2], 10)
      setRect(screen, w, h)
      continue
    }

    const matchRow = instruction.match(/rotate row y=(\d+) by (\d+)/)
    if (matchRow !== null) {
      const y = parseInt(matchRow[1], 10)
      const by = parseInt(matchRow[2], 10)
      rotateRow(screen, y, by)
      continue
    }

    const matchColumn = instruction.match(/rotate column x=(\d+) by (\d+)/)
    if (matchColumn !== null) {
      const x = parseInt(matchColumn[1], 10)
      const by = parseInt(matchColumn[2], 10)
      rotateColumn(screen, x, by)
      continue
    }

    throw new Error('Unknown instruction')
  }

  return screen
}

const part1 = (input) =>
  countLit(applyInstructions(makeScreen(W, H), input.trim().split('\n')))

const printScreen = (screen) =>
  screen.map((row) => row.map((cell) => (cell ? '#' : ' ')).join('')).join('\n')

const part2 = (input) =>
  printScreen(applyInstructions(makeScreen(W, H), input.trim().split('\n')))

module.exports = {
  setRect,
  rotateColumn,
  rotateRow,
  part1,
  part2,
}
