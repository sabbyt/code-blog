var blog = {};

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
    if ($('#selectAuthor').find(':contains("'+blogAuthorAlpha[i].category+'")').length === 0) {
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
  for (var i=0; i<blog.rawData.length; i+=1) {
    if (blog.rawData[i].publishedOn === '' || blog.rawData[i].publishedOn.toLowerCase() === 'draft') {
      console.log('Unpublished draft');
    }else{
      var callObject = new Article(blog.rawData[i]);
      blog.articles.push(callObject);
    }
  }
};

blog.truncateArticles = function() {
  $('.parBod p:not(:first-child)').hide();
  $('.readButt').on('click', function(event) {
    event.preventDefault();
    $(this).parent().siblings('.parBod').find('p').removeAttr('style');
    $(this).hide();
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




