const https = require('https')
const os = require('os')
const fs = require('fs')
const fsp = fs.promises
const crypto = require('crypto')
const path = require('path')
const { getAdventDays, getAdventYears } = require('./time')
const { getDayString } = require('./util')

const TEMP_DIR = fs.realpathSync(os.tmpdir(), 'utf8')

const getSessionHash = (session) =>
  crypto
    .createHash('sha1')
    .update(session)
    .digest('hex')

const getInputCacheFilePath = (year, day, session) =>
  path.join(TEMP_DIR, 'aoc-js', getSessionHash(session), `${year}-${day}.input`)

const getInputURL = (year, day) =>
  `https://adventofcode.com/${year}/day/${day}/input`

const downloadInput = (year, day, session) =>
  new Promise((resolve, reject) => {
    https
      .get(
        getInputURL(year, day),
        {
          headers: {
            Cookie: `session=${session}`,
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            reject(
              new Error(
                `Could not download input for ${year}-${day}: ${res.statusMessage} (${res.statusCode})`,
              ),
            )
          }

          let input = ''

          res.on('data', (d) => {
            input += d
          })

          res.on('end', () => {
            resolve(input)
          })
        },
      )
      .on('error', (e) => {
        reject(new Error(`Could not download input for ${year}-${day}: ${e}`))
      })
  })

const getInput = async (year, day, session) => {
  const cacheFilePath = getInputCacheFilePath(year, day, session)

  try {
    return await fsp.readFile(cacheFilePath, {
      encoding: 'utf8',
      flag: 'r',
    })
  } catch (err) {
    const input = await downloadInput(year, day, session)

    await fsp.mkdir(path.dirname(cacheFilePath), {
      recursive: true,
      mode: 0o755,
    })

    await fsp.writeFile(cacheFilePath, input, {
      encoding: 'utf8',
      mode: 0o644,
      flag: 'w',
    })

    return input
  }
}

const makeInputIO = (year, day) => (input) => {
  const yearDir = path.join(__dirname, '..', `${year}`)

  return fsp
    .mkdir(yearDir, {
      recursive: true,
      mode: 0o755,
    })
    .then(() =>
      fsp.writeFile(
        path.join(yearDir, `${getDayString(day)}.test.input`),
        input,
        {
          encoding: 'utf8',
          mode: 0o644,
          flag: 'w',
        },
      ),
    )
}

const dayIO = (year, day, session) =>
  getInput(year, day, session).then(makeInputIO(year, day))

const yearIO = (year, session) =>
  getAdventDays(year).flatMap((day) => dayIO(year, day, session))

const allIO = (session) =>
  getAdventYears().flatMap((year) => yearIO(year, session))

module.exports = {
  getInput,
  dayIO,
  yearIO,
  allIO,
}
