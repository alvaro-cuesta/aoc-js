#!/usr/bin/env node

require('dotenv').config()

const { yearIO } = require('../lib/advent/solution-io')

const year = process.argv[2]
const session = process.env.SESSION

Promise.all(yearIO(year, session)).then(() => {
  console.log('Finished!')
})
