var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.date = props.publishedOn;
  this.publishedOn = Date.parse(props.publishedOn);
  this.markdown = marked(props.markdown);
  this.dbId = props.id;
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
    if (Math.round(elapsed/msPerDay) === 1) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' day ago';
    }else {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }
  }else if (elapsed < msPerYear) {
    if (Math.round(elapsed/msPerMonth) === 1) {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' month ago';
    }else {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }
  }else {
    if (Math.round(elapsed/msPerYear) === 1) {
      return 'approximately ' + Math.round(elapsed/msPerYear) + ' year ago';
    }else {
      return 'approximately ' + Math.round(elapsed/msPerYear) + ' years ago';
    }
  }
};

Article.prototype.toHTML = function() {
  return this.template(this);
};

Article.findByCategory = function(category, callback) {
  console.log('two');
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM articles WHERE category = ?',
        'data': [category]
      }
    ],
    callback
  );
};
