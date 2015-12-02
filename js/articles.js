var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.date = props.publishedOn;
  this.publishedOn = Date.parse(props.publishedOn);
  this.body = props.body;
};

blog.sortArticlesDate = function() {
  blog.articles.sort(function(a, b) {
    return b.publishedOn-a.publishedOn;
  });
};

blog.sortArticlesAuthor = function() {
  var blogAuthorAlpha = blog.articles;
  blogAuthorAlpha.sort(function(a, b) {
    return b.author-a.author;
  });
  for (var i=0; i<blogAuthorAlpha.length; i+=1) {
    var $authorList = $('#dropdownAuthor').clone();
    $authorList.append("<option value='"+blogAuthorAlpha[i].author+ "'>" +blogAuthorAlpha[i].author+"</option>");
    $authorList.appendTo('#selectAuthor');
    console.log('author work');
  }
};

blog.sortArticlesCategory = function() {
  var blogCatAlpha = blog.articles;
  blogCatAlpha.sort(function(a, b) {
    return b.category-a.category;
  });
  for (var i=0; i<blogCatAlpha.length; i+=1) {
    var $catList = $('#dropdownCategory').clone();
    $catList.append("<option>"+blogCatAlpha[i].category+"</option>");
    $catList.appendTo('#selectCat');
    console.log('cat work');
  }
};

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
  $articleCopy.find('.title').html(this.title);
  $articleCopy.find('.author').html('By ' + this.author);
  $articleCopy.find('.authorUrl').attr('href', this.authorUrl);
  $articleCopy.find('.publishedOn').html('Published on ' + this.date + ', ' + this.timestamp());
  $articleCopy.find('.category').html('Category: ' + this.category);
  $articleCopy.find('.parBod').html(this.body);
  $articleCopy.appendTo('main');
  $articleCopy.removeAttr('id').addClass('blogPosts');
};

blog.createArticles = function() {
  for (var i=0; i<blog.rawData.length; i+=1) {
    var callObject = new Article(blog.rawData[i]);
    blog.articles.push(callObject);
    callObject.toHTML();
  }
};

blog.truncateArticles = function() {
  $('.parBod p:not(:first-child)').hide();
  $('article').on('click', function(event){
    event.preventDefault();
    $(this).children().find('p:not(:first-child)').fadeIn();
    $(this).find('.readButt').hide();
  });
};

blog.removeRedundant = function() {
  $('#blogPosts').remove();
};





// blog.handleMainNav = function(){
//   $('.main-nav').on('click', '.tab', function(e) {
//     $('.tab-content').hide();
//     $('#' + $(this).data('content')).fadeIn();
//   });
//   $('.main-nav')
// }

// //load the articles in
// blog.appendArticles();

// blog.populateFilters();

$(document).ready(function(){
  blog.createArticles();
  blog.sortArticlesDate();
  blog.sortArticlesAuthor();
  blog.sortArticlesCategory();
  // blog.removeRedundant();
  blog.truncateArticles();
});

var $chosenAuthor;
var specificAuthor;
var match;
var blogdata = blog.articles;


$('select').change(function(){
  $chosenAuthor = $('select option:selected');
  $('article').hide();
  specificAuthor = $chosenAuthor.text();
  for (var i=0; i<blogdata.length; i+=1) {
    match = blogdata[i].author.match(specificAuthor);
    if (match !== null) {
      console.log(blogdata[i].author);
      console.log(blogdata[i]);
      var populate = document.getElementById('blogPosts');
      populate.innerHTML = blogdata[i].author;
      $('#blogPosts').removeAttr('style');
    }
  }
  console.log('run');
});
