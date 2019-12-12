#!/usr/bin/env node

require('dotenv').config()

const { allIO } = require('../lib/advent/input')

const session = process.env.SESSION

Promise.all(allIO(session))
  .then(() => {
    console.log('Finished!')
  })
  .catch((err) => {
    console.error(err)
  })
