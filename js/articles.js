var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.date = props.publishedOn;
  this.publishedOn = Date.parse(props.publishedOn);
  this.body = props.body;
};

Article.prototype.timestamp = function( ) {
  var now = Date.parse(new Date());
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = now - this.publishedOn;
  var dayDiff = Math.floor(elapsed / 86400);

  if (elapsed < msPerMinute) {
    return Math.round(elapsed/1000) + ' seconds ago';
  }else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';
  }else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour) + ' hours ago';
  }else if (elapsed < msPerMonth) {
    return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
  }else if (elapsed < msPerYear) {
    return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
  }else {
    return 'approximately ' + Math.round(elapsed/msPerYear) + ' years ago';
  }
};

blog.createArticles = function() {
  for (var i=0; i<blog.rawData.length; i+=1) {
    if (blog.rawData[i].publishedOn === '' || blog.rawData[i].publishedOn.toLowerCase() === 'draft') {
      console.log('Unpublished draft');
    }else{
      var callObject = new Article(blog.rawData[i]);
      blog.articles.push(callObject);
    }
  }
};

blog.truncateArticles = function() {
  $('.parBod p:not(:first-child)').hide();
  $('.readButt').on('click', function(event) {
    event.preventDefault();
    $(this).parent().siblings('.parBod').find('p').removeAttr('style');
    $(this).hide();
  });
};

blog.showAboutMe = function() {
  $('#about-click').on('click', function(event){
    event.preventDefault();
    $('#about-me').prependTo('main').fadeIn(1000);
    $('#about-click').click(function(){
      $('#about-me').hide();
    });
  });
};

blog.hideRedundant = function() {
  $('#blogPosts').hide();
};

blog.populateAutFilter = function() {
  $('#selectAuthor').change(function(){
    var $theChosenOneJQ = $('select option:selected').text();
    var theChosenOne = $theChosenOneJQ;
    $('#selectAuthor').find('option:selected').removeAttr('selected');
    $('article').hide();
    for (var i=0; i<blog.rawData.length; i+=1) {
      var matchAut = blog.rawData[i].author.match(theChosenOne);
      if (matchAut !== null) {
        $('article').find('h5:contains("'+theChosenOne+'")').parentsUntil('main').removeAttr('style');
      }
    }
  });
};

blog.populateCatFilter = function() {
  $('#selectCat').change(function(){
    var $chosenCatJQ = $('select option:selected').text();
    var theChosenCat = $chosenCatJQ;
    $('#selectCat').find('option:selected').removeAttr('selected');
    $('article').hide();
    for (var j=0; j<blog.rawData.length; j+=1) {
      var matchCat = blog.rawData[j].category.match(theChosenCat);
      if (matchCat !== null) {
        $('article').find('h6:contains("'+theChosenCat+'")').parentsUntil('main').removeAttr('style');
      }
    }
  });
};
