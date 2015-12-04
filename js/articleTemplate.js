var content = {};

content.articleList = blog.articles;

$(function () {
  var theTemplateScript = $("#article-template").html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  var theCompiledTemplate = theTemplate(content);
  $('.newArticle-placeholder').html(theCompiledTemplate);
});
