var articlesController = {};

articlesController.index = function() {
  $.getJSON('../data/hackerIpsum.json', function(data){
    blog.fullArticles = data;
  })
  .done(function(){
    blog.createArticles();
    blog.loadArticles();
    blog.sortArticlesAuthor();
    blog.sortArticlesCategory();
    blog.hideRedundant();
    blog.showAboutMe();
    blog.populateAutFilter();
    blog.populateCatFilter();
    blog.sortArticlesDate();
    articleTemplateRun();
    blog.admin();
    webDB.init();
    webDB.destroyDB();
    webDB.importArticlesFrom('data/hackerIpsum.json');
  });
};

articlesController.author = function() {
  $.getJSON('../data/hackerIpsum.json', function(data){
    blog.fullArticles = data;
  })
  .done(function(){
    blog.createArticles();
    blog.loadArticles();
    blog.sortArticlesAuthor();
    blog.sortArticlesCategory();
    blog.hideRedundant();
    blog.showAboutMe();
    blog.populateAutFilter();
    blog.populateCatFilter();
    blog.sortArticlesDate();
    blog.admin();

    var searchAuthorTemplate = function () {
      $.get('template/template.html', function(data){
        theTemplate = Handlebars.compile(data);
      }).done(function(){
        content.articleList = blog.articles.map(theTemplate);
        content.articleList.forEach(function(el){
          $('#articlesPlaceholder').append(el);
          blog.truncateArticles(); //CALLING A FUNCTION: truncating here because of ordering - won't work in the index.js file
        });

          //here filtering for author based on query string input after /author=
        $('article').hide();
        var theChosenOne = (window.location.search).toLowerCase();
        var string = theChosenOne.split('');
        string.shift();
        var cleanString = string.join('');
        var temp = [];
        //for loop to match query string and data
        for (var j=0; j<authorLastName.length; j+=1){
          var matching = authorLastName[j].easyName.match(cleanString);
          var fullName = authorLastName[j].fullName;
          if (matching != null) {
            temp.push(fullName);
          }
        };
        //for loop to render matching author on page
        for (var i=0; i<blog.fullArticles.length; i+=1) {
          var matchAut = blog.fullArticles[i].author.match(temp);
          if (matchAut !== null) {
            $('article').find('h5:contains("'+temp+'")').parentsUntil('main').removeAttr('style');
          }
        }
      });
    };
    //generating template
    searchAuthorTemplate();
  });
};
