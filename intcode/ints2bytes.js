#!/usr/bin/env node

const { intsFromStream } = require('./util')

const args = require('yargs').usage(
  '$0',
  'Transforms comma-separated ints into bytes.',
  (yargs) => {
    yargs
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
    /* TODO:
      .option('normalize-newline', {
        alias: 'n',
        type: 'boolean',
        description: 'Normalize LF (10) to CRLF (13, 10).',
        default: process.platform === 'win32',
      })
      .check(({ normalizeNewline }) => {
        if (normalizeNewline) {
          throw new Error('Newline normalization not yet implemented.')
        }

        return true
      })
      */
  },
).argv

if (args.raw) {
  process.stdin.setRawMode(true)
}

async function main() {
  try {
    const byte = Buffer.alloc(1)

    for await (const int of intsFromStream(process.stdin)) {
      if (int > 255) {
        process.stderr.write(`Input value >255 (${int}).
`)
        process.exit(1)
      }

      byte[0] = int

      process.stdout.write(byte)
    }
  } catch (err) {
    process.stderr.write(`${err}
`)
    process.exit(1)
  }

  process.exit(0)
}

main()
