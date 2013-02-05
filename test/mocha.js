var fs = require("fs")
var mocha = require('mocha')
var assert = require("assert")
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

describe('replaceing', function () {
  this.timeout(20000);
  it('done', function (done) {
    var replace = require("../")
    var issue = {
      "user" : "suisho",
      "repo" : "sandbox",
      "number" : "1"
    }
    var expect = "unixtime_"+(new Date()).getTime();
    var patterns = [{
      pattern : /unixtime_[0-9]+/i,
      replace : expect
    }]
    replace(github, issue, patterns ,function(err){
      github.issues.getRepoIssue(issue, function(err, repo){
        assert.equal(repo.body, expect);
        done();
      });
    })
  });
});
