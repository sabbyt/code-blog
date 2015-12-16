var repos = {};

repos.all = [];
repos.activity = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/sabbyt/repos?sort=updated',
    headers: {Authorization: 'token ' + githubToken},
  }).done(function(data){
    repos.all = data;
    //then render in repoView
  }).done(callback);
};

repos.requestCommits = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/repos/sabbyt/code-blog/commits?sort=updated',
    headers: {Authorization: 'token ' + githubToken},
  }).done(function(data){
    repos.activity = data;
    //then render in repoView
  }).done(callback);
};
