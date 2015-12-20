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
    $.get('/template/template.html',function(data){
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

makeNewArticle.draftMode = function() {
  var draft = localStorage.getItem('draft');
  if (draft) {
    makeNewArticle = JSON.parse(draft);
    $('#article-title').val(makeNewArticle.title);
    $('#article-category').val(makeNewArticle.category);
    $('#article-author').val(makeNewArticle.author); $('#article-author-url').val(makeNewArticle.authorUrl);
    $('#article-body').val(makeNewArticle.markdown);
    console.log('Draft mode running');
  }
};

$('.genJSON').on('click', function(evt){
  evt.preventDefault();
  localStorage.removeItem('draft');
  makeNewArticle.title = $('#article-title').val();
  makeNewArticle.category = $('#article-category').val();
  makeNewArticle.author = $('#article-author').val();
  makeNewArticle.authorUrl = $('#article-author-url').val();
  makeNewArticle.publishedOn = new Date();
  makeNewArticle.markdown = marked($('#article-body').val());

  var genJSON = new Article(makeNewArticle);
  blog.loadArticles();
  localStorage.setItem('draft', JSON.stringify(makeNewArticle));

  $('#export-field').text(JSON.stringify(genJSON));
});

makeNewArticle.renderFromEditButt = function() {
  var dbId = blog.getQuery('id');
  webDB.execute([{
    'sql': 'SELECT * FROM articles where id = ?',
    'data': [dbId]
  }]), function(data) {
    makeNewArticle.renderToEditPage(result[0]);
  };
};

makeNewArticle.updateEntry = function() {
  $('.updatePost').on('click', function() {
    webDB.execute([{
      'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, publishedOn = ?, markdown = ?, category = ? WHERE id = ?',
      'data': [makeNewArticle.title, makeNewArticle.author, makeNewArticle.authorUrl, makeNewArticle.publishedOn, makeNewArticle.markdown, makeNewArticle.category, makeNewArticle.id]
    }]);
  });
};

makeNewArticle.addEntry = function(article) {
  $('.addPost').on('click', function() {
    makeNewArticle.title = $('#article-title').val();
    makeNewArticle.author = $('#article-author').val();
    makeNewArticle.authorUrl = $('#article-author-url').val();
    makeNewArticle.publishedOn = new Date();
    makeNewArticle.markdown = $('#article-body').val();
    makeNewArticle.category = $('#article-category').val();
    webDB.execute([{
      'sql': 'INSERT INTO articles (title, author, authorUrl, publishedOn, markdown, category) VALUES (?, ?, ?, ?, ?, ?);',
      'data': [makeNewArticle.title, makeNewArticle.author, makeNewArticle.authorUrl, makeNewArticle.publishedOn, makeNewArticle.markdown, makeNewArticle.category]
    }]);
    console.log('this run');
  });
};

$(document).ready(function(){
  webDB.init();
  webDB.destroyDB();
  webDB.importArticlesFrom('../data/hackerIpsum.json');
  makeNewArticle.draftMode();
});
