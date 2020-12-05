const crypto = require('crypto')

const md5 = (str) => crypto.createHash('md5').update(str).digest('hex')

const getHash = (str) => {
  let hash = ''

  for (let i = 0; hash.length < 8; i++) {
    const innerHash = md5(str + i)

    if (innerHash.slice(0, 5) === '00000') {
      hash += innerHash[5]
    }
  }

  return hash
}

const getAdvancedHash = (str) => {
  let hash = []

  for (let i = 0; hash.filter((x) => x !== undefined).length < 8; i++) {
    const innerHash = md5(str + i)

    if (innerHash.slice(0, 5) === '00000') {
      const index = parseInt(innerHash[5], 16)

      if (index < 8 && hash[index] === undefined) {
        hash[index] = innerHash[6]
      }
    }
  }

  return hash.join('')
}

const part1 = (input) => getHash(input.trim())

const part2 = (input) => getAdvancedHash(input.trim())

module.exports = {
  part1,
  part2,
}
