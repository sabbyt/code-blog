$('#article-body').on('blur', function(){
  var $articlePreview = $('#article-body').val();
  $('#articles').html(marked($articlePreview));

  $('pre code').addClass('html');
  
  $('pre code').each(function(i, block) {
    console.log(block);
    hljs.highlightBlock(block);
  });
});


// $(document).ready(function() {
//   hljs.configure({useBR: true});
//   $('#article-body').on('keypress', function(){
//     $('#article-body').each(function(i, block) {
//       console.log(block);
//       hljs.highlightBlock(block);
//     });
//   });
// });
