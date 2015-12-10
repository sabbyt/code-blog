webDB.insertRecord = function (a) {
  // insert article record into database
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.markdown],
      }
    ],
    function () {
      console.log('Success inserting record for ' + a.title);
    }
  );
};



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
