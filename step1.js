'use strict';
const fs = require('fs');


function cat(path) {
  return fs.readFileSync(path, 'utf8');
}


if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node step1.js <path>');
    process.exit(1);
  }
  try {
    const [pathArg] = args;
    const output = cat(pathArg);
    process.stdout.write(output);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

module.exports = { cat };
