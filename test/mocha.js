var mocha = require('mocha')
var assert = require("assert")
var github = require("./github");

describe('Real api test', function () {
  this.timeout(10000);
  it('done', function (done) {
    var editIssue = require("../")
    var issue = {
      "user" : "suisho",
      "repo" : "sandbox",
      "number" : "1"
    }
    var expect = "unixtime_"+(new Date()).getTime();
    var editFunc = function(repo){
      repo.body = repo.body.replace(/unixtime_[0-9]+/i, expect);
      return repo;
    }
    editIssue(github, issue, editFunc, function(err){
      github.issues.getRepoIssue(issue, function(err, repo){
        assert.equal(repo.body, expect);
        done();
      });
    })
  });
});
