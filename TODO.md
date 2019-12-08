# TODO

## Intcode (2109 virtual machine)

Currently implemented as
[redux-saga-like](https://github.com/redux-saga/redux-saga) threads with `input`
and `output` as side effects, but seems a bit overkill and kinda hard to follow.

Ideas:

- Output generator

  - Input is a callback/promise/iterator/promise-iterator
  - Output as only yield

- Channels

  - Input is a read-side of a channel
  - Output is a write-side of channel
  - Ideal for day 7 since you can daisy-chain with a buffering channel
  - Only works if input is always available (non-blocking). What happens if we
    have to stop execution in future days?
    - Maybe input could be made a promise to allow input underflow?
