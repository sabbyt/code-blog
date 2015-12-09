var stats = {};
stats.author = [];
stats.words = [];
var wordCount;
var uniqueAuthor;

$.getJSON('js/hackerIpsum.json', function(data){
  stats.data = data;
})
  .done(function(){
    stats.totalArticles();
    stats.totalAuthors();
    stats.totalWords();
    stats.avgOverallWordLength();
    // stats.wordsByAuthor();
});

stats.avgOverallWordLength = function() {
  var averageWord = wordCount.reduce(stats.count)/stats.data.length;
  $('#avgOverall').html('<p>Average word length across all posts: ' + averageWord + ' words</p>');
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
  $('#totalArticles').html('<p>Total articles: ' + stats.data.length + '</p>');
};

stats.totalAuthors = function() {
  stats.author = stats.pluck('author', stats.data);
  uniqueAuthor = $.unique(stats.author);
  $('#totalAuthors').html('<p>Total authors: ' + uniqueAuthor.length + '</p>');
};

stats.totalWords = function() {
  stats.words = stats.pluck('markdown', stats.data);
  wordCount = stats.words.map(function(item) {
    return item.split(' ').length;
  });
  var total = wordCount.reduce(stats.count);
  $('#totalWords').html('<p>Total words: ' + total + '</p>');
};

// stats.wordsByAuthor = function() {
//   uniqueAuthor.forEach(function(element, index){
//     var findAuthor = stats.data;
//     console.log(uniqueAuthor);
//     console.log(findAuthor);
//     findAuthor.match(uniqueAuthor);
//     console.log(findAuthor);
//   });
// };
