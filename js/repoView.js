var repoView = {};

repoView.index = function() {
  repoView.ui();

  var _append = function(repo) {
    $('#about-me ul').append(repoView.render(repo));
  };

  repos.all.filter(function(repo){
    return true;
  })
  .forEach(_append);
};

repoView.render = function(repo) {
  var allCaps = repo.name.toUpperCase();
  return $('<li>').text(allCaps);
};

repoView.ui = function() {
  $('#about-me').show();
  $('#articlesPlaceholder').hide();
  var $about = $('#about-me');
  var $ul = $about.find('ul');

  $ul.empty();
  $about.fadeIn();
};
