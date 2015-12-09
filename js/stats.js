var stats = {};
stats.author = [];
stats.words = [];
var wordCount;

$.getJSON('js/hackerIpsum.json', function(data){
  stats.data = data;
})
  .done(function(){
    stats.totalArticles();
    stats.totalAuthors();
    stats.totalWords();
    stats.avgOverall();
});

stats.avgOverall = function() {
  var averageWord = wordCount.reduce(stats.count)/stats.data.length;
  console.log(averageWord);
  $('#avgOverall').html('Average word length across all posts: ' + averageWord + ' words');
};

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
  wordCount = stats.words.map(function(item) {
    return item.split(' ').length;
  });
  var total = wordCount.reduce(stats.count);
  $('#totalWords').html('Total words: ' + total);
};
