$(document).ready(function() {
  $(".compose-tweet form textarea").on("keyup", function(evt) {
    let postLength = $(this).val().length;
    let charactersLeft = 140 - postLength;
    let counter = $(this).siblings().find(".counter");
    counter.text(charactersLeft);

    if(postLength > 140){
      counter.addClass('error');
    } else {
      counter.removeClass('error');
    }
  });
});
