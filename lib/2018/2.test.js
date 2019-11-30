const fs = require("fs");
const path = require("path");

const { part1, part2 } = require("./2");

describe("2018 - Day 2", () => {
  const MY_INPUT = fs.readFileSync(path.join(__dirname, "2.test.input"), {
    encoding: "utf8",
    flag: "r"
  });

  describe("Part 1", () => {
    it("My input", () => {
      expect(part1(MY_INPUT)).toEqual(5976);
    });

    /*
    For example, if you see the following box IDs:

      abcdef contains no letters that appear exactly two or three times.
      bababc contains two a and three b, so it counts for both.
      abbcde contains two b, but no letter appears exactly three times.
      abcccd contains three c, but no letter appears exactly two times.
      aabcdd contains two a and two d, but it only counts once.
      abcdee contains two e.
      ababab contains three a and three b, but it only counts once.

    Of these box IDs, four of them contain a letter which appears exactly twice,
    and three of them contain a letter which appears exactly three times.
    Multiplying these together produces a checksum of 4 * 3 = 12.
    */
    it("Example input", () => {
      expect(
        part1(`abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab
`)
      ).toEqual(12);
    });
  });

  describe("Part 2", () => {
    it("My input", () => {
      expect(part2(MY_INPUT)).toEqual("xretqmmonskvzupalfiwhcfdb");
    });

    /*
    For example, given the following box IDs:

      abcde
      fghij
      klmno
      pqrst
      fguij
      axcye
      wvxyz

    The IDs abcde and axcye are close, but they differ by two characters (the
    second and fourth). However, the IDs fghij and fguij differ by exactly one
    character, the third (h and u). Those must be the correct boxes.
    */
    it("Example input", () => {
      expect(
        part2(`abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
`)
      ).toEqual("fgij");
    });
  });
});
