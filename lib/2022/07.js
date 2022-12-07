const R = require('ramda')

const parseDirOutput = R.pipe(
  R.reject(R.startsWith('dir ')),
  R.map(R.pipe(R.split(' '), ([size, name]) => [name, parseInt(size)])),
  R.fromPairs,
)

const runCommand = (state, [command, ...output]) => {
  if (command.startsWith('cd ')) {
    const dir = command.slice(3)

    return R.modify(
      'cwd',
      dir === '/'
        ? R.always([])
        : dir === '..'
        ? R.slice(0, -1)
        : R.append(dir),
      state,
    )
  } else if (command === 'ls') {
    const fileSizes = parseDirOutput(output)
    const totalSize = R.pipe(R.values, R.sum)(fileSizes)

    return R.modify(
      'tree',
      R.pipe(
        R.assocPath([...state.cwd, '__files__'], fileSizes),
        R.assocPath([...state.cwd, '__shallowTotal__'], totalSize),
      ),
      state,
    )
  } else {
    throw new Error('Unknown command ' + command)
  }
}

const parseTreeFromCommands = R.pipe(
  R.split('$ '),
  R.tail,
  R.map(R.pipe(R.trim, R.split('\n'))),
  R.reduce(runCommand, { cwd: null, tree: {} }),
  R.prop('tree'),
)

const buildPathSizesFromTree = (tree, cwd = []) => {
  const path = `/${cwd.join('/')}`

  return R.pipe(
    R.toPairs,
    R.reject(R.pipe(R.head, R.startsWith('__'))),
    R.reduce(
      (pathSizes, [dir, data]) => {
        const newCwd = [...cwd, dir]
        const newPathSizes = buildPathSizesFromTree(data, newCwd)
        const newPath = `/${newCwd.join('/')}`

        return {
          ...pathSizes,
          ...newPathSizes,
          [path]: pathSizes[path] + newPathSizes[newPath],
        }
      },
      {
        [path]: tree.__shallowTotal__,
      },
    ),
  )(tree)
}

const getPathsToSize = R.pipe(parseTreeFromCommands, buildPathSizesFromTree)

const part1 = R.pipe(
  getPathsToSize,
  R.values,
  R.filter(R.flip(R.lte)(100000)),
  R.sum,
)

const TOTAL_DISK_SPACE = 70000000

const NEEDED_UNUSED_SPACE = 30000000

const part2 = (input) => {
  const pathsToSize = getPathsToSize(input)

  const neededSpace = NEEDED_UNUSED_SPACE - TOTAL_DISK_SPACE + pathsToSize['/']

  return R.pipe(
    R.values,
    R.filter(R.flip(R.gte)(neededSpace)),
    R.reduce(R.min, +Infinity),
  )(pathsToSize)
}

module.exports = {
  part1,
  part2,
  parseTreeFromCommands,
  buildPathSizesFromTree,
}
