var disqus_config = function () {
  this.page.url = 'http://www.sabrinatee.com/';
  this.page.identifier = id;
};

(function() {
  var d = document, s = d.createElement('script');
  s.src = '//sabrinatee.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
