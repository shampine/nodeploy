var gith     = require('gith').create(9001),
    execFile = require('child_process').execFile,
    config   = require('./config.js');

console.log('Server warming up..');

gith({
  repo: config.repo
}).on('all', function(payload) {

  console.log(payload);

});
