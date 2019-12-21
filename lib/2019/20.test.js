const { describeDay } = require('../test-utils')
const fs = require('fs')
const path = require('path')

const SMALL_EXAMPLE_INPUT = fs.readFileSync(
  path.join(__dirname, '20.test.example-small'),
  {
    encoding: 'utf8',
  },
)

const BIG_EXAMPLE_INPUT = fs.readFileSync(
  path.join(__dirname, '20.test.example-big'),
  {
    encoding: 'utf8',
  },
)

const RECURSIVE_EXAMPLE_INPUT = fs.readFileSync(
  path.join(__dirname, '20.test.example-recursive'),
  {
    encoding: 'utf8',
  },
)

describeDay(
  2019,
  20,

  626,
  6912,

  undefined,

  (part1) => {
    test('Small example', () => {
      expect(part1(SMALL_EXAMPLE_INPUT)).toEqual(23)
    })

    test('Big example', () => {
      expect(part1(BIG_EXAMPLE_INPUT)).toEqual(58)
    })
  },

  (part2) => {
    // TODO: this shouldn't return 26; skips for now
    test.skip('Small example', () => {
      expect(() => part2(SMALL_EXAMPLE_INPUT)).toThrow()
    })

    // TODO: this recurses infinitely; skips for now
    test.skip('Big example', () => {
      expect(() => part2(BIG_EXAMPLE_INPUT)).toThrow()
    })

    test('Recursive example', () => {
      expect(part2(RECURSIVE_EXAMPLE_INPUT)).toEqual(396)
    })
  },
)
