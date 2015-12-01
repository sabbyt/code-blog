var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.date = props.publishedOn;
  this.publishedOn = Date.parse(props.publishedOn);
  this.body = props.body;
};

blog.articles.sort(function(a, b) {
  return b.publishedOn-a.publishedOn;
});

//date math adapted from http://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best

Article.prototype.timestamp = function( ) {
  var now = Date.parse(new Date());
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = now - this.publishedOn;
  var dayDiff = Math.floor(elapsed / 86400);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' seconds ago';
  }else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';
  }else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour) + ' hours ago';
  }else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
  }else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
  }else {
    return 'approximately ' + Math.round(elapsed/msPerYear) + ' years ago';
  }
};

Article.prototype.toHTML = function () {
  var $articleCopy = $('#blogPosts').clone();
  $articleCopy.children('.title').html(this.title);
  $articleCopy.find('.author').html('By ' + this.author);
  $articleCopy.children('.authorUrl').attr('href', this.authorUrl);
  $articleCopy.children('.publishedOn').html('Published on ' + this.date + ', ' + this.timestamp());
  $articleCopy.children('.category').html('Category: ' + this.category);
  $articleCopy.children('.body').html(this.body);
  $articleCopy.appendTo('main');
};

for (var i=0; i<blog.rawData.length; i+=1) {
  var callObject = new Article(blog.rawData[i]);
  blog.articles.push(callObject);
  console.log('Post working '+ i);
  callObject.toHTML();
}
