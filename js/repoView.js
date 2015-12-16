var repoView = {};

repoView.index = function() {
  repoView.ui();
  var _append = function(repo) {
    $('#recentWork ul').append(repoView.render(repo));
  };
  repos.all.filter(function(repo){
    return true;
  })
  .forEach(_append);
  repos.requestCommits(repoView.commits);
};

repoView.commits = function() {
  repoView.renderCommits();
};

repoView.render = function(repo) {
  var allCaps = repo.name.toUpperCase();
  var wrap = '<a href="'+repo.html_url+'" target="_blank" >'+allCaps+'</a>';
  return $('<li>').html(wrap);
};

repoView.renderCommits = function() {
  $.each(repos.activity, function(i){
    var commitURL = repos.activity[i].html_url;
    var wrap = '<li><a href="'+commitURL+'" target="_blank" > Latest Commit: '+[i+1]+'</a></li>';
    $('#githubInfo ul').append(wrap);
  });
};

repoView.ui = function() {
  $('#about-me').show();
  $('#articlesPlaceholder').hide();
  $('.filter').hide();
  var $about = $('#about-me');
  var $ul = $about.find('ul');
  $ul.empty();
  $about.fadeIn();
};
