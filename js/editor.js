$(document).ready(function() {
  webDB.init();
  webDB.destroyDB();
  webDB.importArticlesFrom('../data/hackerIpsum.json');

  // blog.fetchFromDB();

  // blog.initArticleEditorPage();

  // blog.handleAddButton();
  // blog.handleUpdateButton();
  // blog.handleDeleteButton();

});
