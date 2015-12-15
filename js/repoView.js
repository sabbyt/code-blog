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
};

repoView.render = function(repo) {
  var allCaps = repo.name.toUpperCase();
  var wrap = '<a href="'+repo.html_url+'" target="_blank" >'+allCaps+'</a>';
  console.log(repo);
  return $('<li>').html(wrap);
};

repoView.ui = function() {
  $('#about-me').show();
  $('#articlesPlaceholder').hide();
  $('.filter').hide();
  var $recentWork = $('#recentWork');
  var $ul = $recentWork.find('ul');

  $ul.empty();
  $recentWork.fadeIn();
};
