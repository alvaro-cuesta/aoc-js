#!/bin/bash

./bytes2ints.js > >(./ints2bytes.js)
