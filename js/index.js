$(document).ready(function(){
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
});


