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

const renderTweets = function(tweets) {
  

  for (let record of tweets){
      $tweet = createTweetElement(record)

      $(".container").append($tweet) 
  }

}

const createTweetElement = function (object) {
  
  let blah = timeago.format(object.content.created_at)

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



renderTweets(tweetData);

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $(".container").append($tweet);

});
