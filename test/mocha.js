var fs = require("fs")
var mocha = require('mocha')
var assert = require("assert")

describe('mock api test', function () {
  it('done', function (done) {
    var editIssue = require("../")
    var issue = {
      "user" : "suisho",
      "repo" : "sandbox",
      "number" : "2"
    }

    var editFunc = function(repo){
      repo.body = repo.body.replace("hoge", "baa");
      return repo;
    }
    
    // create node-github mock
    var githubMock = {};
    githubMock.issues = {};
    githubMock.issues.getRepoIssue = function(msg, callback){
      //console.log("call mock getRepoIssue");
      var mockResult = JSON.parse(fs.readFileSync("test/issue_mock_fixture.json"));
      callback(null, mockResult);
    }
    githubMock.issues.edit = function(msg, callback){
      //console.log("call mock edit");
      var expect = {
        "user" : "suisho",
        "repo" : "sandbox",
        "number" : "2",
        "title": "fuga",
        "body": "baa",
        "assignee": null,
        "milestone": null,
        "state": "open",
        "labels" : []
      }
      assert.deepEqual(expect, msg);
      callback(null);
    }
    editIssue(githubMock, issue, editFunc, function(err){
      done();
    })
  });
});
