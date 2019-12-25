const BYTE_COMMA = 44
const BYTE_0 = 48
const BYTE_9 = 57

const args = require('yargs')
  .option('raw', {
    alias: 'r',
    type: 'boolean',
    description: 'Set stdin as a raw TTY (requires stdin to be a terminal)',
  })
  .check(({ raw }) => {
    if (raw && !process.stdin.isTTY) {
      throw new Error('Raw TTY can only be used if stdin is a terminal')
    }

    return true
  }).argv

if (args.raw) {
  process.stdin.setRawMode(true)
}

const main = async () => {
  let byte = Buffer.alloc(1, 0)

  for await (const chunk of process.stdin) {
    for (const digitByte of chunk) {
      if (digitByte === BYTE_COMMA) {
        process.stdout.write(byte)
        byte[0] = 0
      } else if (digitByte >= BYTE_0 && digitByte <= BYTE_9) {
        const newNumber = byte[0] * 10 + digitByte - BYTE_0

        if (newNumber > 255) {
          process.stderr.write(`Input value >255 (${newNumber}...)`)
          process.exit(1)
        }

        byte[0] = newNumber
      } else {
        process.stderr.write(`Got non-digit byte (${digitByte})`)
        process.exit(2)
      }
    }
  }
}

main()
