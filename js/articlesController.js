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
    webDB.importArticlesFrom('/data/hackerIpsum.json');
  });
};

articlesController.author = function(ctx, next) {
  var authorData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByAuthor(ctx.params.author, authorData);
};

articlesController.setUpTable = function(ctx, next) {
  webDB.init();
  webDB.destroyDB();
  webDB.importArticlesFrom('/data/hackerIpsum.json');
  $.getJSON('../data/hackerIpsum.json', function(data){
  }).done(function(){
    next();
  });
};

articlesController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  Article.findByCategory(ctx.params.category, categoryData);
};

articlesController.show = function(ctx, next) {
  $('.filter').hide();

  var formatted = [];
  for (var i=0; i<ctx.articles.length; i+=1) {
    var callObject = new Article(ctx.articles[i]);
    formatted.push(callObject);
  }
  $.get('/template/template.html', function(data){
    theTemplate = Handlebars.compile(data);
  }).done(function(){
    content.categoryList = formatted.map(theTemplate);
    content.categoryList.forEach(function(el){
      $('#articlesPlaceholder').append(el);
      blog.truncateArticles();
    });
  });
};
