const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

module.exports = function load(files) {
  for (const file of files) {
    const code = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    vm.runInThisContext(code, { filename: file });
  }
  return globalThis;
};
