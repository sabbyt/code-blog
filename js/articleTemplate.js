var theTemplate;
var content = {};

Handlebars.registerHelper('adminButt', function (block) {
  if (blog.getQuery('admin')) {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
});

var articleTemplateRun = function () {
  $.get('template/template.html', function(data){
    theTemplate = Handlebars.compile(data);
  }).done(function(){
    console.log(blog.articles);
    content.articleList = blog.articles.map(theTemplate);
    console.log(theTemplate);
    console.log(content.articleList);
    content.articleList.forEach(function(el){
      $('#articlesPlaceholder').append(el);
      console.log('articles appending');
      blog.truncateArticles(); //CALLING A FUNCTION: truncating here because of ordering - won't work in the index.js file
    });
  });
};
