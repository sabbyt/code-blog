page('/', articlesController.index);

page('/default', articlesController.index);

page('/admin', articlesController.index);

page('/about', repoController.index);

page('/articles', articlesController.index);

page('/author/:author',
  articlesController.setUpTable,
  articlesController.author,
  articlesController.show
);

page('/category/:category',
  articlesController.setUpTable,
  articlesController.category,
  articlesController.show
);

page.start();
