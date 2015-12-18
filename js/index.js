$(document).ready(function(){
  $.getJSON('../data/hackerIpsum.json', function(data){
    blog.fullArticles = data;
  })
  .done(function(){
    blog.createArticles();
    blog.loadArticles();
    blog.sortArticlesAuthor();
    blog.sortArticlesCategory();
    blog.hideRedundant();
    blog.showAboutMe();
    blog.populateAutFilter();
    blog.populateCatFilter();
    blog.sortArticlesDate();
    articleTemplateRun();
    blog.admin();
    webDB.init();
    webDB.destroyDB();
    webDB.importArticlesFrom('/data/hackerIpsum.json');
  });
});
