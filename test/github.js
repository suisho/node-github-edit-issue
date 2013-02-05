var fs = require("fs")
var GithubApi = require('github')
var config = JSON.parse(fs.readFileSync("test/config.json"));
github = new GithubApi({
  version: "3.0.0",
  timeout: 5000
})
github.authenticate({
  type: "oauth",
  token: config.access_token
})
module.exports = github;
