#!/usr/bin/env node

require('dotenv').config()

const { dayIO } = require('../lib/advent/solution-io')

const year = parseInt(process.argv[2], 10)
const day = parseInt(process.argv[3], 10)
const session = process.env.SESSION

Promise.all(dayIO(year, day, session)).then(() => {
  console.log('Finished!')
})
