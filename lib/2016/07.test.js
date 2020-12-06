const { describeDay } = require('../test-utils')

describeDay(
  2016,
  7,

  110,
  242,

  undefined,

  (_, { supportsTLS }) => {
    test('abba[mnop]qrst supports TLS (abba outside square brackets).', () => {
      expect.assertions(1)
      expect(supportsTLS('abba[mnop]qrst')).toStrictEqual(true)
    })

    test('abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).', () => {
      expect.assertions(1)
      expect(supportsTLS('abcd[bddb]xyyx')).toStrictEqual(false)
    })

    test('aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior characters must be different).', () => {
      expect.assertions(1)
      expect(supportsTLS('aaaa[qwer]tyui')).toStrictEqual(false)
    })

    test("ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even though it's within a larger string).", () => {
      expect.assertions(1)
      expect(supportsTLS('ioxxoj[asdfgh]zxcvbn')).toStrictEqual(true)
    })
  },

  (_, { supportsSSL }) => {
    test('aba[bab]xyz supports SSL (aba outside square brackets with corresponding bab within square brackets).', () => {
      expect.assertions(1)
      expect(supportsSSL('aba[bab]xyz')).toStrictEqual(true)
    })

    test('xyx[xyx]xyx does not support SSL (xyx, but no corresponding yxy).', () => {
      expect.assertions(1)
      expect(supportsSSL('abcd[bddb]xyyx')).toStrictEqual(false)
    })

    test('aaa[kek]eke supports SSL (eke in supernet with corresponding kek in hypernet; the aaa sequence is not related, because the interior character must be different).', () => {
      expect.assertions(1)
      expect(supportsSSL('aaa[kek]eke')).toStrictEqual(true)
    })

    test('zazbz[bzb]cdb supports SSL (zaz has no corresponding aza, but zbz has a corresponding bzb, even though zaz and zbz overlap).', () => {
      expect.assertions(1)
      expect(supportsSSL('zazbz[bzb]cdb')).toStrictEqual(true)
    })
  },
)
