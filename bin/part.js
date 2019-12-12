#!/usr/bin/env node

require('dotenv').config()

const { partIO } = require('../lib/advent/solution-io')

const year = parseInt(process.argv[2], 10)
const day = parseInt(process.argv[3], 10)
const part = parseInt(process.argv[4], 10)
const session = process.env.SESSION

partIO(year, day, part, session).then(() => {
  console.log('Finished!')
})
