/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {
return $(`<article class="tweet">
          <header>
            <span class="tweet-user">
              <span><img src="${tweet.user.avatars}"></span>
              <span>${tweet.user.name}</span>
            </span>
            <span class="tweet-handle">${tweet.user.handle}</span>
          </header>
          <section class="tweet-message">
            <span>${tweet.content.text}</span>
          </section>
          <footer>
            <span>${timeago.format(tweet.created_at)}</span>
            <span>
              <i class="fa-solid fa-flag fa-lg"></i>
              <i class="fa-solid fa-retweet fa-lg"></i>
              <i class="fa-sharp fa-solid fa-heart fa-lg"></i>
            </span>
          </footer>
        </article>`);
};

const renderTweets = (tweets) => {
  const $tweetElements = [];

  for (let tweet of tweets) {
    $tweetElements.push(createTweetElement(tweet));  
  }

  $('#tweets-container').append($tweetElements);
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweetsJSON) {
    renderTweets(tweetsJSON);
  });
};

$(document).ready(function() {
  $("#tweets-form").on("submit", function (event) {
    event.preventDefault();

    if ($('#tweet-text').val() === "") {
      alert("I can't see what are you humming about! Please, enter some text to proceed.");
    } else if ($('#tweet-text').val().length > 140) {
      alert("WOW, that's a lot! Please summarize your text below 140 characters.");
    } else {
      $.post($("#tweets-form").attr('action'), $("#tweets-form").serialize());
    }
  });

  loadTweets();
});