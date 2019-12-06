const { describeDay } = require('../test-utils')

describeDay(
  2015,
  23,

  255,
  334,

  ({ makeRunner, compile }) => {
    it('Example input', () => {
      expect(
        makeRunner()(
          compile(`inc a
jio a, +2
tpl a
inc a
`),
        ),
      ).toEqual({
        a: 2,
        b: 0,
        ip: 4,
      })
    })
  },
)
