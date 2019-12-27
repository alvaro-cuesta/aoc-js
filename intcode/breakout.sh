#!/bin/bash

./keys2ints.js -k 3 joystick.keymap.json | ./ici.js 13-play.int | ./ints2screen.js breakout.tilemap.json
