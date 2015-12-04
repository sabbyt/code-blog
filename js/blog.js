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
