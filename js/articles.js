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
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
};

blog.sortArticlesAuthor = function() {
  var blogAuthorAlpha = blog.articles;
  blogAuthorAlpha.sort(function(a, b) {
    if (a.author < b.author) {return -1;}
    if (a.author > b.author) {return 1;}
    return 0;
  });
  for (var i=0; i<blogAuthorAlpha.length; i+=1) {
    var $authorList = $('#dropdownAuthor').clone();
    if ($('#selectAuthor').find(':contains("'+blogAuthorAlpha[i].category+'")').length === 0) {
      $authorList.append('<option value="'+blogAuthorAlpha[i].author+ '">' +blogAuthorAlpha[i].author+'</option>');
      $authorList.appendTo('#selectAuthor');
    }
  }
};

blog.sortArticlesCategory = function() {
  var blogCatAlpha = blog.articles;
  blogCatAlpha.sort(function(a, b) {
    if (a.category < b.category) {return -1;}
    if (a.category > b.category) {return 1;}
    return 0;
  });
  for (var i=0; i<blogCatAlpha.length; i+=1) {
    var $catList = $('#dropdownCategory').clone();
    if ($('#selectCat').find(':contains("'+blogCatAlpha[i].category+'")').length === 0) {
      $catList.append('<option value="'+blogCatAlpha[i].category+ '">' +blogCatAlpha[i].category+'</option>');
      $catList.appendTo('#selectCat');
    }
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
  $articleCopy.find('.author').html(this.author);
  $articleCopy.find('.authorUrl').attr('href', this.authorUrl);
  $articleCopy.find('.publishedOn').html('Published on ' + this.date + ', ' + this.timestamp());
  $articleCopy.find('.category').html('Category: ' + this.category);
  $articleCopy.find('.parBod').html(this.body);
  $articleCopy.appendTo('main');
  $articleCopy.removeAttr('id').addClass('blogPosts');
};

blog.createArticles = function() {
  for (var i=0; i<blog.rawData.length; i+=1) {
    if (blog.rawData[i].publishedOn === '' || blog.rawData[i].publishedOn.toLowerCase() === 'draft') {
      console.log('Unpublished draft');
    }else{
      var callObject = new Article(blog.rawData[i]);
      blog.articles.push(callObject);
      callObject.toHTML();
    }
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

blog.showAboutMe = function() {
  $('#about-click').on('click', function(event){
    event.preventDefault();
    $('#about-me').prependTo('main').fadeIn(1000);
    $('#about-click').click(function(){
      $('#about-me').hide();
    });
  });
};

blog.hideRedundant = function() {
  $('#blogPosts').hide();
};

blog.populateAutFilter = function() {
  $('#selectAuthor').change(function(){
    var $theChosenOneJQ = $('select option:selected').text();
    var theChosenOne = $theChosenOneJQ;
    $('#selectAuthor').find('option:selected').removeAttr('selected');
    $('article').hide();
    for (var i=0; i<blog.rawData.length; i+=1) {
      var matchAut = blog.rawData[i].author.match(theChosenOne);
      if (matchAut !== null) {
        $('article').find('h5:contains("'+theChosenOne+'")').parentsUntil('main').removeAttr('style');
      }
    }
  });
};

blog.populateCatFilter = function() {
  $('#selectCat').change(function(){
    var $chosenCatJQ = $('select option:selected').text();
    var theChosenCat = $chosenCatJQ;
    $('#selectCat').find('option:selected').removeAttr('selected');
    $('article').hide();
    for (var j=0; j<blog.rawData.length; j+=1) {
      var matchCat = blog.rawData[j].category.match(theChosenCat);
      if (matchCat !== null) {
        $('article').find('h6:contains("'+theChosenCat+'")').parentsUntil('main').removeAttr('style');
      }
    }
  });
};

$(document).ready(function(){
  blog.createArticles();
  blog.sortArticlesDate();
  blog.sortArticlesAuthor();
  blog.sortArticlesCategory();
  blog.hideRedundant();
  blog.truncateArticles();
  blog.showAboutMe();
  blog.populateAutFilter();
  blog.populateCatFilter();
});
