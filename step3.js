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
  if (args.length < 1 || args.length > 3 || (args[0] === '--out' && args.length !== 3)) {
    console.error('Usage: node step3.js [--out output-filename.txt] <path-or-url>');
    process.exit(1);
  }

  let outputFile = null;
  let pathOrUrl;

  if (args[0] === '--out') {
    outputFile = args[1];
    pathOrUrl = args[2];
  } else {
    pathOrUrl = args[0];
  }

  async function run() {
    try {
      let output;
      if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
        output = await webCat(pathOrUrl);
      } else {
        output = cat(pathOrUrl);
      }

      if (outputFile) {
        fs.writeFileSync(outputFile, output, 'utf8');
      } else {
        process.stdout.write(output);
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  }

  run();
}

module.exports = { cat, webCat };
