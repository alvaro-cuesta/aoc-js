#!/usr/bin/env node

require('dotenv').config()

const { dayIO } = require('../lib/advent/solution-io')

const year = process.argv[2]
const day = process.argv[3]
const session = process.env.SESSION

Promise.all(dayIO(year, day, session)).then(() => {
  console.log('Finished!')
})
