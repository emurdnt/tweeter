/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const scrollUp = function (){
    const btn = $('button.scroll');

    $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  
    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    }); 
  }
  
  const toggleMenu = function() {
    $("button.toggle-menu").on('click',function(event){
      $("section.compose-tweet").toggle();
      $("section.compose-tweet").find('textarea').focus();
    })
  }

  const renderTweets = function(tweets) {
    $("section.tweet-container").empty();
    for(const entry of tweets){
      const $el = createTweetElement(entry);
      $("section.tweet-container").prepend($el);
    }
   
  }
  
  const escape =  function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  const createTweetElement = function(tweet) {
    const datePosted = moment(tweet.created_at);
    const today = moment();
    const diff = today.diff(datePosted,'days');
    const $tweet  = $(`
    <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}" alt="profile picture">
          <p class="user-name">${tweet.user.name}</p>
        </div>
        <p>${tweet.user.handle}</p>
      </header>
      <div>
        <p>${escape(tweet.content.text)}</p>
      </div>
      <footer>
        <div>
          <p>${diff} days ago</p>
          <div>
            <span><i class="fas fa-flag"></i></span>
            <span><i class="fas fa-retweet"></i></span>
            <span><i class="fas fa-heart"></i></span>
          </div>
        </div>
      </footer>
    </article> `);
    return $tweet;
  }
  
  const loadTweets = function (){
    $.ajax('/tweets', { method: 'GET' })
        .then(function (allTweets) {
          renderTweets(allTweets);
        });
  }
  
  const submitTweet =  function (){
    $('#new-tweet').on("submit", function(event){
      event.preventDefault();
      const $form = $(this);
      const url = $form.attr( "action" );
      const $text = $form.find("#tweet-text");

      if(!$text.val()){
        $(".error-panel").slideDown( "slow" );
        $(".error-panel p").text("Oops! You didn't write anything.");
      } else if ($text.val().length > 140) {
        $(".error-panel").slideDown( "slow" );
        $(".error-panel p").text("You're a bit of a writer aren't you? 140 characters only.");
      } else {
        $(".error-panel").hide();
        $.ajax({
          type: 'POST',
          url: url,
          data : $form.serialize()
        }).then(function(data) {
              loadTweets();
        });
        $text.val("");
        
      }
    });
  }
  scrollUp();
  toggleMenu();
  loadTweets();
  submitTweet();
  
});

