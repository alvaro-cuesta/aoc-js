const { describeDay } = require("../test-utils");

const EXAMPLE_INPUT = `dabAcCaCBAcCcaDA
`;

describeDay(
  2018,
  5,

  11668,
  4652,

  ({ react }) => {
    describe("react", () => {
      it("In aA, a and A react, leaving nothing behind", () => {
        expect(react("aA")).toEqual("");
      });

      it("In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.", () => {
        expect(react("abBA")).toEqual("");
      });

      it("In abAB, no two adjacent units are of the same type, and so nothing happens.", () => {
        expect(react("abAB")).toEqual("abAB");
      });

      it("In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.", () => {
        expect(react("aabAAB")).toEqual("aabAAB");
      });

      /*
    Now, consider a larger example, dabAcCaCBAcCcaDA:

      dabAcCaCBAcCcaDA  The first 'cC' is removed.
      dabAaCBAcCcaDA    This creates 'Aa', which is removed.
      dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
      dabCBAcaDA        No further actions can be taken.

    */
      it("Example input", () => {
        expect(react("dabAcCaCBAcCcaDA")).toEqual("dabCBAcaDA");
      });
    });
  },

  part1 => {
    it("In aA, a and A react, leaving nothing behind", () => {
      expect(
        part1(`aA
`)
      ).toEqual(0);
    });

    it("In abBA, bB destroys itself, leaving aA. As above, this then destroys itself, leaving nothing.", () => {
      expect(
        part1(`abBA
`)
      ).toEqual(0);
    });

    it("In abAB, no two adjacent units are of the same type, and so nothing happens.", () => {
      expect(
        part1(`abAB
`)
      ).toEqual(4);
    });

    it("In aabAAB, even though aa and AA are of the same type, their polarities match, and so nothing happens.", () => {
      expect(
        part1(`aabAAB
`)
      ).toEqual(6);
    });

    /*
    Now, consider a larger example, dabAcCaCBAcCcaDA:

      dabAcCaCBAcCcaDA  The first 'cC' is removed.
      dabAaCBAcCcaDA    This creates 'Aa', which is removed.
      dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
      dabCBAcaDA        No further actions can be taken.

    After all possible reactions, the resulting polymer contains 10 units.
    */
    it("Example input", () => {
      expect(part1(EXAMPLE_INPUT)).toEqual(10);
    });
  },

  part2 => {
    it("Example input", () => {
      expect(part2(EXAMPLE_INPUT)).toEqual(4);
    });
  }
);
