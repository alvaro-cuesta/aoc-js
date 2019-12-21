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

describeDay(
  2019,
  20,

  626,
  null,

  undefined,

  (part1) => {
    test('Small example', () => {
      expect(part1(SMALL_EXAMPLE_INPUT)).toEqual(23)
    })

    test('Big example', () => {
      expect(part1(BIG_EXAMPLE_INPUT)).toEqual(58)
    })
  },

  (part2, dayModule) => {},
)
