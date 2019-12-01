const { describeDay } = require("../test-utils");

describeDay(
  2019,
  1,

  3317668,
  4973628,

  undefined,

  (_, { requiredFuel }) => {
    describe("requiredFuel", () => {
      it("For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.", () => {
        expect(requiredFuel(12)).toEqual(2);
      });

      it("For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.", () => {
        expect(requiredFuel(14)).toEqual(2);
      });

      it("For a mass of 1969, the fuel required is 654.", () => {
        expect(requiredFuel(1969)).toEqual(654);
      });

      it("For a mass of 100756, the fuel required is 33583.", () => {
        expect(requiredFuel(100756)).toEqual(33583);
      });
    });
  },

  (_, { requiredFuelRecursive }) => {
    describe("requiredFuelRecursive", () => {
      it("A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2 divided by 3 and rounded down is 0, which would call for a negative fuel), so the total fuel required is still just 2.", () => {
        expect(requiredFuelRecursive(14)).toEqual(2);
      });

      it("At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires 216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires 21 fuel, which requires 5 fuel, which requires no further fuel. So, the total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 = 966.", () => {
        expect(requiredFuelRecursive(1969)).toEqual(966);
      });

      it("The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 + 3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.", () => {
        expect(requiredFuelRecursive(100756)).toEqual(50346);
      });
    });
  }
);
