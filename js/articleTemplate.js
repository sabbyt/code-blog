var content = {};

content.articleList = blog.articles;

$(function () {
  // Grab the template script
  var theTemplateScript = $("#article-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Pass our data to the template
  var theCompiledTemplate = theTemplate(content);

  // Add the compiled html to the page
  $('.newContent-placeholder').html(theCompiledTemplate);
});
