const { getInput } = require('./input')

const printError = (year, day, part) => (err) => {
  console.error(`${year}-${day}-${part}: ${err}\n`)
}

const printSolution = (year, day, part) => (solution) =>
  console.log(`${year}-${day}-${part}: ${solution}\n`)

const solve = (year, day, part) => (input) => {
  let dayModule
  try {
    dayModule = require(`../${year}/${day}`)
  } catch (err) {
    throw new Error(`loading day module: ${err}`)
  }

  let partFn
  try {
    partFn = dayModule[`part${part}`]
  } catch (err) {
    throw new Error(`loading partFn: ${err}`)
  }

  if (partFn === undefined) {
    throw new Error(`part${part} not found`)
  }

  if (typeof partFn !== 'function') {
    throw new Error(`part${part} is not a function: ${partFn}`)
  }

  return partFn(input)
}

const makeSolutionIO = (inputPromise) => (year, day, part) =>
  inputPromise
    .then(solve(year, day, part))
    .then(printSolution(year, day, part))
    .catch(printError(year, day, part))

const partIO = (year, day, part, session) =>
  makeSolutionIO(getInput(year, day, session))(year, day, part)

const dayIO = (year, day, session) => {
  const solutionIO = makeSolutionIO(getInput(year, day, session))

  return getAdventParts(year, day).map((part) => solutionIO(year, day, part))
}

const yearIO = (year, session) =>
  getAdventDays(year).flatMap((day) => dayIO(year, day, session))

const allIO = (session) =>
  getAdventYears().flatMap((year) => yearIO(year, session))

module.exports = {
  partIO,
  dayIO,
  yearIO,
  allIO,
}
