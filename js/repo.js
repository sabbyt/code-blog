var repos = {};

repos.all = [];
repos.activity = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/users/sabbyt/repos?sort=updated',
    success: function(data, message, xhr) {
      repos.all =data;
    }
  }).done(callback);
};

repos.requestCommits = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/repos/sabbyt/code-blog/commits?sort=updated',
    success: function(data, message, xhr) {
      repos.activity = data;
    }
  }).done(callback);
};
