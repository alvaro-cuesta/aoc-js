const { describeDay } = require('../test-utils')

describeDay(
  2016,
  8,

  110,
  '\n' +
    '####   ## #  # ###  #  #  ##  ###  #    #   #  ## \n' +
    '   #    # #  # #  # # #  #  # #  # #    #   #   # \n' +
    '  #     # #### #  # ##   #    #  # #     # #    # \n' +
    ' #      # #  # ###  # #  #    ###  #      #     # \n' +
    '#    #  # #  # # #  # #  #  # #    #      #  #  # \n' +
    '####  ##  #  # #  # #  #  ##  #    ####   #   ##  \n',

  ({ setRect, rotateColumn, rotateRow }) => {
    test('rect 3x2 creates a small rectangle in the top-left corner', () => {
      expect.assertions(1)

      const screen = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
      ]
      setRect(screen, 3, 2)

      expect(screen).toStrictEqual([
        [true, true, true, false, false, false, false],
        [true, true, true, false, false, false, false],
        [false, false, false, false, false, false, false],
      ])
    })

    test('rotate column x=1 by 1 rotates the second column down by one pixel', () => {
      expect.assertions(1)

      const screen = [
        [true, true, true, false, false, false, false],
        [true, true, true, false, false, false, false],
        [false, false, false, false, false, false, false],
      ]
      rotateColumn(screen, 1, 1)

      expect(screen).toStrictEqual([
        [true, false, true, false, false, false, false],
        [true, true, true, false, false, false, false],
        [false, true, false, false, false, false, false],
      ])
    })

    test('rotate row y=0 by 4 rotates the top row right by four pixels', () => {
      expect.assertions(1)

      const screen = [
        [true, false, true, false, false, false, false],
        [true, true, true, false, false, false, false],
        [false, true, false, false, false, false, false],
      ]
      rotateRow(screen, 0, 4)

      expect(screen).toStrictEqual([
        [false, false, false, false, true, false, true],
        [true, true, true, false, false, false, false],
        [false, true, false, false, false, false, false],
      ])
    })

    test('rotate column x=1 by 1 again rotates the second column down by one pixel, causing the bottom pixel to wrap back to the top', () => {
      expect.assertions(1)

      const screen = [
        [false, false, false, false, true, false, true],
        [true, true, true, false, false, false, false],
        [false, true, false, false, false, false, false],
      ]
      rotateColumn(screen, 1, 1)

      expect(screen).toStrictEqual([
        [false, true, false, false, true, false, true],
        [true, false, true, false, false, false, false],
        [false, true, false, false, false, false, false],
      ])
    })
  },
)
