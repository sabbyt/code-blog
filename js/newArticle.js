var makeNewArticle = {};
var articlePreview = {};
var articleList = {};

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

$('#write').on('keyup', function(){
  articlePreview.title = $('#article-title').val();
  articlePreview.author = $('#article-author').val();
  articlePreview.authorUrl = $('#article-author-url').val();
  articlePreview.publishedOn = new Date();
  articlePreview.category = $('#article-category').val();
  articlePreview.body = '<pre><code>' + (marked($('#article-body').val())) + '</code></pre>';

  articleList.newSubmission = new Article(articlePreview);

  var articleTemplateRun = function () {
    var theTemplateScript = $('#article-template').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theCompiledTemplate = theTemplate(articleList.newSubmission);
    $('#articlesPreview').html(theCompiledTemplate);
  };

  articleTemplateRun();

  $('pre code').each(function(i, block) {
    $('pre code').addClass('html');
    hljs.highlightBlock(block);
  });
});

makeNewArticle.JSON = function() {
  $('.genJSON').on('click', function(event){
    event.preventDefault();
    makeNewArticle.title = $('#article-title').val();
    makeNewArticle.category = $('#article-category').val();
    makeNewArticle.author = $('#article-author').val();
    makeNewArticle.authorUrl = $('#article-author-url').val();
    makeNewArticle.publishedOn = new Date();
    makeNewArticle.body = marked($('#article-body').val());

    var genJSON = new Article(makeNewArticle);
    console.log('stringified genJSON' + JSON.stringify(genJSON));

    $('#export-field').text(JSON.stringify(genJSON));
  });
};

$(document).ready(function(){
  makeNewArticle.JSON();
});
