const fs = require("fs");
const path = require("path");

const { part1, part2 } = require("./3");

describe("2018 - Day 3", () => {
  const MY_INPUT = fs.readFileSync(path.join(__dirname, "3.test.input"), {
    encoding: "utf8",
    flag: "r"
  });

  const EXAMPLE_INPUT = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`;

  describe("Part 1", () => {
    it("My input", () => {
      expect(part1(MY_INPUT)).toEqual(111326);
    });

    /*
    For example, consider the following claims:

      #1 @ 1,3: 4x4
      #2 @ 3,1: 4x4
      #3 @ 5,5: 2x2

    Visually, these claim the following areas:

      ........
      ...2222.
      ...2222.
      .11XX22.
      .11XX22.
      .111133.
      .111133.
      ........

    The four square inches marked with X are claimed by both 1 and 2.
    */
    it("Example input", () => {
      expect(part1(EXAMPLE_INPUT)).toEqual(4);
    });
  });

  describe("Part 2", () => {
    it("My input", () => {
      expect(part2(MY_INPUT)).toEqual(1019);
    });

    /*
    For example, in the claims above, only claim 3 is intact after all claims are made.
    */
    it("Example input", () => {
      expect(part2(EXAMPLE_INPUT)).toEqual(3);
    });
  });
});
