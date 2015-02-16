# no[de]ploy

A GitHub webhook project that invokes a shell script for deployments. Uses [gith](https://www.npmjs.com/package/gith) to listen on the desired port. Currently offers a standard pull/reset deploy, but planning on doing a by commit symlink deploy method.


## install

- Move `config.sample.js` to `config.js`  
- Edit all options to meet environment requirements
- Configure a webhook in your GitHub repository settings
- Run `npm start` in the root to start the deployment listener  
- Optional: you can run this in a screen as `screen npm start` or using forever `forever start /path/to/nodeploy/`  


## issues

See open [issues](https://github.com/shampine/nodeploy/issues)  

## requirements

 - node.js  
 - npm  
 - git (>1.8.5)  

## license

MIT
