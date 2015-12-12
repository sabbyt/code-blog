var stats = {};
stats.words = [];
var uniqueAuthor;
var totalWords;

$.getJSON('data/hackerIpsum.json', function(data){
  stats.data = data;
})
  .done(function(){
    stats.totalArticles();
    stats.totalAuthors();
    stats.totalWords();
    stats.avgOverallWordLength();
    stats.wordsByAuthor();
});

stats.avgOverallWordLength = function() {
  var totalWordLength = stats.words.map(function(item) {
    return item.split('').length;
  });
  var totalWordLengthNumber = totalWordLength.reduce(stats.count);
  var averageWordLength = Math.round(totalWordLengthNumber/totalWords);
  $('#avgOverall').html('<p>Average word length across all posts: ' + averageWordLength + ' letters</p>');
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
  stats.author = [];
  stats.author = stats.pluck('author', stats.data);
  uniqueAuthor = $.unique(stats.author);
  $('#totalAuthors').html('<p>Total authors: ' + uniqueAuthor.length + '</p>');
};

stats.totalWords = function() {
  stats.words = stats.pluck('markdown', stats.data);
  var wordCount = stats.words.map(function(item) {
    return item.split(' ').length;
  });
  totalWords = wordCount.reduce(stats.count);
  $('#totalWords').html('<p>Total words: ' + totalWords + '</p>');
};

stats.wordsByAuthor = function() {
  for(var i=0; i<uniqueAuthor.length; i+=1) {
    var authorMatch = uniqueAuthor[i];
    var temp = [];
    var wordCountByAuthor;
    for (var j=0; j<stats.data.length; j+=1) {
      var searchArrayForAuthor = stats.data[j].author.match(authorMatch);
      if (searchArrayForAuthor !== null) {
        wordCountByAuthor = (stats.data[j].markdown.split(' ')).length;
        temp.push(wordCountByAuthor);
      }
    }
    if (temp.length > 1) {
      var totalWordsByAuthor = temp.reduce(stats.count);
      $('#avgByAuthor').append('<p>Total words by author ' + authorMatch + ': ' + totalWordsByAuthor + ' words</p>');
    } else {
      $('#avgByAuthor').append('<p>Total words by author ' + authorMatch + ': ' + wordCountByAuthor + ' words</p>');
    }
  }
};
