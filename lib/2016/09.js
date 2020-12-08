const DECOMPRESS_REGEX = /\((\d+)x(\d+)\)/

const part1 = (input) => {
  const cleanInput = input.trim()

  let totalChars = 0,
    lastMatchedIndex = 0

  const re = new RegExp(DECOMPRESS_REGEX, 'g')

  let match
  while ((match = re.exec(cleanInput)) !== null) {
    const a = parseInt(match[1], 10)
    const b = parseInt(match[2], 10)

    re.lastIndex += a
    totalChars += a * b + (match.index - lastMatchedIndex)

    lastMatchedIndex = match.index + match[0].length + a
  }

  return totalChars + (cleanInput.length - lastMatchedIndex)
}

const part2 = (input) => {
  let remaining = input.trim()

  let totalChars = 0

  let match
  while ((match = DECOMPRESS_REGEX.exec(remaining)) !== null) {
    const a = parseInt(match[1], 10)
    const b = parseInt(match[2], 10)

    const dataIndex = match.index + match[0].length
    const dataEndIndex = dataIndex + a
    const data = remaining.slice(dataIndex, dataEndIndex)

    totalChars += part2(data) * b + match.index

    remaining = remaining.slice(dataEndIndex)
  }

  return totalChars + remaining.length
}

module.exports = {
  part1,
  part2,
}
