page('/', articlesController.index);

page('/default', articlesController.index);

page('/admin', articlesController.index);

page('/about', repoController.index);

page('/articles', articlesController.index);

page('/author=', articlesController.author);

page('/category/:category',
  articlesController.setUpTable,
  articlesController.category,
  articlesController.show
);

page.start();
