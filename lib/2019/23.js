const R = require('ramda')
const intcode = require('./intcode')
const assert = require('assert')

const createNode = R.curry(function* node(rom, buffer) {
  const thread = intcode.spawn(rom)

  let { value, done } = thread.next()

  do {
    if (value.type === 'input') {
      if (buffer.length === 0) {
        yield true
        ;({ value, done } = thread.next(-1))
      } else {
        yield false
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

      if (done || value === true || value === false) {
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
  const rom = intcode.parseRAM(input)

  const buffers = Array(50)
    .fill()
    .map((_, i) => [i])

  const nodes = Array(50)
    .fill()
    .map((_, i) => createNode(rom, buffers[i]))

  let nat = null

  const seen = {}

  for (;;) {
    let idle = 0

    for (const node of nodes) {
      const { value, done } = node.next()

      if (done || value === false) {
        continue
      } else if (value === true) {
        idle++
        continue
      } else if (Array.isArray(value)) {
        const [id, x, y] = value

        if (id === 255) {
          nat = [x, y]
        } else {
          buffers[id].push(x, y)
        }
      } else {
        throw new Error('Unreachable')
      }
    }

    if (idle === 50 && nat !== null) {
      buffers[0].push(...nat)

      const naty = nat[1]

      if (seen[naty]) {
        return naty
      }

      seen[naty] = true
    }
  }
}

module.exports = {
  part1,
  part2,
}
