const { describeDay } = require('../test-utils')

describeDay(
  2019,
  11,

  1876,
  [
    '',
    '  ██   ██  ███    ██  ██   ██   ██  █      ',
    ' █  █ █  █ █  █    █ █  █ █  █ █  █ █      ',
    ' █    █    █  █    █ █    █    █    █      ',
    ' █    █ ██ ███     █ █    █ ██ █    █      ',
    ' █  █ █  █ █    █  █ █  █ █  █ █  █ █      ',
    '  ██   ███ █     ██   ██   ███  ██  ████   ',
  ].join('\n'),
)
