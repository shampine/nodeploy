var config = require('./config.js'),
    moment = require('moment'),
    gith   = require('gith').create(config.port),
    exec   = require('child_process').exec;

console.log('Now listening on port ' + config.port);

gith({ repo: config.repo }).on('all', function(payload) {
  var command;

  // We are only running a deploy on the config branch
  if(config.branch === payload.branch) {

    // Handles a force push by doing a git reset --hard COMMIT
    if(true === payload.forced) {
      exec('./bin/reset.sh', function(error, stdout, stderr) {

      });

    } else {
      command = './bin/pull.sh -p ' + config.path + ' -b ' + config.branch;
      exec(command, function(error, stdout, stderr) {

        console.log('error: ' + error);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);

      });

    }
  }

});
