var content = {};

content.articleList = blog.articles;

var articleTemplateRun = function () {
  var theTemplateScript = $("#article-template").html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  var theCompiledTemplate = theTemplate(content);
  $('.newArticle-placeholder').html(theCompiledTemplate);
  console.log('article temp run');
};
