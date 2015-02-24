var config = {
  "port": 9001,
  "repositories": [
    {
      "repo": "org/project",
      "path": "/path/to/repo",
      "branch": "master",
      "submodules": true,
      "npm": false,
      "composer": true
    }
  ]
};

module.exports = config;