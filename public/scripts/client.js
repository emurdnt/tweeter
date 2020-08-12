/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
 
  const renderTweets = function(tweets) {
    console.log(tweets);
    for(let entry of tweets){
      let $el = createTweetElement(entry);
      $("section.tweet-container").append($el);
    }
  }
  
  const createTweetElement = function(tweet) {
    const $tweet  = $(`<article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}" alt="profile picture">
        <p class="user-name">${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div>
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <div>
        <p>${tweet.content.created_at}</p>
        <div>
          <span>icon</span>
          <span>icon</span>
          <span>icon</span>
        </div>
      </div>
    </footer>
  </article> `) 
   
    return $tweet;
  }
  
  const loadTweets = function (){
    $.ajax('/tweets', { method: 'GET' })
        .then(function (allTweets) {
          allTweets.sort(function (a, b) {
            return a['created_at'] < b['created_at'];
          });
          renderTweets(allTweets);
        });
  }

  const submitTweet =  function (){
    $('#new-tweet').on("submit", function(event){
      event.preventDefault();
      let $form = $(this);
      let url = $form.attr( "action" );
      let $text = $form.find("#tweet-text");

      if(!$text.val()){
        alert("Text field cannot be empty!");
      } else if ($text.val().length > 140) {
        alert("Text cannot exceed the 140 character limit.");
      } else {
        console.log($form.serialize());
        //this needs a code review
        $.ajax({
          type: 'POST',
          url: url,
          //bad request errror
          data : $form.serialize()
        }).done(function(data) {
          
              // log data to the console so we can see
              renderTweets(data);
  
              // here we will handle errors and validation messages
        });
        //reset the form
        $text.val("");
        
      }
    });
  }

  loadTweets();
  submitTweet();
  
});

