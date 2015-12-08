var makeNewArticle = {};
var genJSON;
var articlePreview = {};
var cheese = {};
var theTemplateScript;
var theTemplate;
var theCompiledTemplate;

$('#write').on('keyup', function(){
  articlePreview.title = $('#article-title').val();
  articlePreview.author = $('#article-author').val();
  articlePreview.authorUrl = $('#article-author-url').val();
  articlePreview.publishedOn = new Date();
  articlePreview.category = $('#article-category').val();
  articlePreview.body = marked('<pre><code>'+$('#article-body').val() + '</code></pre>');

  cheese.articleList = new Article(articlePreview);

  var articleTemplateRun = function () {
    theTemplateScript = $('#article-template').html();
    theTemplate = Handlebars.compile(theTemplateScript);
    theCompiledTemplate = theTemplate(cheese.articleList);
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

    genJSON = new Article(makeNewArticle);
    $('#export-field').text(JSON.stringify(genJSON));
  });
};


// makeNewArticle.setToStore = function() {
//   var setLocal = JSON.stringify(genJSON);
//   localStorage.setItem("saved", setLocal);
//   console.log('done');
//   console.log(setLocal);
// };
// makeNewArticle.setToStore();

// makeNewArticle.getFromStore = function (username) {
//   var getLocal = localStorage.getItem(setLocal);
//   var unstringedTemp;
//   if(getLocal != null) {
//     unstringedTemp = JSON.parse(getLocal);
//   }
// };
// makeNewArticle.getFromStore("setLocal");


$(document).ready(function(){
  makeNewArticle.JSON();
});
