'use strict';
const fs = require('fs');
const axios = require('axios');


function cat(path) {
  return fs.readFileSync(path, 'utf8');
}


async function webCat(url) {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    throw new Error(`Error fetching ${url}: ${err.message}`);
  }
}


if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node step2.js <path-or-url>');
    process.exit(1);
  }

  const pathOrUrl = args[0];

  async function run() {
    try {
      let output;
      if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
        output = await webCat(pathOrUrl);
      } else {
        output = cat(pathOrUrl);
      }
      process.stdout.write(output);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }

  run();
}

module.exports = { cat, webCat };
