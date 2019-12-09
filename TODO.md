# TODO

## Intcode (2109 virtual machine)

Currently implemented as
[redux-saga](https://github.com/redux-saga/redux-saga)-like threads with `input`
and `output` as side effects.

- Seems overkill
- Hard to follow
- Suddenly everything is a generator (any opcode can yield)
- Needs complex executors (see day 7)
- Input/output flow is too explicit (see tests with IO)
- But allows for great abstraction since any other strategy can be implemented
  over it (with different executors)

### Ideas

- Input

  - Pull function (poor-man's iterable?)
  - Callback (poor-man's iterable?)
  - Iterable
  - Read-side of a channel (is this just an iterable?)
  - ...of promises?
    - To allow for input underflow
    - Can deadlock if a writer never writes
  - ...buffered?
    - To allow for non-blocking writers
    - Still needs separate handling for buffer underflow

- Output

  - Push function (poor-man's generator?)
  - Callback (poor-man's generator?)
  - Generator (yield)
  - Write-side of a channel (is this just a generator?)
  - ...of promises?
    - To allow for blocking writes until a reader pulls
    - Can deadlock if a reader never reads
  - ...buffered?
    - To allow for non-blocking writes

- Channels

  - Ideal for day 7 since you can daisy-chain
  - Read
    - Blocking (promises)
    - Non-blocking (throw if underflow)
  - Write
    - Blocking (waits for reader to pull)
    - Non-blocking (buffered)
