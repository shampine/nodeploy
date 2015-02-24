var config = require('./config.js'),
    moment = require('moment'),
    gith   = require('gith').create(config.port),
    exec   = require('child_process').exec;

console.log('No[de]ploy now listening on port ' + config.port);
console.log('Thanks for everything Carlo.');

gith({ repo: config.repo }).on('all', function(payload) {

  for(var i=0; i < config.length, i++) {
    if(payload.repository.full_name === config[i].repo) {
      repo = config[i];
    } else {
      console.log('No matching project found.');
      return;
    }
  }

  // We are only running a deploy on the config branch
  if(repo.branch === payload.branch) {
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

  command = './bin/deploy.sh -p ' + repo.path + ' -b ' + repo.branch;

  if(hash !== false) command += ' -h ' + hash;
  if(repo.submodules) command += ' -s';
  if(repo.npm) command += ' -n';
  if(repo.composer) command += ' -c';

  exec(command, function(error, stdout, stderr) {
    console.log('error: ' + error);
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
  });
}

function logMessages() {
  // todo
}