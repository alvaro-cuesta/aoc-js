#!/bin/bash

./bytes2ints.js -r > >(./ints2bytes.js)
