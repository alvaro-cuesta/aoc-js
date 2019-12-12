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

Promise.all([
  fsp.copyFile(dayTemplateFile, dayFile, fs.constants.COPYFILE_EXCL),
  fsp.copyFile(testTemplateFile, testFile, fs.constants.COPYFILE_EXCL),
  dayIO(year, day, session),
])
  .then(() => {
    console.log('Finished!')
  })
  .catch((err) => {
    console.error(err)
  })
