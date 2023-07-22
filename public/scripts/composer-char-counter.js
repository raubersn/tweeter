//executes the javascript code after the document is sucessfully loaded
$(document).ready(function() {
  //updates the character counter when a user types the message
  $("#tweet-text").on('input', function() {
    //calculates how many characters are left to reach the 140 limit
    const remainingCharCount = 140 - this.value.length;
    
    //selects the counter element
    const outputElement = $(this).closest("form").find(".counter");
    
    //updates the counter value
    outputElement.val(remainingCharCount);
    
    //apply a different class to highlight the counter if the message exceeds the limit
    if (remainingCharCount < 0 ) {
      outputElement.addClass("counter-exceed");
    } else {
      outputElement.removeClass("counter-exceed");
    }
  });
});