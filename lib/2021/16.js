const R = require('ramda')

const parseStream = (input) =>
  input
    .trim()
    .split('\n')
    .join('')
    .split('')
    .map((x) => parseInt(x, 16).toString(2).padStart(4, '0'))
    .join('')

const VERSION_LENGTH = 3

const ID_LENGTH = 3

const HEADER_LENGTH = VERSION_LENGTH + ID_LENGTH

const LITERAL_GROUP_LENGTH = 4

const parseLiteral = (remaining) => {
  let binary = ''

  while (remaining[0] === '1') {
    binary += remaining.slice(1, 1 + LITERAL_GROUP_LENGTH)
    remaining = remaining.slice(1 + LITERAL_GROUP_LENGTH)
  }

  binary += remaining.slice(1, 1 + LITERAL_GROUP_LENGTH)
  remaining = remaining.slice(1 + LITERAL_GROUP_LENGTH)

  return [parseInt(binary, 2), remaining]
}

const LENGTH_TYPE_ID_BITLENGTH = '0'
const LENGTH_TYPE_ID_SUBPACKETS = '1'

const LENGTH_TYPE_ID_BITLENGTH_LENGTH = 15
const LENGTH_TYPE_ID_SUBPACKETS_LENGTH = 11

const parseOperator = (remaining) => {
  switch (remaining[0]) {
    case LENGTH_TYPE_ID_BITLENGTH: {
      const subpacketsBitlength = parseInt(
        remaining.slice(1, 1 + LENGTH_TYPE_ID_BITLENGTH_LENGTH),
        2,
      )

      let innerRemaining = remaining.slice(
        1 + LENGTH_TYPE_ID_BITLENGTH_LENGTH,
        1 + LENGTH_TYPE_ID_BITLENGTH_LENGTH + subpacketsBitlength,
      )

      const subpackets = []

      while (innerRemaining.length > 0) {
        let packet
        ;[packet, innerRemaining] = parsePacket(innerRemaining)

        subpackets.push(packet)
      }

      remaining = remaining.slice(
        1 + LENGTH_TYPE_ID_BITLENGTH_LENGTH + subpacketsBitlength,
      )

      return [subpackets, remaining]
    }
    case LENGTH_TYPE_ID_SUBPACKETS: {
      const subpacketsCount = parseInt(
        remaining.slice(1, 1 + LENGTH_TYPE_ID_SUBPACKETS_LENGTH),
        2,
      )

      remaining = remaining.slice(1 + LENGTH_TYPE_ID_SUBPACKETS_LENGTH)

      const subpackets = []

      for (let i = 0; i < subpacketsCount; i++) {
        let packet
        ;[packet, remaining] = parsePacket(remaining)

        subpackets.push(packet)
      }

      return [subpackets, remaining]
    }
    default: {
      throw new Error('Unexpected operator length type ID')
    }
  }
}

const parsePacket = (remaining) => {
  if (remaining.length < VERSION_LENGTH + ID_LENGTH) {
    throw new Error('Not enough remaining bits for header')
  }

  const version = parseInt(remaining.slice(0, VERSION_LENGTH), 2)
  const id = parseInt(remaining.slice(VERSION_LENGTH, HEADER_LENGTH), 2)

  remaining = remaining.slice(HEADER_LENGTH)

  if (id === 4) {
    let value
    ;[value, remaining] = parseLiteral(remaining)

    return [
      {
        version,
        id,
        type: 'literal',
        value,
      },
      remaining,
    ]
  } else {
    let subpackets
    ;[subpackets, remaining] = parseOperator(remaining)

    return [
      {
        version,
        id,
        type: 'operator',
        subpackets,
      },
      remaining,
    ]
  }
}

const sumVersions = (packet) => {
  switch (packet.type) {
    case 'literal': {
      return packet.version
    }

    case 'operator': {
      return (
        packet.version +
        R.sum(packet.subpackets.map((subpacket) => sumVersions(subpacket)))
      )
    }

    default: {
      throw new Error('Unknown packet type')
    }
  }
}

const part1 = (input) => {
  const stream = parseStream(input)
  const [packet, remaining] = parsePacket(stream)

  if (!remaining.split('').every((x) => x === '0')) {
    throw new Error('Found non-zero in trailing bits')
  }

  return sumVersions(packet)
}

const evaluatePacket = (packet) => {
  switch (packet.type) {
    case 'literal': {
      return packet.value
    }

    case 'operator': {
      const subpacketValues = packet.subpackets.map(evaluatePacket)

      switch (packet.id) {
        case 0: {
          // Sum packet
          return R.sum(subpacketValues)
        }
        case 1: {
          // Product packet
          return R.product(subpacketValues)
        }
        case 2: {
          // Minimum packet
          return R.reduce(R.min, +Infinity, subpacketValues)
        }
        case 3: {
          // Maximum packet
          return R.reduce(R.max, -Infinity, subpacketValues)
        }
        case 5: {
          // Greater-than packet
          if (subpacketValues.length !== 2) {
            throw new Error('Expected 2 packets in GT packet')
          }

          return subpacketValues[0] > subpacketValues[1] ? 1 : 0
        }
        case 6: {
          // Less-than packet
          if (subpacketValues.length !== 2) {
            throw new Error('Expected 2 packets in LT packet')
          }

          return subpacketValues[0] < subpacketValues[1] ? 1 : 0
        }
        case 7: {
          // Equal packet
          if (subpacketValues.length !== 2) {
            throw new Error('Expected 2 packets in EQ packet')
          }

          return subpacketValues[0] === subpacketValues[1] ? 1 : 0
        }

        default: {
          throw new Error('Unknown operator packet id')
        }
      }
    }

    default: {
      throw new Error('Unknown packet type')
    }
  }
}

const part2 = (input) => {
  const stream = parseStream(input)
  const [packet, remaining] = parsePacket(stream)

  if (!remaining.split('').every((x) => x === '0')) {
    throw new Error('Found non-zero in trailing bits')
  }

  return evaluatePacket(packet)
}

module.exports = {
  part1,
  part2,
  parseStream,
  parsePacket,
}
