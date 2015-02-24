var config = require('./config.js'),
    moment = require('moment'),
    gith   = require('gith').create(config.port),
    exec   = require('child_process').exec,
    fs     = requite('fs');

logMessages('No[de]ploy now listening on port ' + config.port);
logMessages('Thanks for everything Carlo.');

gith({ repo: config.repo }).on('all', function(payload) {

  for(var i=0; i < config.length, i++) {
    if(payload.repository.full_name === config[i].repo) {
      repo = config[i];
    } else {
      logMessages('No matching project found.')
      return;
    }
  }

  // We are only running a deploy on the config branch
  if(repo.branch === payload.branch) {
    var hash = payload.forced ? payload.after : false;
    doDeploy(hash);
  } else {
    logMessages('Push event received on different branch than set in config.');
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
    message = [
      '----- Webhook fired -----',
      time,
      'Error: ' + error,
      'Stdout: ' + stdout,
      'Stderr: ' + stderr,
    ].join("\n");
    logMessages(message);
  });
}

function logMessages(message) {
  // todo .. hacky at best right now
  if(config.logs) {
    fs.writeFile('./nodeploy_log', message, function(err) {
      if(err) console.log(err);
    });
  }
  console.log(message);
}