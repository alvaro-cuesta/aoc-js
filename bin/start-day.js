#!/usr/bin/env node

require('dotenv').config()

const path = require('path')
const fs = require('fs')
const fsp = fs.promises
const { getDayString } = require('../lib/advent/util')
const { dayIO } = require('../lib/advent/input')

const year = parseInt(process.argv[2], 10)
const day = parseInt(process.argv[3], 10)
const session = process.env.SESSION

const templateDir = path.join(__dirname, '..', 'templates')
const yearDir = path.join(__dirname, '..', 'lib', `${year}`)

const dayTemplateFile = path.join(templateDir, 'XX.js.template')
const testTemplateFile = path.join(templateDir, 'XX.test.js.template')

const dayString = getDayString(day)

const dayFile = path.join(yearDir, `${dayString}.js`)
const testFile = path.join(yearDir, `${dayString}.test.js`)

const fileExists = (path) =>
  fsp
    .stat(path)
    .then(() => true)
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err
      }

      return false
    })

const fillTemplate = (string) =>
  string.replace(/<<YEAR>>/g, year).replace(/<<DAY>>/g, day)

const createFromTemplate = (templateFile, destinationFile) =>
  fsp
    .readFile(templateFile, { encoding: 'utf8', flag: 'r' })
    .then(fillTemplate)
    .then((data) =>
      fsp.writeFile(destinationFile, data, {
        encoding: 'utf8',
        mode: 0o644,
        flag: 'w',
      }),
    )

Promise.all([fileExists(dayFile), fileExists(testFile)])
  .then(([dayFileExists, testFileExists]) => {
    if (dayFileExists) {
      throw new Error(`Day file ${dayFile} already exists`)
    }

    if (testFileExists) {
      throw new Error(`Test file ${testFile} already exists`)
    }

    return Promise.all([
      createFromTemplate(dayTemplateFile, dayFile),
      createFromTemplate(testTemplateFile, testFile),
      dayIO(year, day, session),
    ])
  })
  .then(() => {
    console.log('Finished!')
  })
  .catch((err) => {
    console.error(err)
  })
