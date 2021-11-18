/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  


const data = [
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

const renderTweets = function(tweets) {
    for (const tweet of tweets) {
        const newTweet = createTweetElement(tweet)
        $('#tweets-container').append(newTweet);
      }
    };
  
 

const createTweetElement = function(tweet) {
    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    //create HTML
    const exampleTweet = `<article class="tweet">
          <header>
            <img src= ${tweet.user.avatars}/>
              <h4>${tweet.user.name}</h4>
              <p>${tweet.user.handle}</p>
          </header>
          <p>${tweet.content.text}</p>
          <footer>
            <h5>${timeago.format(tweet.created_at)}</h5>
            <h5>flag retweet favorite</h5>
          </footer>
        </article>`

  return exampleTweet;
};


renderTweets(data);
});