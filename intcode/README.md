# Intcode

Various command-line utilities to work with Intcode and comma-separated
integers.

> **Warning:** Implementation will probably change soon since STDIO is
> pull-based. This makes some things hard, like outputting `0` on idle joystick,
> or `-1` on non-blocking networking, since timing will be independent in each
> process.
