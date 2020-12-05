const parsePassports = (input) =>
  input
    .trim()
    .split('\n\n')
    .map((x) =>
      x.split(/\s+/).reduce((acc, y) => {
        const [k, v] = y.split(':')
        acc[k] = v
        return acc
      }, {}),
    )

const REQUIRED_FIELDS = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
]

const isValidPassport = (passport) =>
  REQUIRED_FIELDS.every((field) => passport[field] !== undefined)

const part1 = (input) => {
  const passports = parsePassports(input)
  const validPassports = passports.filter(isValidPassport).length

  return validPassports
}

const EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const isExtendedValidPassport = (passport) => {
  const byr = parseInt(passport.byr, 10)
  const iyr = parseInt(passport.iyr, 10)
  const eyr = parseInt(passport.eyr, 10)
  const hgtMatch = /^(\d+)(cm|in)$/.exec(passport.hgt)
  const hgtNum = hgtMatch !== null ? parseInt(hgtMatch[1], 10) : null

  const byrValid = byr >= 1920 && byr <= 2002
  const iyrValid = iyr >= 2010 && iyr <= 2020
  const eyrValid = eyr >= 2020 && eyr <= 2030
  const hgtValid =
    hgtMatch !== null &&
    (hgtMatch[2] === 'cm'
      ? hgtNum >= 150 && hgtNum <= 193
      : hgtMatch[2] === 'in'
      ? hgtNum >= 59 && hgtNum <= 76
      : false)
  const hclValid = /^#[0-9a-f]{6}$/.test(passport.hcl)
  const eclValid = EYE_COLORS.includes(passport.ecl)
  const pidValid = /^\d{9}$/.test(passport.pid)

  return (
    byrValid &&
    iyrValid &&
    eyrValid &&
    hgtValid &&
    hclValid &&
    eclValid &&
    pidValid
  )
}

const part2 = (input) => {
  const passports = parsePassports(input)
  const validPassports = passports.filter(isExtendedValidPassport).length

  return validPassports
}

module.exports = {
  part1,
  part2,
}
