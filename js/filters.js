blog.populateAutFilter = function() {
  $('#selectAuthor').change(function(){
    page('/author/'+$(this).val());
    $('article').hide();
  });
};

blog.populateCatFilter = function() {
  $('#selectCat').change(function(){
    page('/category/'+$(this).val());
    $('article').hide();
  });
};
