#!/usr/bin/env node

const args = require('yargs').usage(
  '$0',
  'Transforms bytes into comma-separated ints.',
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
      .option('normalize-newline', {
        alias: 'n',
        type: 'boolean',
        description: 'Normalize CRLF (13, 10) to LF (10).',
        default: process.platform === 'win32',
      })
      .check(({ normalizeNewline }) => {
        if (normalizeNewline) {
          throw new Error('Newline normalization not yet implemented.')
        }

        return true
      })
  },
).argv

if (args.raw) {
  process.stdin.setRawMode(true)
}

const main = async () => {
  try {
    for await (const chunk of process.stdin) {
      for (const byte of chunk) {
        process.stdout.write(`${byte},`)
      }
    }
  } catch (err) {
    process.stderr.write(`${err}
`)
    process.exit(1)
  }

  process.exit(0)
}

main()
