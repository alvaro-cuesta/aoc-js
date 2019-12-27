const BYTE_COMMA = 44
const BYTE_MINUS = 45
const BYTE_0 = 48
const BYTE_9 = 57

async function* intsFromStream(stream) {
  let number = null
  let negative = false

  for await (const chunk of stream) {
    for (const byte of chunk) {
      if (byte === BYTE_COMMA) {
        if (number === null) {
          throw new Error('Got an empty int (i.e. two successive commas).')
        }

        yield negative ? -number : number

        number = null
        negative = false
      } else if (byte === BYTE_MINUS) {
        if (number !== null || negative !== false) {
          throw new Error('Got "-" on non-starting position.')
        }

        negative = true
      } else if (byte >= BYTE_0 && byte <= BYTE_9) {
        if (number === null) {
          number = 0
        }

        number = number * 10 + byte - BYTE_0

        // TODO: use BigInts
        if (number > Number.MAX_SAFE_INTEGER) {
          throw new Error(
            `Input number > Number.MAX_SAFE_INTEGER (${Number.MAX_SAFE_INTEGER}).`,
          )
        }
      } else {
        throw new Error(`Got non-digit byte (${byte}).`)
      }
    }
  }
}

module.exports = {
  intsFromStream,
}
