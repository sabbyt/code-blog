var stats = {};
stats.author = [];
stats.words = [];

$.getJSON('js/hackerIpsum.json', function(data){
  stats.data = data;
  console.log('1');
})
  .done(function(){
    stats.totalArticles();
    stats.totalAuthors();
    stats.totalWords();
});

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
  var wordCount = stats.words[0].split(/\s+/);
  console.log(wordCount);
  $('#totalWords').html('Total words: ' + wordCount.length);
};




