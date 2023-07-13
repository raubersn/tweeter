$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const remainingCharCount = 140 - this.value.length;
    
    //const outputElement = $("output");
    const outputElement = $(this).closest("form").find(".counter");
    
    outputElement.val(remainingCharCount);
        
    if (remainingCharCount < 0 ) {
      outputElement.addClass("counter-exceed");
    } else {
      outputElement.removeClass("counter-exceed");
    }
  });
});