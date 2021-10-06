/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

let tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function () {


  $(function() {
   
    $('.form').on('submit', function (e) {

      e.preventDefault()

        const textLen = $('.textfld').val()

        if (textLen.length === 0) {
            alert("Your tweet has nothing in it")
            return
        }

        if (textLen.length > 140) {
          alert("Your tweet is too long!")
          return
      }

       const tweetData = $(this).serialize()

      $.post( '/tweets',  tweetData )
        .done(function (result) {

          $.ajax('/tweets', { method: 'GET' })
            .then(function (results) {
          
  
          let final = createTweetElement(results[results.length-1])
          $('.tweets').prepend(final);
  
          $('.textfld').val("")
          $('.counter').val(140)
         
        });

        });

          

        
        
    });

  });



const loadtweets = function (){
    
    // $('.form').on('submit', function (e) {
      // e.preventDefault()
      // console.log('Button clicked, performing ajax call...');

      $.ajax('/tweets', { method: 'GET' })
      .then(function (result) {
        console.log('Success: ', result);

        let final = renderTweets(result)
        $('.existing-tweet').append(final)

      });
    // });

}
loadtweets()


const renderTweets = function(tweets) {

  for (i = tweets.length - 1; i >= 0; i--){

      $tweet = createTweetElement(tweets[i])

      $(".tweets").append($tweet) 

  }
        return $tweet
}

const createTweetElement = function (object) {
  
  let blah = timeago.format(object.created_at)

  return $(`<article class="existing-tweet">
    <div class= "header-container-old-tweet">
    <div class="trouble">
        <img src="${object.user.avatars}" height="30px" width="30px">
        <label class ="user-name">${object.user.name}</label>
    </div>
    <div>
      <label class ="at-handle">${object.user.handle}</label>
    </div>
</div>
<div class="box10">
        <label class= "tweetfld" name="oldTweet" id="old-tweet-text">${object.content.text} </label>
      </div>

       <div class= "sub-header-container-old-tweet">
            <div>
              <label class ="days-since">${blah}</label>
            </div>
            <div>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
        </div>
      </article>`);
};



//renderTweets(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $(".container").append($tweet);

});
