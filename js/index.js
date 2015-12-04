$(document).ready(function(){
  blog.createArticles();
    console.log('1');
  blog.sortArticlesAuthor();
    console.log('3');
  blog.sortArticlesCategory();
    console.log('4');
  blog.hideRedundant();
    console.log('5');
  blog.truncateArticles();
    console.log('6');
  blog.showAboutMe();
    console.log('7');
  blog.populateAutFilter();
    console.log('8');
  blog.populateCatFilter();
    console.log('9');
  blog.sortArticlesDate();
    console.log('2');
  $articleTemplateRun();
});


