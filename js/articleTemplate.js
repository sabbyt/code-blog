var theTemplate;
var content = {};

var articleTemplateRun = function () {
$.get('template/template.handlebars',function(data){
    theTemplate = Handlebars.compile(data);
  }).done(function(){
    content.articleList = blog.articles.map(theTemplate);
    content.articleList.forEach(function(el){
      $('#articlesPlaceholder').append(el);
    });
  });
};
