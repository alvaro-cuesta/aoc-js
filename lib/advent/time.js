const ADVENT_OPEN_HOUR = 0
const ADVENT_UTC_OFFSET = -5
const getAdventOpenTime = (year, month, day) =>
  new Date(Date.UTC(year, month, day, ADVENT_OPEN_HOUR - ADVENT_UTC_OFFSET))

const ADVENT_OPEN_MONTH = 11
const ADVENT_OPEN_DAY = 1
const isDayAvailable = (year, day) => {
  const now = new Date()

  return (
    now >= getAdventOpenTime(year, ADVENT_OPEN_MONTH, ADVENT_OPEN_DAY) &&
    now >= getAdventOpenTime(year, ADVENT_OPEN_MONTH, day)
  )
}

const isYearAvailable = (year) => isDayAvailable(year, ADVENT_OPEN_DAY)

const ADVENT_FIRST_YEAR = 2015
const getAdventYears = () => {
  const now = new Date()
  const nowYear = now.getUTCFullYear()
  const lastAvailableYear = isYearAvailable(nowYear) ? nowYear : nowYear - 1

  return Array(lastAvailableYear - ADVENT_FIRST_YEAR + 1)
    .fill()
    .map((_, year0) => ADVENT_FIRST_YEAR + year0)
}

const ADVENT_CLOSE_DAY = 25
const getAdventDays = (year) =>
  Array(ADVENT_CLOSE_DAY - ADVENT_OPEN_DAY + 1)
    .fill()
    .map((_, day0) => ADVENT_OPEN_DAY + day0)
    .filter((day) => isDayAvailable(year, day))

const ADVENT_PARTS_PER_DAY = 2
const getAdventParts = (year, day) =>
  Array(ADVENT_PARTS_PER_DAY)
    .fill()
    .map((_, part0) => part0 + 1)

module.exports = {
  getAdventYears,
  getAdventDays,
  getAdventParts,
}
