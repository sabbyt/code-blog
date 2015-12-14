var theTemplate;
var content = {};

Handlebars.registerHelper('if_admin', function (block) {
  if (blog.getQuery('admin')) {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
});

var articleTemplateRun = function () {
  $.get('template/template.handlebars', function(data){
    theTemplate = Handlebars.compile(data);
  }).done(function(){
    content.articleList = blog.articles.map(theTemplate);
    content.articleList.forEach(function(el){
      $('#articlesPlaceholder').append(el);
      console.log('articles appending');
      blog.truncateArticles(); //truncating here because of ordering - won't work in the index.js file
    });
  });
};
