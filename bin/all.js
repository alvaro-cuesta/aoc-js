#!/usr/bin/env node

require("dotenv").config();

const { allIO } = require("../lib/advent/solution-io");

const session = process.env.SESSION;

Promise.all(allIO(session)).then(() => {
  console.log("Finished!");
});
