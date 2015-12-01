var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.publishedOn = props.publishedOn;
  this.body = props.body;
}

Article.prototype.toHTML = function () {
  console.log("Doing this " + i);
  var $articleCopy = $('#blogPosts').clone();
  $articleCopy.children('.title').html(this.title);
  $articleCopy.find('.author').html(this.author);
  $articleCopy.children('.authorUrl').attr('href', this.authorUrl);
  $articleCopy.children('.publishedOn').html(this.publishedOn);
  $articleCopy.appendTo('main');
};

blog.rawData.sort(function(a, b) {
  return b.publishedOn - a.publishedOn;
});

for (var i=0; i<blog.rawData.length; i+=1) {
  var callObject = new Article(blog.rawData[i]);
  callObject.toHTML();
  console.log("This is actually working " + i);
};
