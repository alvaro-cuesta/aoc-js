const R = require('ramda')

const _add = R.pipe(R.zip, R.map(R.sum))

const add = R.curry((a, b) => {
  if (a.length !== b.length) {
    throw new Error(`Trying to add vecs of different dimensions`)
  }

  return _add(a, b)
})

const neg = R.map(R.negate)

const sub = R.curry((a, b) => add(a, neg(b)))

// use this as string keys for JS objects
// useful for caches and such
const key = (x) => `[${x.join(',')}]`

// like `key` but avoids allocating
// useful for temporary stuff
const keyArgs = (...x) => `[${x.join(',')}]`

module.exports = {
  add,
  neg,
  sub,
  key,
  keyArgs,
}
