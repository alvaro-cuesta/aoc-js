const R = require('ramda')

const parse = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => [line[0], parseInt(line.slice(1), 10)])

const run = (instructions) =>
  instructions.reduce(
    ({ pos, dir }, [action, value]) => {
      const [x, y] = pos

      switch (action) {
        case 'N':
          return { dir, pos: [x, y + value] }
        case 'S':
          return { dir, pos: [x, y - value] }
        case 'E':
          return { dir, pos: [x + value, y] }
        case 'W':
          return { dir, pos: [x - value, y] }
        case 'L':
          switch (value) {
            case 90:
              switch (dir) {
                case 'E':
                  return { pos, dir: 'N' }
                case 'N':
                  return { pos, dir: 'W' }
                case 'W':
                  return { pos, dir: 'S' }
                case 'S':
                  return { pos, dir: 'E' }
                default:
                  throw new Error('Invalid direction')
              }
            case 180:
              switch (dir) {
                case 'E':
                  return { pos, dir: 'W' }
                case 'N':
                  return { pos, dir: 'S' }
                case 'W':
                  return { pos, dir: 'E' }
                case 'S':
                  return { pos, dir: 'N' }
                default:
                  throw new Error('Invalid direction')
              }
            case 270:
              switch (dir) {
                case 'E':
                  return { pos, dir: 'S' }
                case 'S':
                  return { pos, dir: 'W' }
                case 'W':
                  return { pos, dir: 'N' }
                case 'N':
                  return { pos, dir: 'E' }
                default:
                  throw new Error('Invalid direction')
              }
            default:
              throw new Error('Invalid left angle ' + value)
          }
        case 'R':
          switch (value) {
            case 90:
              switch (dir) {
                case 'E':
                  return { pos, dir: 'S' }
                case 'S':
                  return { pos, dir: 'W' }
                case 'W':
                  return { pos, dir: 'N' }
                case 'N':
                  return { pos, dir: 'E' }
                default:
                  throw new Error('Invalid direction')
              }
            case 180:
              switch (dir) {
                case 'E':
                  return { pos, dir: 'W' }
                case 'N':
                  return { pos, dir: 'S' }
                case 'W':
                  return { pos, dir: 'E' }
                case 'S':
                  return { pos, dir: 'N' }
                default:
                  throw new Error('Invalid direction')
              }
            case 270:
              switch (dir) {
                case 'E':
                  return { pos, dir: 'N' }
                case 'N':
                  return { pos, dir: 'W' }
                case 'W':
                  return { pos, dir: 'S' }
                case 'S':
                  return { pos, dir: 'E' }
                default:
                  throw new Error('Invalid direction')
              }
            default:
              throw new Error('Invalid right angle')
          }
        case 'F':
          switch (dir) {
            case 'E':
              return { dir, pos: [x + value, y] }
            case 'S':
              return { dir, pos: [x, y - value] }
            case 'W':
              return { dir, pos: [x - value, y] }
            case 'N':
              return { dir, pos: [x, y + value] }
            default:
              throw new Error('Invalid direction')
          }
        default:
          throw new Error('Unknown action')
      }
    },
    {
      pos: [0, 0],
      dir: 'E',
    },
  )

const part1 = R.pipe(parse, run, R.prop('pos'), R.map(Math.abs), R.sum)

const run2 = (instructions) =>
  instructions.reduce(
    ({ pos, way }, [action, value]) => {
      const [px, py] = pos
      const [wx, wy] = way

      switch (action) {
        case 'N':
          return { pos, way: [wx, wy + value] }
        case 'S':
          return { pos, way: [wx, wy - value] }
        case 'E':
          return { pos, way: [wx + value, wy] }
        case 'W':
          return { pos, way: [wx - value, wy] }
        case 'L':
          switch (value) {
            case 90:
              return { pos, way: [-wy, wx] }
            case 180:
              return { pos, way: [-wx, -wy] }
            case 270:
              return { pos, way: [wy, -wx] }
            default:
              throw new Error('Invalid left angle ' + value)
          }
        case 'R':
          switch (value) {
            case 90:
              return { pos, way: [wy, -wx] }
            case 180:
              return { pos, way: [-wx, -wy] }
            case 270:
              return { pos, way: [-wy, wx] }
            default:
              throw new Error('Invalid right angle')
          }
        case 'F':
          return { way, pos: [px + wx * value, py + wy * value] }
        default:
          throw new Error('Unknown action')
      }
    },
    {
      pos: [0, 0],
      way: [10, 1],
    },
  )

const part2 = R.pipe(parse, run2, R.prop('pos'), R.map(Math.abs), R.sum)

module.exports = {
  part1,
  part2,
}
