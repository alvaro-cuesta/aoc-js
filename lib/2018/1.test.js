const { part1, part2 } = require("./1");

describe("2018 - Day 1", () => {
  const EXAMPLE_INPUT = `+1
-2
+3
+1
`;

  describe("Part 1", () => {
    /*
    For example, if the device displays frequency changes of +1, -2, +3, +1,
    then starting from a frequency of zero, the following changes would occur:

      Current frequency  0, change of +1; resulting frequency  1.
      Current frequency  1, change of -2; resulting frequency -1.
      Current frequency -1, change of +3; resulting frequency  2.
      Current frequency  2, change of +1; resulting frequency  3.

    In this example, the resulting frequency is 3.
    */
    it("Example input", () => {
      expect(part1(EXAMPLE_INPUT)).toEqual(3);
    });

    it("+1, +1, +1 results in  3", () => {
      expect(
        part1(`+1
+1
+1
`)
      ).toEqual(3);
    });

    it("+1, +1, -2 results in  0", () => {
      expect(
        part1(`+1
+1
-2
`)
      ).toEqual(0);
    });

    it("-1, -2, -3 results in -6", () => {
      expect(
        part1(`-1
-2
-3
`)
      ).toEqual(-6);
    });
  });

  describe("Part 2", () => {
    /*
    For example, using the same list of changes above, the device would loop as
    follows:

      Current frequency  0, change of +1; resulting frequency  1.
      Current frequency  1, change of -2; resulting frequency -1.
      Current frequency -1, change of +3; resulting frequency  2.
      Current frequency  2, change of +1; resulting frequency  3.
      (At this point, the device continues from the start of the list.)
      Current frequency  3, change of +1; resulting frequency  4.
      Current frequency  4, change of -2; resulting frequency  2, which has already been seen.

    In this example, the first frequency reached twice is 2.
    */
    it("Example input", () => {
      expect(part2(EXAMPLE_INPUT)).toEqual(2);
    });

    it("+1, -1 first reaches 0 twice.", () => {
      expect(
        part2(`+1
-1
`)
      ).toEqual(0);
    });

    it("+3, +3, +4, -2, -4 first reaches 10 twice.", () => {
      expect(
        part2(`+3
+3
+4
-2
-4
`)
      ).toEqual(10);
    });

    it("-6, +3, +8, +5, -6 first reaches 5 twice.", () => {
      expect(
        part2(`-6
+3
+8
+5
-6
`)
      ).toEqual(5);
    });

    it("+7, +7, -2, -7, -4 first reaches 14 twice.", () => {
      expect(
        part2(`+7
+7
-2
-7
-4
`)
      ).toEqual(14);
    });
  });
});
