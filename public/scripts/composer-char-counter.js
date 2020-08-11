$(document).ready(function() {

  $(".new-tweet form textarea").on("keyup", function(evt) {
    let charCount = 0;
    let counter = $(this).siblings().find(".counter");
  
    if(evt.keyCode === 8){
      charCount = parseInt(counter.val()) +  1 ;
    } else {
      charCount = parseInt(counter.val()) - 1;
    }
   
    if(charCount <= 0){
      counter.addClass('error');
      counter.val(charCount);
    } else {
      counter.removeClass('error');
      if(charCount > 140){
        counter.val(140);
      } else {
        counter.val(charCount);
      }
    }

    //bug when they highlight and delete. the counter doesnot reset
   
  });


  
});
