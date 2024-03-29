const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`

describeDay(
  2018,
  4,

  26281,
  73001,

  undefined,

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part1(EXAMPLE_INPUT)).toBe(240)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)
      expect(part2(EXAMPLE_INPUT)).toBe(4455)
    })
  },
)
