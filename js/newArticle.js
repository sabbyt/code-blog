var makeNewArticle = {};
var articlePreview = {};
var cheese = {};

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

  cheese.articleList = new Article(articlePreview);

  var articleTemplateRun = function () {
    var theTemplateScript = $('#article-template').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theCompiledTemplate = theTemplate(cheese.articleList);
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
