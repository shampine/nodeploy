var config = require('./config.js'),
    moment = require('moment'),
    gith   = require('gith').create(config.port),
    exec   = require('child_process').exec;

console.log('Now listening on port ' + config.port);

gith({ repo: config.repo }).on('all', function(payload) {

  // We are only running a deploy on the config branch
  if(config.branch === payload.branch) {
    var hash = payload.forced ? payload.after : false;

    doDeploy(hash);
  } else {
    console.log('Push event received on different branch than set in config.')
  }

});


function doDeploy(hash) {
  var command;
  var now  = moment()
  var time = now.format('YYYY-MM-DD HH:mm:ss');

  command = './bin/deploy.sh -p ' + config.path + ' -b ' + config.branch;

  if(hash !== false) command += ' -h ' + hash;

  exec(command, function(error, stdout, stderr) {
    console.log('error: ' + error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  });
}