const R = require('ramda')
const intcode = require('./intcode')
const assert = require('assert')

const createNode = R.curry(function* node(rom, buffer) {
  const thread = intcode.spawn(rom)

  let { value, done } = thread.next()

  do {
    if (value.type === 'input') {
      if (buffer.length === 0) {
        yield
        ;({ value, done } = thread.next(-1))
      } else {
        yield
        ;({ value, done } = thread.next(buffer.splice(0, 1)[0]))
      }
    } else if (value.type === 'output') {
      const id = value.value

      ;({ value, done } = thread.next())
      assert.equal(value.type, 'output')
      assert.equal(done, false)

      const x = value.value

      ;({ value, done } = thread.next())
      assert.equal(value.type, 'output')
      assert.equal(done, false)

      const y = value.value

      yield [id, x, y]
      ;({ value, done } = thread.next())
    }
  } while (!done)
})

const part1 = (input) => {
  const rom = intcode.parseRAM(input)

  const buffers = Array(50)
    .fill()
    .map((_, i) => [i])

  const nodes = Array(50)
    .fill()
    .map((_, i) => createNode(rom, buffers[i]))

  for (;;) {
    for (const node of nodes) {
      const { value, done } = node.next()

      if (done || value === undefined) {
        continue
      }

      const [id, x, y] = value

      if (id === 255) {
        return y
      }

      buffers[id].push(x, y)
    }
  }
}

const part2 = (input) => {
  throw new Error('Not implemented')
}

module.exports = {
  part1,
  part2,
}
