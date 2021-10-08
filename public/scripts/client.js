/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Toggle to reveal and hide the tweet input area
  $(".tweet-reveal").click(() => {
    $(".new-tweet").slideToggle();
    $(".textfld").focus();
  });

  //Reveal return to top button
  $(document).scroll(() => {
    $(".fa-angle-double-up").css("visibility", "visible");
    $(".fa-angle-double-down").css("visibility", "hidden");
    $(".tweet-reveal").css("visibility", "hidden");
  });

  //Return to top of page
  $(".fa-angle-double-up").click(() => {
    $(document).scrollTop(0);
    $(".new-tweet").slideDown();
    $(".textfld").focus();
  });

  //return to top button rehides once above 100 pixels on scroll
  $(window).scroll(() => {
    if ($(window).scrollTop() < 100) {
      $(".fa-angle-double-up").css("visibility", "hidden");
      $(".fa-angle-double-down").css("visibility", "visible");
      $(".tweet-reveal").css("visibility", "visible");
    }
  });

  $(function () {
    $(".form").on("submit", function (e) {
      e.preventDefault();

      const textLen = $(".textfld").val();

      // Empty Tweet Slider
      if (textLen.length === 0) {
        $(".error-msg1").slideDown("<div>Your tweet is empty!</div>");
        return;
      } else {
        $(".error-msg1").slideUp("<div>Your tweet is empty!</div>");
      }

      // Over 140 characters slider
      if (textLen.length > 140) {
        $(".error-msg2").slideDown("<div>Your tweet is too long!</div>");
        return;
      } else {
        $(".error-msg2").slideUp("<div>Your tweet is too long!</div>");
      }

      const tweetData = $(this).serialize();

      $.post("/tweets", tweetData).done(function (result) {
        $.ajax("/tweets", { method: "GET" }).then(function (results) {
          let final = createTweetElement(results[results.length - 1]);
          $(".tweets").prepend(final);

          $(".textfld").val("");
          $(".counter").val(140);
        });
      });
    });
  });

  const loadtweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (result) {
      console.log("Success: ", result);

      let final = renderTweets(result);
      $(".existing-tweet").append(final);
    });
    // });
  };
  loadtweets();

  const renderTweets = function (tweets) {
    for (i = tweets.length - 1; i >= 0; i--) {
      $tweet = createTweetElement(tweets[i]);

      $(".tweets").append($tweet);
    }
    return $tweet;
  };

  const createTweetElement = function (object) {
    let blah = timeago.format(object.created_at);

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
        <textarea disabled="true" class= "tweetfld" name="oldTweet" id="old-tweet-text">${object.content.text} </textarea>
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
});
