$(document).ready(function(){
  $.getJSON('../data/hackerIpsum.json', function(data){
    blog.fullArticles = data;
  })
  .done(function(){
  blog.createArticles();
  blog.sortArticlesAuthor();
  blog.sortArticlesCategory();
  blog.hideRedundant();
  blog.truncateArticles();
  blog.showAboutMe();
  blog.populateAutFilter();
  blog.populateCatFilter();
  blog.sortArticlesDate();
  articleTemplateRun();
  blog.truncateArticles();
  webDB.init();
  webDB.destroyDB();
  webDB.importArticlesFrom('data/hackerIpsum.json');
  });
});
