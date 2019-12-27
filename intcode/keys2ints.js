#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const args = require('yargs').usage(
  '$0 <KEYMAP>',
  'Transforms keypresses into comma-separated ints.',
  (yargs) => {
    yargs
      .positional('KEYMAP', {
        type: 'string',
        description: 'The key map. A JSON of type { [hexString]: int }.',
        coerce: (keymapPath) => {
          keymapPath = path.normalize(keymapPath)

          if (!fs.existsSync(keymapPath)) {
            throw new Error(`KEYMAP file "${keymapPath}" does not exist.`)
          }

          const contents = fs.readFileSync(keymapPath, {
            encoding: 'utf8',
            flag: 'r',
          })

          return JSON.parse(contents)
        },
      })
      .option('kps', {
        alias: 'k',
        type: 'number',
        description: `Keypresses-per-second to send. If no key has been pressed it will send the keymap's "null" value. Set to 0 to disable.`,
        default: 4,
      })
      .option('ignore-signals', {
        alias: 'i',
        type: 'boolean',
        description: 'Ignores exiting on CTRL+C, CTRL+D.',
      })
      .option('exit-on-unknown', {
        alias: 'x',
        type: 'boolean',
        description: 'Exits when receiving a key not specified in the keymap.',
      })
      .check((args) => {
        if (args.kps && args.kps > 0 && args.keymap.null === undefined) {
          throw new Error(
            'No "null" key specified in keymap. Required when running on KPS mode.',
          )
        }

        return true
      })
  },
).argv

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

process.stdin.setEncoding('hex')

let lastCode = null

if (args.kps && args.kps > 0) {
  lastCode = args.keymap.null

  setInterval(() => {
    process.stdout.write(`${lastCode},`)
    lastCode = args.keymap.null
  }, 1000 / args.kps)
}

const main = async () => {
  try {
    for await (const keyCode of process.stdin) {
      if (!args.ignoreSignals) {
        if (keyCode === '03' || keyCode === '04') {
          process.exit(0)
        }
      }

      const code = args.keymap[keyCode]

      if (code === undefined) {
        if (args.exitOnUnknown) {
          process.stderr.write(`Unknown keyCode ${keyCode}.
`)
          process.exit(1)
        }

        continue
      }

      if (args.kps && args.kps > 0) {
        lastCode = code
      } else {
        process.stdout.write(`${code},`)
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
