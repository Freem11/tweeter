$(document).ready(function() {
  
  let MaxCharacters = 140
  $("#tweet-text").on('keyup', function() {
    let tweetLength = $("#tweet-text").val().length
    
    let remainingCharacters = MaxCharacters - tweetLength

    $("#counter").val(remainingCharacters)

    if (remainingCharacters < 0){
      $("#counter").css('color','red')
    } else {
       $("#counter").css('color','#545149')
    }

  });

  









});
