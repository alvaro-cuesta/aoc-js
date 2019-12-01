#!/usr/bin/env node

require('dotenv').config()

const fsp = require('fs').promises
const path = require('path')
const { getInput } = require('../lib/advent/input')
const { getAdventDays, getAdventYears } = require('../lib/advent/time')

const makeInputIO = (year, day) => (input) => {
  const yearDir = path.join(__dirname, '..', 'lib', `${year}`)

  return fsp
    .mkdir(yearDir, {
      recursive: true,
      mode: 0o755,
    })
    .then(() =>
      fsp.writeFile(path.join(yearDir, `${day}.test.input`), input, {
        encoding: 'utf8',
        mode: 0o644,
        flag: 'w',
      }),
    )
}

const dayIO = (year, day, session) =>
  getInput(year, day, session).then(makeInputIO(year, day))

const yearIO = (year, session) =>
  getAdventDays(year).flatMap((day) => dayIO(year, day, session))

const allIO = (session) =>
  getAdventYears().flatMap((year) => yearIO(year, session))

const session = process.env.SESSION

Promise.all(allIO(session))
  .then(() => {
    console.log('Finished!')
  })
  .catch((err) => {
    console.error(err)
  })
