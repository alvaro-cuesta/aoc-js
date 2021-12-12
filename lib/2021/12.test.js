const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT_1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`

const EXAMPLE_INPUT_2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`

const EXAMPLE_INPUT_3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`

describeDay(
  2021,
  12,

  4304,
  118242,

  undefined,

  (part1) => {
    it('Example input 1', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT_1)).toEqual(10)
    })

    it('Example input 2', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT_2)).toEqual(19)
    })

    it('Example input 3', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT_3)).toEqual(226)
    })
  },

  (part2) => {
    it('Example input 1', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT_1)).toEqual(36)
    })

    it('Example input 2', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT_2)).toEqual(103)
    })

    it('Example input 3', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT_3)).toEqual(3509)
    })
  },
)
