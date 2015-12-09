var stats = {};
stats.author = [];
stats.words = [];

$.getJSON('js/hackerIpsum.json', function(data){
  stats.data = data;
})
  .done(function(){
    stats.totalArticles();
    stats.totalAuthors();
    stats.totalWords();
});

stats.count = function(a,b) {
  return a + b;
};

stats.pluck = function(property, collection) {
  return collection.map(function(e){
      return e[property];
  });
};

stats.totalArticles = function() {
  $('#totalArticles').html('Total articles: ' + stats.data.length);
};

stats.totalAuthors = function() {
  stats.author = stats.pluck('author', stats.data);
  var author = $.unique(stats.author);
  $('#totalAuthors').html('Total authors: ' + author.length);
};

stats.totalWords = function() {
  stats.words = stats.pluck('markdown', stats.data);
  var wordCount = stats.words.map(function(item) {
    return item.split(' ').length;
  });
  var total = wordCount.reduce(stats.count);
  $('#totalWords').html('Total words: ' + total);
};
