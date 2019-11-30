#!/usr/bin/env node

require("dotenv").config();

const { partIO } = require("../lib/advent/solution-io");

const year = process.argv[2];
const day = process.argv[3];
const part = process.argv[4];
const session = process.env.SESSION;

partIO(year, day, part, session).then(() => {
  console.log("Finished!");
});
