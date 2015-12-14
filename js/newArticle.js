var makeNewArticle = {};
var articlePreview = {};
var articleList = {};

var newPost = {};
var theTemplate;

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
  articlePreview.markdown = marked($('#article-body').val());

  articleList.newSubmission = new Article(articlePreview);

  var articleTemplateRun = function () {
    $.get('../template/template.handlebars',function(data){
      theTemplate = Handlebars.compile(data);
    }).done(function(){
      newPost.articleList = theTemplate(articleList.newSubmission);
      $('#articlesPreview').html(newPost.articleList);
    });
  };

  articleTemplateRun();

  $('pre code').each(function(i, block) {
    $('pre code').addClass('hljs');
    hljs.highlightBlock(block);
  });
});

makeNewArticle.JSON = function() {
  $('.genJSON').on('click', function(){
    makeNewArticle.title = $('#article-title').val();
    makeNewArticle.category = $('#article-category').val();
    makeNewArticle.author = $('#article-author').val();
    makeNewArticle.authorUrl = $('#article-author-url').val();
    makeNewArticle.publishedOn = new Date();
    makeNewArticle.markdown = marked($('#article-body').val());

    var genJSON = new Article(makeNewArticle);
    blog.loadArticles();

    $('#export-field').text(JSON.stringify(genJSON));
  });
};

$(document).ready(function(){
  webDB.init();
  webDB.destroyDB();
  webDB.importArticlesFrom('data/hackerIpsum.json');
  makeNewArticle.JSON();
});
