const https = require("https");

const getInputURL = (year, day) =>
  `https://adventofcode.com/${year}/day/${day}/input`;

const downloadInput = (year, day, session) =>
  new Promise((resolve, reject) => {
    https
      .get(
        getInputURL(year, day),
        {
          headers: {
            Cookie: `session=${session}`
          }
        },
        res => {
          if (res.statusCode !== 200) {
            reject(
              new Error(
                `Could not download input for ${year}-${day}: ${res.statusMessage} (${res.statusCode})`
              )
            );
          }

          let input = "";

          res.on("data", d => {
            input += d;
          });

          res.on("end", () => {
            resolve(input);
          });
        }
      )
      .on("error", e => {
        reject(new Error(`Could not download input for ${year}-${day}: ${e}`));
      });
  });

module.exports = {
  downloadInput
};
