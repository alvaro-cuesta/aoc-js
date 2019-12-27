#!/bin/bash

./bytes2ints.js | ./ici.js $1 | ./ints2bytes.js
