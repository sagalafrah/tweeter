/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    const escape = str => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      };




const renderTweets = function(tweets) {  
    $('#tweets-container').empty();
    for (const tweet of tweets) {
        const newTweet = createTweetElement(tweet)
        $('#tweets-container').prepend(newTweet);
      }
    };
  
    $('.input').on('submit', function(event) {
        event.preventDefault();
        const tweetText = $(this).children('textarea').val();
        console.log(tweetText);
     
        if (!tweetText) {
          alert('Tweet is empty!');
    
        } else if (tweetText.length > 140) {
          alert('Tweet is too long!');
    
        } else { 
          
          $.ajax('/tweets', {
            data: $(this).serialize(),
            method: 'POST'
          })
          .then(() => {
            loadTweets();
            $('#tweet-input').val('');
          });
        }  

      })
    

      const loadTweets = function () {
        $.ajax('/tweets', {
          method: 'GET',
          dataType: 'JSON'
        })
          .then(tweets => renderTweets(tweets));
      };
    
      loadTweets();

      
      
const createTweetElement = function(tweet) {
    const exampleTweet = `<article class="tweet">
          <header>
            <img src= ${escape(tweet.user.avatars)}/>
              <h4>${escape(tweet.user.name)}</h4>
              <p>${escape(tweet.user.handle)}</p>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <h5>${timeago.format(tweet.created_at)}</h5>
            <h5>flag retweet favorite</h5>
          </footer>
        </article>`

  return exampleTweet;
};


// renderTweets(data);
});