var util = require("util");
// replace single repo
module.exports = function(github, issue, patterns, callback){
  github.issues.getRepoIssue(issue, function(err, repo){
    var body = repo.body;
    patterns.forEach(function(p){
      body = body.replace(p.pattern, p.replace);
    })
    var editParam = {
      user   : issue.user,
      repo   : issue.repo,
      number : issue.number,
      body   : body,
      // for node-github's required...
      title  : repo.title,
      labels : repo.labels
    }
    
    github.issues.edit(editParam, function(err, result){
      callback(err, repo);
    })
  })
}
