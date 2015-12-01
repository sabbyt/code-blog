var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.publishedOn = Date.parse(props.publishedOn);
  this.body = props.body;
}

Article.prototype.toHTML = function () {
  var $articleCopy = $('#blogPosts').clone();
  $articleCopy.children('.title').html(this.title);
  $articleCopy.find('.author').html(this.author);
  $articleCopy.children('.authorUrl').attr('href', this.authorUrl);
  $articleCopy.children('.publishedOn').html(this.publishedOn);
  $articleCopy.children('.category').html(this.category);
  $articleCopy.children('.body').html(this.body);
  $articleCopy.appendTo('main');
};

for (var i=0; i<blog.rawData.length; i+=1) {
  var callObject = new Article(blog.rawData[i]);
  blog.articles.push(callObject);
  console.log('Post working '+ i);
  callObject.toHTML();
};
