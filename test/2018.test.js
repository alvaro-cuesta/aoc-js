describe("Day 1", () => {
  it("Part 1", () => {
    const { part1 } = require("../lib/2018/1");
    const input =
      /*  For example, if the device displays frequency changes of +1, -2, +3, +1,
        then starting from a frequency of zero, the following changes would occur:

          Current frequency  0, change of +1; resulting frequency  1.
          Current frequency  1, change of -2; resulting frequency -1.
          Current frequency -1, change of +3; resulting frequency  2.
          Current frequency  2, change of +1; resulting frequency  3.

        In this example, the resulting frequency is 3.
    */
      expect(
        part1(`+1
-2
+3
+1
`)
      ).toEqual(3);

    // +1, +1, +1 results in  3
    expect(
      part1(`+1
+1
+1
`)
    ).toEqual(3);

    // +1, +1, -2 results in  0
    expect(
      part1(`+1
+1
-2
`)
    ).toEqual(0);

    // -1, -2, -3 results in -6
    expect(
      part1(`-1
-2
-3
`)
    ).toEqual(-6);
  });
});
