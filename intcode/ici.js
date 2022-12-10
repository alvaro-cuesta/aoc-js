#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const R = require('ramda')
const intcode = require('../lib/2019/intcode')
const { intsFromStream } = require('./util')

const args = require('yargs').usage(
  '$0 <ROM>',
  'Run an Intcode interpreter instance.',
  (yargs) => {
    yargs
      .positional('ROM', {
        type: 'string',
        description: 'The Intcode ROM to run.',
        coerce: (romPath) => {
          romPath = path.normalize(romPath)

          if (!fs.existsSync(romPath)) {
            throw new Error(`ROM file "${romPath}" does not exist.`)
          }

          return fs.readFileSync(romPath, { encoding: 'utf8', flag: 'r' })
        },
      })
      .option('raw', {
        alias: 'r',
        type: 'boolean',
        description:
          'Set stdin as a raw TTY (requires stdin to be a terminal).',
      })
      .check(({ raw }) => {
        if (raw && !process.stdin.isTTY) {
          throw new Error('Raw TTY can only be used if stdin is a terminal.')
        }

        return true
      })
  },
).argv

if (args.raw) {
  process.stdin.setRawMode(true)
}

const outputIt = R.pipe(
  intcode.parseRAM,
  intcode.spawn,
  intcode.asyncIteratorExecutor(intsFromStream(process.stdin)),
)(args.ROM)

async function main() {
  try {
    for await (const int of outputIt) {
      process.stdout.write(`${int},`)
    }
  } catch (err) {
    process.stderr.write(`${err}
`)
    process.exit(1)
  }

  process.exit(0)
}

main()
