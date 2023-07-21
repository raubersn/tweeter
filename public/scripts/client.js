/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {
  const articleElement = $(`
    <article class="tweet">
      <header>
        <span class="tweet-user">
          <span><img src="${tweet.user.avatars}"></span>
          <span>${tweet.user.name}</span>
        </span>
        <span class="tweet-handle">${tweet.user.handle}</span>
      </header>
    </article>`);

  const sectionElement = $(`<section class="tweet-message"></section>`);
  sectionElement.append(document.createTextNode(tweet.content.text));

  articleElement.append(sectionElement);

  const footerElement = $(`
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <span>
        <i class="fa-solid fa-flag fa-lg"></i>
        <i class="fa-solid fa-retweet fa-lg"></i>
        <i class="fa-sharp fa-solid fa-heart fa-lg"></i>
      </span>
    </footer>`);

  articleElement.append(footerElement);
  
  return articleElement;
};

const renderTweets = (tweets) => {
  const $tweetElements = [];

  for (let i = tweets.length -1; i >= 0; i--) {
    $tweetElements.push(createTweetElement(tweets[i]));  
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

    $('.error-message').slideUp("fast","linear");

    if ($('#tweet-text').val() === "") {
      $('.error-message').text('');
      $('.error-message').append('<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i> I can\'t see what are you humming about! Please, enter some text to proceed. <i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>');
      $('.error-message').slideDown("slow", "swing");
    } else if ($('#tweet-text').val().length > 140) {
      $('.error-message').text('');
      $('.error-message').append('<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i> WOW, that\'s a lot! Please summarize your text below 140 characters. <i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>');
      $('.error-message').slideDown("slow", "swing");
    } else {
      $.post($("#tweets-form").attr('action'), $("#tweets-form").serialize())
      .then(function() {
        $('#tweet-text').val("");
        $('.counter').val("140");

        $.ajax('/tweets', { method: 'GET' })
        .then(function (tweetsJSON) {
          $('#tweets-container').prepend(createTweetElement(tweetsJSON[tweetsJSON.length-1]));
        });
      });      
    }
  });

  loadTweets();
});