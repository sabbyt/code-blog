// page('/', function(){
//   if(blog.getQuery('admin')) {
//     page.redirect('/admin');
//   } else {
//     page.redirect('/default');
//   }
// });

page('/', articlesController.index);

page('/default', articlesController.index);

page('/admin', articlesController.index);

page('/about', aboutController.index);

page('/articles', articlesController.index);

page('/author=kuphal', articlesController.author);

page.start();
