const parseSteps = (input) =>
  input
    .trim()
    .split('\n')
    .map((x) => x.split(''))

const KEYPAD_PART1 = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
]

const MOVE = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
}

const moveSteps = (keypad, steps, position) =>
  steps.reduce((position, step) => {
    const [x, y] = position
    const [dx, dy] = MOVE[step]
    const [nx, ny] = [x + dx, y + dy]

    return keypad[ny] && keypad[ny][nx] ? [nx, ny] : [x, y]
  }, position)

const calculateButtons = (input, keypad, startPosition) =>
  parseSteps(input).reduce(
    ({ buttons, position }, steps) => {
      const newPosition = moveSteps(keypad, steps, position)
      const [x, y] = newPosition
      const newButton = keypad[y][x]

      return {
        buttons: buttons + newButton,
        position: newPosition,
      }
    },
    { buttons: '', position: startPosition },
  ).buttons

const part1 = (input) => calculateButtons(input, KEYPAD_PART1, [1, 1])

const KEYPAD_PART2 = [
  [null, null, '1', null, null],
  [null, '2', '3', '4', null],
  ['5', '6', '7', '8', '9'],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null],
]

const part2 = (input) => calculateButtons(input, KEYPAD_PART2, [0, 2])

module.exports = {
  part1,
  part2,
}
