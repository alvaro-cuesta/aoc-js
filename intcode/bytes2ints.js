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
  for await (const chunk of process.stdin) {
    for (const byte of chunk) {
      process.stdout.write(`${byte},`)
    }
  }
}

main()
