# 🎄 AoC JS

My [Advent of Code](https://adventofcode.com) solutions in JavaScript.

## Commands

Most commands require you to setup a session cookie. The recommended way is to
create a `.env` file (see `.env.example`) with your session cookie (just login
to AoC and take the cookie value from your browser's network inspector).

### Development

- `yarn watch` / `yarn watch <year>` / `yarn watch <year>/<day>`
- `yarn test` / `yarn test <year>` / `yarn test <year>/<day>`
- `yarn start-day <year> <day>`: creates day from template and downloads its
  input.
- `yarn download-test-input`: recreates all `DD.test.input` files. Old input
  files will be overwritten. This means existing tests will fail since the test
  output matches the ones from my AoC user.

### Solutions

- `yarn all`
- `yarn year <year>`
- `yarn day <year> <day>`
- `yarn part <year> <day> <part>`

### Progress

- [2015](./lib/2015/) (2/50)
- [2016](./lib/2016/) (18/50) — 43/50 submitted, but apparently I lost the code?
- [2017](./lib/2017/) (0/50) —
  [50/50 in Rust](https://github.com/alvaro-cuesta/advent-solutions)
- [2018](./lib/2018/) (10/50)
- [2019](./lib/2019/) (50/50)
- [2020](./lib/2020/) (16/50)
- [2021](./lib/2021/) (8/50)

## [License](./LICENSE)

Copyright 2019 Álvaro Cuesta (https://www.github.com/alvaro-cuesta/)

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
