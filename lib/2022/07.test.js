const { describeDay } = require('../test-utils')

const EXAMPLE_INPUT = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

const EXAMPLE_EXPECTED_TREE = {
  __files__: {
    'b.txt': 14848514,
    'c.dat': 8504156,
  },
  __shallowTotal__: 23352670,
  a: {
    __files__: {
      f: 29116,
      g: 2557,
      'h.lst': 62596,
    },
    __shallowTotal__: 94269,
    e: {
      __files__: {
        i: 584,
      },
      __shallowTotal__: 584,
    },
  },
  d: {
    __files__: {
      'd.ext': 5626152,
      'd.log': 8033020,
      j: 4060174,
      k: 7214296,
    },
    __shallowTotal__: 24933642,
  },
}

const EXAMPLE_EXPECTED_PATH_SIZES = {
  '/': 48381165,
  '/a': 94853,
  '/a/e': 584,
  '/d': 24933642,
}

describeDay(
  2022,
  7,

  1334506,
  7421137,

  ({ parseTreeFromCommands, buildPathSizesFromTree }) => {
    describe('parseTreeFromCommands', () => {
      it('Works for example input', () => {
        expect.assertions(1)

        expect(parseTreeFromCommands(EXAMPLE_INPUT)).toEqual(
          EXAMPLE_EXPECTED_TREE,
        )
      })
    })

    describe('buildPathSizesFromTree', () => {
      it('Works for example input', () => {
        expect.assertions(1)

        expect(buildPathSizesFromTree(EXAMPLE_EXPECTED_TREE)).toEqual(
          EXAMPLE_EXPECTED_PATH_SIZES,
        )
      })
    })
  },

  (part1) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part1(EXAMPLE_INPUT)).toBe(95437)
    })
  },

  (part2) => {
    test('Example input', () => {
      expect.assertions(1)

      expect(part2(EXAMPLE_INPUT)).toBe(24933642)
    })
  },
)
