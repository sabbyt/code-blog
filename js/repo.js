var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/sabbyt/repos?sort=updated',
    headers: {Authorization: 'token ' + githubToken},
  }).done(function(data){
    console.log(data);
    repos.all = data;
    //then render in repoView
  }).done(callback);
};
