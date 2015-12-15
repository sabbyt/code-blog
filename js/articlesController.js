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
          console.log('articles appending');
          blog.truncateArticles(); //CALLING A FUNCTION: truncating here because of ordering - won't work in the index.js file

          //here filtering for author
          $('article').hide();
          console.log('this is running');
          var theChosenOne = 'Dr. Tressie Kuphal';

          for (var i=0; i<blog.fullArticles.length; i+=1) {
            var matchAut = blog.fullArticles[i].author.match(theChosenOne);

            if (matchAut !== null) {
              $('article').find('h5:contains("'+theChosenOne+'")').parentsUntil('main').removeAttr('style');
              console.log('this is appending');
            }
          }
        });
      });
    };

    searchAuthorTemplate();
  });
};
