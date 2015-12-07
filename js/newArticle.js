$('#write').on('keyup', function(){
  var $articlePreview = '<h1>'+ $('#article-title').val() + '</h1>';
  $articlePreview += '<h5>' + $('#article-author').val() + '</h5>';
  $articlePreview += '<h5><a>' + $('#article-author-url').val() + '</a></h5>';
  $articlePreview += '<h5>Published on ' + new Date() + '</h5>';
  $articlePreview += '<h6>Category: ' + $('#article-category').val() + '</h6>';
  $articlePreview += '```' + $('#article-body').val() + '```';
  $('#articlesPreview').html(marked($articlePreview));

  $('pre code').addClass('html');
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});

var makeNewArticle = {};

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
    $('article-json').text(JSON.stringify(genJSON));
  });
};

$(document).ready(function(){
  makeNewArticle.JSON();
});
