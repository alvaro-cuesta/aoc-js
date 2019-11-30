const fs = require("fs");
const path = require("path");

const describeDay = (
  year,
  day,
  part1Solution,
  part2Solution,
  commonTests,
  part1Tests,
  part2Tests
) => {
  const yearFolder = path.join(__dirname, `${year}`);

  const dayModule = require(path.join(yearFolder, `${day}.js`));
  const { part1, part2 } = dayModule;

  describe(`${year} - Day ${day}`, () => {
    const MY_INPUT = fs.readFileSync(
      path.join(yearFolder, `${day}.test.input`),
      {
        encoding: "utf8",
        flag: "r"
      }
    );

    if (commonTests) {
      commonTests(dayModule);
    }

    describe("Part 1", () => {
      it("My input", () => {
        expect(part1(MY_INPUT)).toEqual(part1Solution);
      });

      if (part1Tests) {
        part1Tests(part1, dayModule);
      }
    });

    describe("Part 2", () => {
      it("My input", () => {
        expect(part2(MY_INPUT)).toEqual(part2Solution);
      });

      if (part2Tests) {
        part2Tests(part2, dayModule);
      }
    });
  });
};

module.exports = {
  describeDay
};
