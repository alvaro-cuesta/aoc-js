#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const I = require('iter-tools')
const { intsFromStream } = require('./util')

const args = require('yargs').usage(
  '$0 <TILEMAP>',
  'Acts as a game screen.',
  (yargs) => {
    yargs
      .positional('TILEMAP', {
        type: 'string',
        description: 'The tile map. A JSON of type { [tileCode]: tileString }.',
        coerce: (tilemapPath) => {
          tilemapPath = path.normalize(tilemapPath)

          if (!fs.existsSync(tilemapPath)) {
            throw new Error(`TILEMAP file "${tilemapPath}" does not exist.`)
          }

          const contents = fs.readFileSync(tilemapPath, {
            encoding: 'utf8',
            flag: 'r',
          })

          return JSON.parse(contents)
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

let [h, w] = process.stdout.getWindowSize()

process.stdout.on('resize', () => {
  ;[h, w] = process.stdout.getWindowSize()
})

const main = async () => {
  try {
    await new Promise((resolve) => process.stdout.cursorTo(0, 0, resolve))
    await new Promise((resolve) => process.stdout.clearScreenDown(resolve))

    const commands = I.execPipe(intsFromStream(process.stdin), I.asyncBatch(3))

    for await (const [x, y, tileCode] of commands) {
      if (x === -1 && y === 0) {
        await new Promise((resolve) => process.stdout.cursorTo(0, 0, resolve))
        await new Promise((resolve) => process.stdout.clearLine(0, resolve))
        process.stdout.write(`${tileCode}`)
        continue
      }

      if (y + 2 > h) {
        process.stderr.write(
          `Console is not tall enough. Currently ${h} rows but got ${y +
            2} tile.
`,
        )
        process.exit(1)
      }

      if (x > w) {
        process.stderr.write(
          `Console is not wide enough. Currently ${w} columns but got ${x} tile.
`,
        )
        process.exit(1)
      }

      const tile = args.tilemap[tileCode]

      if (tile === undefined) {
        process.stderr.write(`Unknown tile ${tileCode}.
`)
        process.exit(1)
      }

      await new Promise((resolve) => process.stdout.cursorTo(x, y + 2, resolve))
      process.stdout.write(tile)

      await new Promise((resolve) => process.stdout.cursorTo(0, h, resolve))
    }
  } catch (err) {
    process.stderr.write(`${err}
`)
    process.exit(1)
  }

  process.exit(0)
}

main()
