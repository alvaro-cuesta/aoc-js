const { describeDay } = require('../test-utils')

describeDay(
  2016,
  9,

  120765,
  11658395076,

  undefined,

  (part1) => {
    test('ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.', () => {
      expect.assertions(1)
      expect(part1('ADVENT')).toBe(6)
    })

    test('A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.', () => {
      expect.assertions(1)
      expect(part1('A(1x5)BC')).toBe(7)
    })

    test('(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.', () => {
      expect.assertions(1)
      expect(part1('(3x3)XYZ')).toBe(9)
    })

    test('A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.', () => {
      expect.assertions(1)
      expect(part1('A(2x2)BCD(2x2)EFG')).toBe(11)
    })

    test("(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.", () => {
      expect.assertions(1)
      expect(part1('(6x1)(1x3)A')).toBe(6)
    })

    test('X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.', () => {
      expect.assertions(1)
      expect(part1('X(8x2)(3x3)ABCY')).toBe(18)
    })
  },

  (part2) => {
    test('(3x3)XYZ still becomes XYZXYZXYZ, as the decompressed section contains no markers.', () => {
      expect.assertions(1)
      expect(part2('(3x3)XYZ')).toBe(9)
    })

    test('X(8x2)(3x3)ABCY becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.', () => {
      expect.assertions(1)
      expect(part2('X(8x2)(3x3)ABCY')).toBe(20)
    })

    test('(27x12)(20x12)(13x14)(7x10)(1x12)A decompresses into a string of A repeated 241920 times.', () => {
      expect.assertions(1)
      expect(part2('(27x12)(20x12)(13x14)(7x10)(1x12)A')).toBe(241920)
    })

    test('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN becomes 445 characters long.', () => {
      expect.assertions(1)
      expect(
        part2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'),
      ).toBe(445)
    })
  },
)
