var blog = {};
blog.fullArticles = [];
blog.articles = [];

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
    if ($('#selectAuthor').find(':contains("'+blogAuthorAlpha[i].author+'")').length === 0) {
      $authorList.removeAttr('id').addClass('dropdownAuthor');
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
      $catList.removeAttr('id').addClass('dropdownCategory');
      $catList.append('<option value="'+blogCatAlpha[i].category+ '">' +blogCatAlpha[i].category+'</option>');
      $catList.appendTo('#selectCat');
    }
  }
};

blog.createArticles = function() {
  for (var i=0; i<blog.fullArticles.length; i+=1) {
    if (blog.fullArticles[i].publishedOn === '' || blog.fullArticles[i].publishedOn.toLowerCase() === 'draft') {
      console.log('Unpublished draft');
      console.log('Im running');
    }else{
      var callObject = new Article(blog.fullArticles[i]);
      blog.articles.push(callObject);
      console.log('Im putting stuff in the blog.articles');
    }
  }
};

blog.truncateArticles = function() {
  $('.parBod :not(:first-child)').hide();
  $('.readButt').on('click', function(event) {
    event.preventDefault();
    $(this).parent().siblings('.parBod').children().removeAttr('style');
    $(this).hide();
    console.log('this run');
  });
};

blog.showAboutMe = function() {
  $('#about-click').on('click', function(event){
    event.preventDefault();
    $('#about-me').prependTo('main').fadeIn(1000);
    $('#about-click').click(function(){
      $('#about-me').hide().reset();
    });
  });
};

blog.hideRedundant = function() {
  $('#blogPosts').hide();
};

// **************EDITOR PAGE CODE BELOW

blog.admin = function() {
  if (!blog.getQuery('admin')) {
    $('.edit').hide();
  }
  $('#articlesPlaceholder').on('click', '.edit', function(event) {
    event.preventDefault();
    var speshID = $(this).data('dbid');
    console.log('im being clicked ' + speshID);
  });
};


blog.loadArticles = function() {
  $.get('template/template.html', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: 'data/hackerIpsum.json',
      success: blog.fetchArticles
    });
    console.log('done loading articles');
  });
};

blog.fetchArticles = function(data, message, xhr) {
  var newETag = xhr.getResponseHeader('eTag');
  var localTag = localStorage.articlesEtag;
  if (!localTag || localTag != newETag) {
    console.log('cache miss!');
    localStorage.articlesEtag = newETag;
    blog.articles = [];
    webDB.execute(
      'DELETE FROM articles;', //DELETE ALL THE FILES
      blog.fetchJSON);
  } else {
    console.log('cache hit! never mind do nothing');
  }
};

blog.fetchJSON = function() {
  $.getJSON('data/hackerIpsum.json', blog.updateFromJSON);
};

blog.getQuery = function (key) {
  var match = RegExp('[?&]' + key + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};

blog.updateFromJSON = function (data) {
  data.forEach(function(item) {
    var article = new Article(item);
    blog.articles.push(article);
  });
  blog.createArticles();
};
