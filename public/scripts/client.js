/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//creates a new tweet (html element) based on the information provided
const createTweetElement = (tweet) => {
  //creates the main article for the tweet
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

  //uses the function createTextMode to avoid script injection
  const sectionElement = $(`<section class="tweet-message"></section>`);
  sectionElement.append(document.createTextNode(tweet.content.text));

  articleElement.append(sectionElement);

  //adds the footer element
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

//renders all the tweets contained in a JSON payload
const renderTweets = (tweets) => {
  const $tweetElements = [];

  //creates an HTML element for each JSON object 
  for (let i = tweets.length -1; i >= 0; i--) {
    $tweetElements.push(createTweetElement(tweets[i]));  
  }

  $('#tweets-container').append($tweetElements);
};

//gets a JSON payload containing all the tweets in the simulated database
const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweetsJSON) {
    renderTweets(tweetsJSON);
  });
};

//executes the javascript code after the document is sucessfully loaded
$(document).ready(function() {

  //handles the event of the new tweet form submission
  $("#tweets-form").on("submit", function (event) {
    //avoids the default behaviour of a form submission, cancelling the page redirection
    event.preventDefault();

    //hides the error message container
    $('.error-message').slideUp("fast","linear");

    if ($('#tweet-text').val() === "") {
      //if the message field is empty, shows an error message on the container
      $('.error-message').text('');
      $('.error-message').append('<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i> I can\'t see what are you humming about! Please, enter some text to proceed. <i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>');
      $('.error-message').slideDown("slow", "swing");
    } else if ($('#tweet-text').val().length > 140) {
      //if the message contains more than 140 characters, shows an error message on the container
      $('.error-message').text('');
      $('.error-message').append('<i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i> WOW, that\'s a lot! Please summarize your text below 140 characters. <i class="fa-solid fa-triangle-exclamation" style="color: #ff0000;"></i>');
      $('.error-message').slideDown("slow", "swing");
    } else {
      //if all the conditions are satisfied, serializes the form data and post it to be included ion the database as a new tweet
      $.post($("#tweets-form").attr('action'), $("#tweets-form").serialize())
      //once this is an assyncronous method, uses a promisse to wait the succesfull creation of the tweet
      .then(function() {
        //resets the message and counter fields
        $('#tweet-text').val("");
        $('.counter').val("140");

        //updates the timeline with the new tweet from the database
        $.ajax('/tweets', { method: 'GET' })
        .then(function (tweetsJSON) {
          $('#tweets-container').prepend(createTweetElement(tweetsJSON[tweetsJSON.length-1]));
        });
      });      
    }
  });

  //loads all tweets on the timeline
  loadTweets();
});