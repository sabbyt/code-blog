blog.populateAutFilter = function() {
  $('#selectAuthor').change(function(){
    $('#selectCat').children().removeAttr('selected');
    var $theChosenOneJQ = $('select option:selected').text();
    var theChosenOne = $theChosenOneJQ;
    $('#selectAuthor').find('option:selected');
    $('article').hide();
    for (var i=0; i<blog.fullArticles.length; i+=1) {
      var matchAut = blog.fullArticles[i].author.match(theChosenOne);
      if (matchAut !== null) {
        $('article').find('h5:contains("'+theChosenOne+'")').parentsUntil('main').removeAttr('style');
      }
    }
  });
};

blog.populateCatFilter = function() {
  $('#selectCat').change(function(){
    $('#selectAuthor').children().removeAttr('selected');
    var $chosenCatJQ = $('select option:selected').text();
    var theChosenCat = $chosenCatJQ;
    $('#selectCat').find('option:selected');
    $('article').hide();
    for (var j=0; j<blog.fullArticles.length; j+=1) {
      var matchCat = blog.fullArticles[j].category.match(theChosenCat);
      if (matchCat !== null) {
        $('article').find('h6:contains("'+theChosenCat+'")').parentsUntil('main').removeAttr('style');
      }
    }
  });
};
